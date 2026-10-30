import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Instagram, Loader2, AlertCircle, Calendar, ClipboardCheck, Printer, FileText, X } from 'lucide-react';
import { getServices, ServiceItem } from '../data/servicesData';
import { COMMUNES_DATA } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';
import { WEB3FORMS_ACCESS_KEY } from '../config/contact';
import { PaymentDetailsCard } from './PaymentDetailsCard';
import { buildWhatsAppBookingUrl, getSlotLabel } from '../utils/bookingUtils';
import { BookingConditionsModal } from './BookingConditionsModal';

interface ContactSectionProps {
  selectedService?: ServiceItem | null;
  selectedServices?: ServiceItem[];
  onChangeSelectedServices?: (services: ServiceItem[]) => void;
  selectedCommuneName?: string | null;
  onOpenClientSheet?: () => void;
}

const formatDurationMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} h ${m} min`;
  if (h > 0) return `${h} h`;
  return `${m} min`;
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedService,
  selectedServices = [],
  onChangeSelectedServices,
  selectedCommuneName,
  onOpenClientSheet,
}) => {
  const { t, language } = useLanguage();
  const currentServices = getServices(language);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    commune: 'Rennes Centre & Quartiers',
    serviceId: selectedService ? selectedService.id : currentServices[0].id,
    serviceTitle: selectedService ? selectedService.title : currentServices[0].title,
    preferredDate: '',
    preferredTimeSlot: 'morning',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const [isConditionsModalOpen, setIsConditionsModalOpen] = useState(false);
  const [isCardHighlighted, setIsCardHighlighted] = useState(false);

  const handleConditionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsCardHighlighted(true);
      const cardEl = document.getElementById('booking-conditions-card');
      if (cardEl) {
        cardEl.dataset.krVisible = 'true';
        cardEl.classList.add('is-visible');
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      setTimeout(() => {
        setIsCardHighlighted(false);
      }, 2000);
    } else {
      setIsConditionsModalOpen(true);
    }
  };

  const renderTermsLabel = () => {
    const fullText = t.contact.rightCard.termsLabel;
    const boldText = t.contact.rightCard.termsBold;
    if (!fullText.includes(boldText)) {
      return fullText;
    }
    const parts = fullText.split(boldText);
    return (
      <>
        {parts[0]}
        <button
          type="button"
          onClick={handleConditionsClick}
          className="text-[#512D6D] font-bold underline hover:text-[#8B2651] cursor-pointer inline-flex items-center gap-0.5 focus:outline-hidden focus:ring-2 focus:ring-[#512D6D]/30 rounded-xs"
          title={t.contact.leftCard.viewConditionsBtn}
        >
          <span>{boldText}</span>
        </button>
        {parts.slice(1).join(boldText)}
      </>
    );
  };

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() => {
    if (selectedServices.length > 0) return selectedServices.map(s => s.id);
    if (selectedService) return [selectedService.id];
    return [currentServices[0].id];
  });

  // Synchronize when selectedServices or selectedService changes from parent
  useEffect(() => {
    if (selectedServices.length > 0) {
      setSelectedServiceIds(selectedServices.map(s => s.id));
    } else if (selectedService) {
      setSelectedServiceIds([selectedService.id]);
    }
  }, [selectedServices, selectedService]);

  // Synchronize when selectedCommuneName changes from LogisticsCalculator
  useEffect(() => {
    if (selectedCommuneName) {
      setFormData(prev => ({
        ...prev,
        commune: selectedCommuneName
      }));
    }
  }, [selectedCommuneName]);

  const selectedServicesList: ServiceItem[] = (() => {
    const resolved = selectedServiceIds
      .map(id => currentServices.find(s => s.id === id))
      .filter((s): s is ServiceItem => !!s);
    return resolved.length > 0 ? resolved : [currentServices[0]];
  })();

  const isCombo = selectedServicesList.length >= 2;
  const servicesSubtotal = selectedServicesList.reduce((sum, s) => sum + s.price, 0);
  const totalDurationMinutes = selectedServicesList.reduce((sum, s) => sum + s.durationMinutes, 0);
  const formattedTotalDuration = formatDurationMinutes(totalDurationMinutes);

  const activeCommune = COMMUNES_DATA.find(c => c.name === formData.commune) || COMMUNES_DATA[0];
  const baseCommuneFee = activeCommune.feeEuro;
  // Rule: Travel fee is 100% free if >= 2 services (Combo) at the same address
  const effectiveFee = isCombo ? 0 : baseCommuneFee;
  const estimatedTotal = servicesSubtotal + effectiveFee;
  const formattedTotal = estimatedTotal.toString().replace('.', ',');
  const formattedBaseFee = baseCommuneFee.toString().replace('.', ',');

  const combinedServiceTitle = isCombo
    ? `${selectedServicesList.map(s => s.title).join(' + ')} (Combo ${selectedServicesList.length} · ${formattedTotalDuration})`
    : selectedServicesList[0].title;

  // Keep formData.serviceTitle & serviceId synchronized with selectedServicesList & language
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceId: selectedServicesList[0].id,
      serviceTitle: combinedServiceTitle,
    }));
  }, [combinedServiceTitle, selectedServicesList]);

  const syncParentServices = (nextIds: string[]) => {
    setSelectedServiceIds(nextIds);
    if (onChangeSelectedServices) {
      const nextItems = nextIds
        .map(id => currentServices.find(s => s.id === id))
        .filter((s): s is ServiceItem => !!s);
      onChangeSelectedServices(nextItems);
    }
  };

  const handlePrimaryServiceChange = (newPrimaryTitle: string) => {
    const matched = currentServices.find(s => s.title === newPrimaryTitle);
    if (!matched) return;
    const restIds = selectedServiceIds.slice(1).filter(id => id !== matched.id);
    syncParentServices([matched.id, ...restIds]);
  };

  const handleAddComboService = (serviceIdToAdd: string) => {
    if (!serviceIdToAdd || selectedServiceIds.includes(serviceIdToAdd)) return;
    syncParentServices([...selectedServiceIds, serviceIdToAdd]);
  };

  const handleRemoveComboService = (serviceIdToRemove: string) => {
    if (selectedServiceIds.length <= 1) return;
    syncParentServices(selectedServiceIds.filter(id => id !== serviceIdToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'serviceTitle') {
      handlePrimaryServiceChange(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getSlotLabelValue = (slotKey: string) => getSlotLabel(slotKey, t.contact.rightCard.slots);

  const generateWhatsAppUrl = () => {
    return buildWhatsAppBookingUrl(formData, t);
  };

  const handlePrint = () => {
    const source = document.getElementById('contact-summary-ticket');
    const printRoot = document.getElementById('print-root');
    if (source && printRoot) {
      printRoot.innerHTML = source.outerHTML;
    }
    window.print();
  };

  useEffect(() => {
    if (submitted) {
      const source = document.getElementById('contact-summary-ticket');
      const printRoot = document.getElementById('print-root');
      if (source && printRoot) {
        printRoot.innerHTML = source.outerHTML;
      }
    }
  }, [submitted]);

  const generateSelfCopyMailto = () => {
    const isEs = language === 'es';
    const subject = isEs
      ? `Copia de mi solicitud de cita KRbeauté — ${formData.serviceTitle}`
      : `Copie de ma demande de RDV KRbeauté — ${formData.serviceTitle}`;
    const slotLabel = getSlotLabelValue(formData.preferredTimeSlot);
    const dateLabel = formData.preferredDate || (isEs ? 'Por definir' : 'À convenir');
    const bodyLines = isEs ? [
      `¡Hola Karina!`,
      ``,
      `Aquí tienes una copia de mi solicitud de cita enviada desde www.krbeaute.com :`,
      ``,
      `• Tratamiento : ${formData.serviceTitle}`,
      `• Municipio / Zona : ${formData.commune}`,
      `• Fecha preferida : ${dateLabel}`,
      `• Horario : ${slotLabel}`,
      `• Mi nombre : ${formData.name}`,
      `• Teléfono : ${formData.phone}`,
      `• Correo : ${formData.email}`,
      formData.message ? `• Notas adicionales : ${formData.message}` : `• Notas : Ninguna`,
      ``,
      `Datos de contacto de Karina Robart :`,
      `Estética a domicilio en Rennes y alrededores`,
      `Teléfono : 06 65 56 67 02`,
      `Correo : karinarobart@krbeaute.com`,
      `Sitio web : https://www.krbeaute.com`,
    ] : [
      `Bonjour Karina,`,
      ``,
      `Voici la copie de ma demande de rendez-vous transmise depuis www.krbeaute.com :`,
      ``,
      `• Prestation souhaitée : ${formData.serviceTitle}`,
      `• Lieu / Commune : ${formData.commune}`,
      `• Date souhaitée : ${dateLabel}`,
      `• Créneau horaire : ${slotLabel}`,
      `• Mon nom : ${formData.name}`,
      `• Téléphone : ${formData.phone}`,
      `• E-mail : ${formData.email}`,
      formData.message ? `• Précisions éventuelles : ${formData.message}` : `• Précisions : Aucune`,
      ``,
      `Coordonnées officielles de Karina Robart :`,
      `Soins esthétiques sur-mesure à domicile — Rennes et alentours`,
      `Téléphone : 06 65 56 67 02`,
      `E-mail : karinarobart@krbeaute.com`,
      `Site web : https://www.krbeaute.com`,
    ];
    const targetEmail = formData.email || 'karinarobart@krbeaute.com';
    return `mailto:${targetEmail}?cc=karinarobart@krbeaute.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setSubmitError(t.contact.rightCard.termsLabel);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const accessKey = WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitError("La clé Web3Forms n'est pas encore configurée. Renseignez VITE_WEB3FORMS_ACCESS_KEY.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Demande de RDV : ${formData.serviceTitle} — ${formData.name}`,
          from_name: 'KRbeauté Réservations',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          commune: formData.commune,
          prestation: formData.serviceTitle,
          date_souhaitee: formData.preferredDate || 'À convenir',
          creneau_prefere: getSlotLabelValue(formData.preferredTimeSlot),
          precisions: formData.message || 'Aucune précision',
          replyto: formData.email,
          botcheck: false
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message || t.contact.rightCard.errorGeneric);
      }
    } catch {
      setSubmitError(t.contact.rightCard.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 pt-8 pb-6 sm:pt-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Semantic H2 for Search Engines & Assistive Technologies */}
        <h2 className="sr-only">
          {language === 'es' 
            ? 'Contacto y Citas de Estética a Domicilio en Rennes y Alrededores' 
            : 'Contact & Prise de Rendez-vous Esthétique à Domicile à Rennes et Alentours'}
        </h2>
        
        {/* Harmonized 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* CARD 1 (LEFT): CONDITIONS DE RÉSERVATION & COORDONNÉES */}
          <div
            id="booking-conditions-card"
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className={`kr-reveal kr-card-nacre order-2 lg:order-1 bg-white/95 rounded-3xl p-5 sm:p-6 border transition-all duration-500 flex flex-col justify-between h-full ${
              isCardHighlighted
                ? 'border-[#512D6D] ring-4 ring-[#512D6D]/20 shadow-xl scale-[1.01]'
                : 'border-[#D1C4E9]'
            }`}
          >
            <div>
              {/* DESKTOP VIEW: Full flyer layout */}
              <div className="hidden lg:block">
                <div
                  className={`text-center pb-3 mb-3 border-b transition-all duration-500 ${
                    isCardHighlighted
                      ? 'border-[#512D6D]/40 bg-[#D1C4E9]/20 -mx-5 sm:-mx-6 px-5 sm:px-6 pt-2 rounded-t-3xl'
                      : 'border-[#D1C4E9]/60'
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#8B2651] block mb-0.5">
                    {t.contact.leftCard.kicker}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#512D6D] tracking-tight">
                    {t.contact.leftCard.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#8B2651] font-semibold mt-0.5">
                    {t.contact.leftCard.sub}
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#5D4037]/85 mt-1.5 leading-relaxed max-w-md mx-auto">
                    {t.contact.leftCard.intro}
                  </p>
                </div>

                {/* 5 Points directly readable without scrolling */}
                <ol className="space-y-3 text-[13px] sm:text-sm leading-relaxed text-[#5D4037]">
                  {t.contact.leftCard.points.map((pt) => (
                    <li key={pt.num} className="flex items-start gap-2.5">
                      <span className="w-5.5 h-5.5 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                        {pt.num}
                      </span>
                      <div>
                        <strong className="text-[#512D6D] uppercase font-bold text-[12px] sm:text-[13px] tracking-wide">
                          {pt.title}
                        </strong>
                        <p className="text-[#5D4037]/90 text-[13px] sm:text-sm mt-0.5 leading-relaxed">
                          {pt.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* MOBILE VIEW: Ultra-compact Reassurance Card & Modal Trigger */}
              <div className="block lg:hidden">
                <div className="text-center pb-2.5 mb-2.5 border-b border-[#D1C4E9]/60">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#8B2651] block mb-0.5">
                    {t.contact.leftCard.kicker}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] tracking-tight">
                    {t.contact.leftCard.title}
                  </h3>
                  <p className="font-serif italic text-xs text-[#8B2651] font-semibold mt-0.5">
                    {t.contact.leftCard.sub}
                  </p>
                </div>

                {/* Compact Highlights: Horizontal Snap Slider */}
                <div className="my-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]/80 mb-2">
                    {t.contact.leftCard.compactSummaryTitle}
                  </p>

                  <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1.5 -mx-1 px-1">
                    <div className="w-[82vw] max-w-[280px] shrink-0 snap-center flex items-start gap-2.5 p-2.5 bg-[#F9F6F0] rounded-xl border border-[#D1C4E9]/50 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        1
                      </span>
                      <p className="text-xs text-[#5D4037]/90 leading-snug">
                        {t.contact.leftCard.compactPoint1}
                      </p>
                    </div>

                    <div className="w-[82vw] max-w-[280px] shrink-0 snap-center flex items-start gap-2.5 p-2.5 bg-[#F9F6F0] rounded-xl border border-[#D1C4E9]/50 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        2
                      </span>
                      <p className="text-xs text-[#5D4037]/90 leading-snug">
                        {t.contact.leftCard.compactPoint2}
                      </p>
                    </div>

                    <div className="w-[82vw] max-w-[280px] shrink-0 snap-center flex items-start gap-2.5 p-2.5 bg-[#F9F6F0] rounded-xl border border-[#D1C4E9]/50 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                        3
                      </span>
                      <p className="text-xs text-[#5D4037]/90 leading-snug">
                        {t.contact.leftCard.compactPoint3}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Trigger Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsConditionsModalOpen(true)}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#512D6D]/10 hover:bg-[#512D6D]/15 active:scale-98 border border-[#512D6D]/25 text-[#512D6D] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-[#8B2651]" />
                    <span>{t.contact.leftCard.viewConditionsBtn} →</span>
                  </button>
                </div>
              </div>

              {/* Polite closing phrase */}
              <div className="mt-3.5 pt-2 border-t border-[#D1C4E9]/50 text-center space-y-2">
                <p className="font-serif italic text-xs text-[#512D6D] font-medium">
                  {t.contact.leftCard.callout}
                </p>
                {onOpenClientSheet && (
                  <button
                    type="button"
                    onClick={onOpenClientSheet}
                    className="min-h-[40px] inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F9F6F0] hover:bg-[#D1C4E9]/40 border border-[#D1C4E9] text-[#512D6D] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5 text-[#8B2651]" />
                    <span>{t.nav.tabs.ficheCliente} →</span>
                  </button>
                )}
              </div>
            </div>

            {/* Direct Contact & Social Footer Bar (Desktop only, avoids duplication with mobile footer) */}
            <div className="hidden lg:flex mt-4 pt-3 border-t border-[#D1C4E9]/60 flex-wrap items-center justify-between gap-2.5 text-xs text-[#5D4037]">
              <div className="flex flex-wrap items-center gap-3">
                <a href="tel:+33665566702" className="inline-flex items-center gap-1.5 font-bold text-[#512D6D] hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  <span>06 65 56 67 02</span>
                </a>
                <span className="text-[#D1C4E9]">·</span>
                <a href="mailto:karinarobart@krbeaute.com" className="inline-flex items-center gap-1.5 text-[#5D4037]/90 hover:underline">
                  <Mail className="w-3.5 h-3.5 text-[#512D6D]" />
                  <span>karinarobart@krbeaute.com</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#512D6D] font-semibold bg-[#D1C4E9]/30 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>{t.contact.leftCard.freeZone}</span>
                </span>
                <a
                  href="https://instagram.com/karinarobart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D1C4E9]/40 hover:bg-[#512D6D] hover:text-white text-[11px] font-semibold text-[#512D6D] transition-colors"
                >
                  <Instagram className="w-3 h-3" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* CARD 2 (RIGHT): PRENDRE RENDEZ-VOUS (WHATSAPP + FORMULAIRE) */}
          <div
            style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre order-1 lg:order-2 bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#D1C4E9] flex flex-col justify-between h-full"
          >
            <div>
              {/* Quick WhatsApp Action Banner */}
              <div className="mb-4 p-3 sm:p-3.5 bg-gradient-to-r from-[#512D6D] via-[#633385] to-[#512D6D] text-white rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D1C4E9] block leading-tight">
                    {t.contact.rightCard.fastest}
                  </span>
                  <p className="font-serif font-bold text-sm sm:text-base leading-tight">
                    {t.contact.rightCard.whatsappBanner}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[38px] flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white text-[#512D6D] hover:bg-[#F9F6F0] active:scale-98 rounded-full text-xs font-bold shadow-xs transition-transform"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.contact.rightCard.whatsappClick}</span>
                  </a>
                  <a
                    href="tel:+33665566702"
                    className="min-h-[38px] inline-flex items-center justify-center px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-full text-xs font-semibold text-white border border-white/25"
                    title={t.contact.rightCard.callTitle}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Form Title & Instruction */}
              <div className="mb-3 flex items-center justify-between text-xs text-[#5D4037]">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#5D4037]">
                  {t.contact.rightCard.formTitle}
                </h3>
                <span className="text-[11px] text-[#5D4037]/70">
                  {t.contact.rightCard.formSub}
                </span>
              </div>

              {submitted ? (
                <div className="p-4 sm:p-5 bg-[#D1C4E9]/20 rounded-2xl border border-[#512D6D]/30 space-y-3.5 animate-fadeIn my-auto text-left">
                  {/* Success Header */}
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#512D6D] text-white flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#512D6D]">
                      {t.contact.rightCard.success.thanks} {formData.name} !
                    </h4>
                    <p className="text-xs text-[#5D4037]/90 max-w-sm mx-auto leading-relaxed">
                      {t.contact.rightCard.success.body
                        .replace('{service}', formData.serviceTitle)
                        .replace('{commune}', formData.commune)
                        .replace('{phone}', formData.phone)}
                    </p>
                  </div>

                  {/* Printable & On-screen Summary Receipt Card */}
                  <div
                    id="contact-summary-ticket"
                    className="printable-summary bg-white rounded-xl p-3.5 sm:p-4 border border-[#D1C4E9] shadow-2xs text-xs space-y-2.5"
                  >
                    {/* Header in print only */}
                    <div className="hidden print:block border-b border-[#D1C4E9] pb-3 mb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-serif text-base font-bold text-[#512D6D]">{t.contact.rightCard.success.printBrandTitle}</p>
                          <p className="text-[11px] text-[#5D4037]">{t.contact.rightCard.success.printBrandSub}</p>
                        </div>
                        <div className="text-right text-[10px] text-[#5D4037]/80">
                          <p>06 65 56 67 02</p>
                          <p>karinarobart@krbeaute.com</p>
                          <p>www.krbeaute.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-b border-[#D1C4E9]/60 pb-2">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#512D6D]" />
                        <span className="font-serif font-bold text-xs sm:text-sm text-[#512D6D]">
                          {t.contact.rightCard.success.recapTitle}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#D1C4E9]/40 text-[#512D6D]">
                        {formData.commune}
                      </span>
                    </div>

                    <div className="summary-grid grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs">
                      <div className="summary-card-item bg-[#F9F6F0] p-2 rounded-lg border border-[#D1C4E9]/40">
                        <span className="text-[10px] uppercase font-bold text-[#512D6D]/80 block">
                          {t.contact.rightCard.success.serviceLabel}
                        </span>
                        <span className="font-semibold text-[#512D6D]">{formData.serviceTitle}</span>
                      </div>

                      <div className="summary-card-item bg-[#F9F6F0] p-2 rounded-lg border border-[#D1C4E9]/40">
                        <span className="text-[10px] uppercase font-bold text-[#512D6D]/80 block">
                          {t.contact.rightCard.success.locationLabel}
                        </span>
                        <span className="font-medium text-[#5D4037]">{formData.commune}</span>
                      </div>

                      <div className="summary-card-item bg-[#F9F6F0] p-2 rounded-lg border border-[#D1C4E9]/40">
                        <span className="text-[10px] uppercase font-bold text-[#512D6D]/80 block">
                          {t.contact.rightCard.success.dateLabel} & {t.contact.rightCard.success.slotLabel}
                        </span>
                        <span className="font-medium text-[#5D4037]">
                          {formData.preferredDate || t.contact.whatsappTemplate.toAgree} · {getSlotLabelValue(formData.preferredTimeSlot)}
                        </span>
                      </div>

                      <div className="summary-card-item bg-[#F9F6F0] p-2 rounded-lg border border-[#D1C4E9]/40">
                        <span className="text-[10px] uppercase font-bold text-[#512D6D]/80 block">
                          {t.contact.rightCard.success.phoneLabel} & {t.contact.rightCard.success.emailLabel}
                        </span>
                        <span className="font-medium text-[#5D4037]">
                          {formData.phone} {formData.email ? `· ${formData.email}` : ''}
                        </span>
                      </div>
                    </div>

                    {formData.message && (
                      <div className="summary-card-item bg-[#F9F6F0] p-2 rounded-lg border border-[#D1C4E9]/40 text-[11px]">
                        <span className="text-[10px] uppercase font-bold text-[#512D6D]/80 block">
                          {t.contact.rightCard.success.notesLabel}
                        </span>
                        <span className="text-[#5D4037] italic">{formData.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="no-print pt-1 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] rounded-full text-xs font-semibold shadow-2xs transition-all active:scale-98 cursor-pointer"
                      title={t.contact.rightCard.success.printBtn}
                    >
                      <Printer className="w-3.5 h-3.5 text-[#512D6D]" />
                      <span>{t.contact.rightCard.success.printBtn}</span>
                    </button>

                    <a
                      href={generateSelfCopyMailto()}
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] rounded-full text-xs font-semibold shadow-2xs transition-all active:scale-98"
                      title={t.contact.rightCard.success.emailCopyBtn}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#512D6D]" />
                      <span>{t.contact.rightCard.success.emailCopyBtn}</span>
                    </a>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#512D6D] hover:bg-[#402257] text-white rounded-full text-xs font-semibold shadow-xs transition-all active:scale-98"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{t.contact.rightCard.success.confirmWhatsApp}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="min-h-[44px] px-3.5 py-2 bg-white border border-[#D1C4E9] text-[#5D4037] rounded-full text-xs font-medium hover:bg-[#F9F6F0] transition-colors cursor-pointer"
                    >
                      {t.contact.rightCard.success.newRequest}
                    </button>
                  </div>

                  <div className="no-print mt-3 pt-3 border-t border-[#D1C4E9]/60 text-left">
                    <PaymentDetailsCard compact />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                  
                  {/* Live Smart Recap Banner (Service(s) + Commune + Combo Free Travel + Total Estimé) */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#F9F6F0] via-[#FFFDF9] to-[#D1C4E9]/25 border border-[#D1C4E9] shadow-2xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8B2651]">
                        {t.contact.rightCard.liveRecapKicker}
                      </span>
                      {isCombo && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                          {t.contact.rightCard.comboBadgeTitle
                            .replace('{count}', String(selectedServicesList.length))
                            .replace('{duration}', formattedTotalDuration)}
                        </span>
                      )}
                    </div>

                    {/* Selected service(s) breakdown */}
                    <div className="space-y-1">
                      {selectedServicesList.map((srv, idx) => (
                        <div key={srv.id} className="flex items-center justify-between gap-2 text-xs text-[#5D4037]">
                          <span className="font-semibold truncate">
                            {idx > 0 ? `+ ${srv.title}` : srv.title} ({srv.duration})
                          </span>
                          <span className="font-bold text-[#7A2048] shrink-0">
                            {srv.price} €
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Commune & Travel Fee (0 € if Combo or Zone 1) */}
                    <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#5D4037]/85">
                      <span className="truncate">
                        {t.contact.rightCard.liveRecapLocation.replace('{commune}', activeCommune.name)}
                      </span>
                      <span
                        className={`font-semibold shrink-0 ${
                          effectiveFee === 0 ? 'text-emerald-700' : 'text-[#512D6D]'
                        }`}
                      >
                        {isCombo ? (
                          <>
                            {baseCommuneFee > 0 && (
                              <span className="line-through text-[#5D4037]/50 mr-1.5 font-normal">
                                +{formattedBaseFee} €
                              </span>
                            )}
                            <span>{t.contact.rightCard.comboFeeFreeApplied}</span>
                          </>
                        ) : baseCommuneFee === 0 ? (
                          t.contact.rightCard.liveRecapFeeFree
                        ) : (
                          t.contact.rightCard.liveRecapFeePaid.replace('{fee}', formattedBaseFee)
                        )}
                      </span>
                    </div>

                    {/* Helpful tip when in Zone 2 with only 1 service */}
                    {!isCombo && baseCommuneFee > 0 && (
                      <p className="text-[11px] text-[#512D6D] bg-[#D1C4E9]/35 px-2.5 py-1 rounded-lg font-medium">
                        {t.contact.rightCard.comboTipZone2.replace('{fee}', formattedBaseFee)}
                      </p>
                    )}

                    <div className="pt-1.5 border-t border-[#D1C4E9]/60 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#512D6D]">
                        {t.contact.rightCard.liveRecapTotalLabel} ({formattedTotalDuration})
                      </span>
                      <span className="font-serif text-base sm:text-lg font-bold text-[#7A2048]">
                        {formattedTotal} €
                      </span>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder={t.contact.rightCard.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        className="min-h-[42px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.phoneLabel}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder={t.contact.rightCard.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        className="min-h-[42px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                  </div>

                  {/* Email & Commune */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder={t.contact.rightCard.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        className="min-h-[42px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-commune" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.communeLabel}
                      </label>
                      <select
                        id="contact-commune"
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        className="min-h-[42px] w-full px-2.5 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      >
                        {COMMUNES_DATA.map((c) => (
                          <option key={`${c.name}-${c.postalCode}`} value={c.name}>
                            {c.name} {c.feeEuro === 0 ? t.contact.rightCard.freeOffered : `(+${c.feeEuro.toString().replace('.', ',')} €)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Service Selection (Single or Multi-Soin Combo) */}
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037]">
                      {t.contact.rightCard.serviceLabel}
                    </label>
                    <select
                      id="contact-service"
                      name="serviceTitle"
                      value={selectedServicesList[0].title}
                      onChange={handleChange}
                      className="min-h-[42px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D] font-medium"
                    >
                      {currentServices.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} — {s.duration} ({s.price} €)
                        </option>
                      ))}
                    </select>

                    {/* Selected Combo Services Pills (when >= 2 services selected) */}
                    {selectedServicesList.length >= 2 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {selectedServicesList.map((srv, idx) => (
                          <span
                            key={srv.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#512D6D]/10 border border-[#512D6D]/30 text-xs font-semibold text-[#512D6D]"
                          >
                            <span>
                              {idx + 1}. {srv.title} ({srv.price} €)
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveComboService(srv.id)}
                              aria-label={t.contact.rightCard.removeServiceTitle}
                              title={t.contact.rightCard.removeServiceTitle}
                              className="text-[#512D6D]/70 hover:text-[#7A2048] cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Add Additional Service for Combo */}
                    {selectedServicesList.length < currentServices.length && (
                      <div className="pt-0.5">
                        <label htmlFor="contact-combo-add" className="block text-[11px] font-bold text-[#7A2048] mb-1">
                          {t.contact.rightCard.addSecondServiceLabel}
                        </label>
                        <select
                          id="contact-combo-add"
                          value=""
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAddComboService(e.target.value);
                            }
                          }}
                          className="min-h-[38px] w-full px-3 py-1.5 bg-white border border-dashed border-[#8B2651]/45 rounded-xl text-xs sm:text-[13px] text-[#512D6D] font-medium focus:outline-none focus:border-[#512D6D] cursor-pointer"
                        >
                          <option value="">{t.contact.rightCard.addServicePlaceholder}</option>
                          {currentServices
                            .filter((s) => !selectedServiceIds.includes(s.id))
                            .map((s) => (
                              <option key={s.id} value={s.id}>
                                + {s.title} — {s.duration} ({s.price} €)
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="contact-date" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.dateLabel}
                      </label>
                      <div className="relative">
                        <input
                          id="contact-date"
                          type={dateFocused || formData.preferredDate ? 'date' : 'text'}
                          name="preferredDate"
                          placeholder={language === 'es' ? 'dd/mm/aaaa' : 'jj/mm/aaaa'}
                          value={formData.preferredDate}
                          onFocus={(e) => {
                            setDateFocused(true);
                            try {
                              e.currentTarget.showPicker?.();
                            } catch {}
                          }}
                          onClick={(e) => {
                            setDateFocused(true);
                            try {
                              e.currentTarget.showPicker?.();
                            } catch {}
                          }}
                          onBlur={() => {
                            if (!formData.preferredDate) setDateFocused(false);
                          }}
                          onChange={handleChange}
                          className="min-h-[42px] w-full px-3 py-2 pr-9 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                        />
                        <Calendar className="w-4 h-4 text-[#512D6D]/60 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-slot" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                        {t.contact.rightCard.slotLabel}
                      </label>
                      <select
                        id="contact-slot"
                        name="preferredTimeSlot"
                        value={formData.preferredTimeSlot}
                        onChange={handleChange}
                        className="min-h-[42px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      >
                        <option value="morning">{t.contact.rightCard.slots.morning}</option>
                        <option value="noon">{t.contact.rightCard.slots.noon}</option>
                        <option value="afternoon">{t.contact.rightCard.slots.afternoon}</option>
                        <option value="evening">{t.contact.rightCard.slots.evening}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Details */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1">
                      {t.contact.rightCard.msgLabel}
                    </label>
                    <input
                      id="contact-message"
                      type="text"
                      name="message"
                      placeholder={t.contact.rightCard.msgPlaceholder}
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[40px] w-full px-3 py-2 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                    />
                  </div>

                  {/* Honeypot anti-spam */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  {/* Terms acceptance checkbox */}
                  <div className="pt-0.5">
                    <label htmlFor="contact-terms" className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#5D4037] cursor-pointer select-none">
                      <input
                        id="contact-terms"
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          if (e.target.checked && submitError) setSubmitError(null);
                        }}
                        className="w-5 h-5 rounded-md border-[#D1C4E9] text-[#512D6D] accent-[#512D6D] focus:ring-[#512D6D] shrink-0 mt-0.5 cursor-pointer"
                      />
                      <span className="leading-snug">
                        {renderTermsLabel()}
                      </span>
                    </label>
                  </div>

                  {/* Error banner if submission failed */}
                  {submitError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[11px] flex items-start gap-2 animate-fadeIn">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <div className="flex-1">
                        <p className="font-semibold">{t.contact.rightCard.errorTitle}</p>
                        <p className="mt-0.5">{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Action Buttons */}
                  <div className="pt-1.5 flex items-center gap-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`kr-btn-silk min-h-[42px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#512D6D] hover:bg-[#402257] active:scale-98 rounded-full shadow-xs transition-transform cursor-pointer ${
                        isSubmitting ? 'opacity-70 cursor-wait' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{t.contact.rightCard.submittingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>{t.contact.rightCard.submitBtn}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-[#512D6D] bg-[#D1C4E9]/40 hover:bg-[#D1C4E9]/70 rounded-full transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.contact.rightCard.whatsappBtn}</span>
                    </a>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Dedicated Booking Conditions Modal */}
      <BookingConditionsModal
        isOpen={isConditionsModalOpen}
        onClose={() => setIsConditionsModalOpen(false)}
      />
    </section>
  );
};

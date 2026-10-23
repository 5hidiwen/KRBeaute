import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Instagram } from 'lucide-react';
import { getServices, ServiceItem } from '../data/servicesData';
import { COMMUNES_DATA } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';

interface ContactSectionProps {
  selectedService?: ServiceItem | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
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

  // Synchronize when selectedService changes
  useEffect(() => {
    if (selectedService) {
      const match = currentServices.find(s => s.id === selectedService.id) || selectedService;
      setFormData(prev => ({
        ...prev,
        serviceId: match.id,
        serviceTitle: match.title
      }));
    }
  }, [selectedService, currentServices]);

  // Synchronize serviceTitle if language changes
  useEffect(() => {
    const matchedService = currentServices.find(s => s.id === formData.serviceId);
    if (matchedService) {
      setFormData(prev => ({
        ...prev,
        serviceTitle: matchedService.title
      }));
    }
  }, [language, currentServices, formData.serviceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'serviceTitle') {
      const matched = currentServices.find(s => s.title === value);
      setFormData(prev => ({
        ...prev,
        serviceTitle: value,
        serviceId: matched ? matched.id : prev.serviceId
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getSlotLabel = (slotKey: string) => {
    const slots = t.contact.rightCard.slots;
    if (slotKey === 'morning') return slots.morning;
    if (slotKey === 'noon') return slots.noon;
    if (slotKey === 'afternoon') return slots.afternoon;
    if (slotKey === 'evening') return slots.evening;
    return slotKey;
  };

  const generateWhatsAppUrl = () => {
    const wt = t.contact.whatsappTemplate;
    const slotText = getSlotLabel(formData.preferredTimeSlot);
    const dateText = formData.preferredDate || wt.toAgree;
    const nameText = formData.name || wt.clientDefault;

    const text = encodeURIComponent(
      `${wt.greeting}\n\n${wt.intro}\n` +
      `${wt.service} ${formData.serviceTitle}\n` +
      `${wt.location} ${formData.commune}\n` +
      `${wt.slot} ${dateText} (${slotText})\n` +
      `${wt.name} ${nameText}\n` +
      (formData.message ? `${wt.precision} ${formData.message}\n` : '') +
      `\n${wt.closing}`
    );
    return `https://wa.me/33665566702?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="pt-4 pb-8 sm:pt-6 sm:pb-12 bg-gradient-to-b from-[#F9F6F0] via-[#F3EDE2]/60 to-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Harmonized 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* CARD 1 (LEFT): CONDITIONS DE RÉSERVATION & COORDONNÉES */}
          <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#D1C4E9] shadow-sm flex flex-col justify-between h-full">
            <div>
              {/* Card Header matching flyer */}
              <div className="text-center pb-3 mb-3 border-b border-[#D1C4E9]/60">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#8B2651] block mb-0.5">
                  {t.contact.leftCard.kicker}
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#512D6D] tracking-tight">
                  {t.contact.leftCard.title}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-[#8B2651] font-semibold mt-0.5">
                  {t.contact.leftCard.sub}
                </p>
                <p className="text-[11px] sm:text-xs text-[#5D4037]/80 mt-1.5 leading-snug max-w-md mx-auto">
                  {t.contact.leftCard.intro}
                </p>
              </div>

              {/* 5 Points directly readable without scrolling */}
              <ol className="space-y-2.5 sm:space-y-3 text-xs sm:text-[13px] leading-relaxed text-[#5D4037]">
                {t.contact.leftCard.points.map((pt) => (
                  <li key={pt.num} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                      {pt.num}
                    </span>
                    <div>
                      <strong className="text-[#512D6D] uppercase font-bold text-[11px] sm:text-xs">
                        {pt.title}
                      </strong>
                      <p className="text-[#5D4037]/90 text-[11px] sm:text-xs mt-0.5">
                        {pt.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Polite closing phrase */}
              <div className="mt-3.5 pt-2 border-t border-[#D1C4E9]/50 text-center">
                <p className="font-serif italic text-xs text-[#512D6D] font-medium">
                  {t.contact.leftCard.callout}
                </p>
              </div>
            </div>

            {/* Direct Contact & Social Footer Bar */}
            <div className="mt-4 pt-3 border-t border-[#D1C4E9]/60 flex flex-wrap items-center justify-between gap-2.5 text-xs text-[#5D4037]">
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
          <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#D1C4E9] shadow-sm flex flex-col justify-between h-full">
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
                <span className="font-serif font-bold text-sm sm:text-base text-[#5D4037]">
                  {t.contact.rightCard.formTitle}
                </span>
                <span className="text-[11px] text-[#5D4037]/70">
                  {t.contact.rightCard.formSub}
                </span>
              </div>

              {submitted ? (
                <div className="p-6 bg-[#D1C4E9]/30 rounded-2xl border border-[#512D6D]/30 text-center space-y-3 animate-fadeIn my-auto">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#512D6D] text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#512D6D]">
                    {t.contact.rightCard.success.thanks} {formData.name} !
                  </h4>
                  <p className="text-xs text-[#5D4037]/90 max-w-sm mx-auto leading-relaxed">
                    {t.contact.rightCard.success.body
                      .replace('{service}', formData.serviceTitle)
                      .replace('{commune}', formData.commune)
                      .replace('{phone}', formData.phone)}
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#512D6D] text-white rounded-full text-xs font-semibold shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{t.contact.rightCard.success.confirmWhatsApp}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-3.5 py-2 bg-white border border-[#D1C4E9] text-[#5D4037] rounded-full text-xs font-medium hover:bg-[#F9F6F0]"
                    >
                      {t.contact.rightCard.success.newRequest}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t.contact.rightCard.namePlaceholder}
                        value={formData.name}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder={t.contact.rightCard.phonePlaceholder}
                        value={formData.phone}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                  </div>

                  {/* Email & Commune */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t.contact.rightCard.emailPlaceholder}
                        value={formData.email}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.communeLabel}
                      </label>
                      <select
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-2.5 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D] text-xs"
                      >
                        {COMMUNES_DATA.map((c) => (
                          <option key={`${c.name}-${c.postalCode}`} value={c.name}>
                            {c.name} {c.feeEuro === 0 ? t.contact.rightCard.freeOffered : `(+${c.feeEuro} €)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                      {t.contact.rightCard.serviceLabel}
                    </label>
                    <select
                      name="serviceTitle"
                      value={formData.serviceTitle}
                      onChange={handleChange}
                      className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D] font-medium"
                    >
                      {currentServices.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} — {s.duration} ({s.price} €)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.dateLabel}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                        {t.contact.rightCard.slotLabel}
                      </label>
                      <select
                        name="preferredTimeSlot"
                        value={formData.preferredTimeSlot}
                        onChange={handleChange}
                        className="min-h-[40px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
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
                    <label className="block text-[11px] font-semibold text-[#5D4037] mb-0.5">
                      {t.contact.rightCard.msgLabel}
                    </label>
                    <input
                      type="text"
                      name="message"
                      placeholder={t.contact.rightCard.msgPlaceholder}
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[38px] w-full px-3 py-1.5 bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                    />
                  </div>

                  {/* Terms acceptance checkbox */}
                  <div className="pt-0.5">
                    <label className="flex items-start gap-2 text-[11px] text-[#5D4037] cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        className="mt-0.5 rounded border-[#D1C4E9] text-[#512D6D] focus:ring-[#512D6D]"
                      />
                      <span className="leading-tight">
                        {t.contact.rightCard.termsLabel}
                      </span>
                    </label>
                  </div>

                  {/* Submit Action Buttons */}
                  <div className="pt-1.5 flex items-center gap-2.5">
                    <button
                      type="submit"
                      className="min-h-[42px] flex-1 inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#512D6D] hover:bg-[#402257] active:scale-98 rounded-full shadow-xs transition-transform cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.contact.rightCard.submitBtn}</span>
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
    </section>
  );
};

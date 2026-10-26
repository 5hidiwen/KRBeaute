import React, { useState } from 'react';
import {
  ClipboardCheck,
  User,
  Sparkles,
  HeartPulse,
  Star,
  Send,
  MessageCircle,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react';
import { COMMUNES_DATA } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';
import { WEB3FORMS_ACCESS_KEY } from '../config/contact';

type SkinTypeKey = 'seche' | 'mixte' | 'grasse' | 'sensible' | 'mature' | 'deshydratee';
type ContraindicationKey = 'aucune' | 'grossesse' | 'pacemaker' | 'allergies' | 'traitement' | 'soleil';
type GoalKey = 'eclat' | 'antiAge' | 'hydratation' | 'purete' | 'regard' | 'detente';

export const ClientSheetSection: React.FC = () => {
  const { t } = useLanguage();
  const cs = t.clientSheet;

  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    commune: 'Rennes Centre & Quartiers',
    addressNote: '',
    skinZones: '',
    healthNotes: '',
    routine: '',
  });

  const [selectedSkinTypes, setSelectedSkinTypes] = useState<SkinTypeKey[]>([]);
  const [selectedContraindications, setSelectedContraindications] = useState<ContraindicationKey[]>(['aucune']);
  const [selectedGoals, setSelectedGoals] = useState<GoalKey[]>([]);

  const [consentAccepted, setConsentAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkinType = (key: SkinTypeKey) => {
    setSelectedSkinTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleContraindication = (key: ContraindicationKey) => {
    setSelectedContraindications((prev) => {
      if (key === 'aucune') {
        return ['aucune'];
      }
      const withoutAucune = prev.filter((k) => k !== 'aucune');
      if (withoutAucune.includes(key)) {
        const next = withoutAucune.filter((k) => k !== key);
        return next.length === 0 ? ['aucune'] : next;
      }
      return [...withoutAucune, key];
    });
  };

  const toggleGoal = (key: GoalKey) => {
    setSelectedGoals((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const skinTypesList: { key: SkinTypeKey; label: string }[] = [
    { key: 'seche', label: cs.skinTypes.seche },
    { key: 'mixte', label: cs.skinTypes.mixte },
    { key: 'grasse', label: cs.skinTypes.grasse },
    { key: 'sensible', label: cs.skinTypes.sensible },
    { key: 'mature', label: cs.skinTypes.mature },
    { key: 'deshydratee', label: cs.skinTypes.deshydratee },
  ];

  const contraindicationsList: { key: ContraindicationKey; label: string }[] = [
    { key: 'aucune', label: cs.contraindications.aucune },
    { key: 'grossesse', label: cs.contraindications.grossesse },
    { key: 'pacemaker', label: cs.contraindications.pacemaker },
    { key: 'allergies', label: cs.contraindications.allergies },
    { key: 'traitement', label: cs.contraindications.traitement },
    { key: 'soleil', label: cs.contraindications.soleil },
  ];

  const goalsList: { key: GoalKey; label: string }[] = [
    { key: 'eclat', label: cs.goals.eclat },
    { key: 'antiAge', label: cs.goals.antiAge },
    { key: 'hydratation', label: cs.goals.hydratation },
    { key: 'purete', label: cs.goals.purete },
    { key: 'regard', label: cs.goals.regard },
    { key: 'detente', label: cs.goals.detente },
  ];

  const formatSkinSummary = () => {
    if (selectedSkinTypes.length === 0) return cs.whatsappTemplate.none;
    return selectedSkinTypes.map((k) => cs.skinTypes[k]).join(', ');
  };

  const formatHealthSummary = () => {
    if (selectedContraindications.length === 0) return cs.whatsappTemplate.none;
    return selectedContraindications.map((k) => cs.contraindications[k]).join(', ');
  };

  const formatGoalsSummary = () => {
    if (selectedGoals.length === 0) return cs.whatsappTemplate.none;
    return selectedGoals.map((k) => cs.goals[k]).join(', ');
  };

  const generateWhatsAppUrl = () => {
    const wt = cs.whatsappTemplate;
    const lines = [
      wt.header,
      '',
      `${wt.identity} ${formData.fullName || wt.none}${formData.birthDate ? ` (${formData.birthDate})` : ''}`,
      `📞 ${formData.phone || wt.none} · ✉️ ${formData.email || wt.none}`,
      `📍 ${formData.commune}${formData.addressNote ? ` — ${formData.addressNote}` : ''}`,
      '',
      `${wt.skin} ${formatSkinSummary()}`,
      ...(formData.skinZones ? [`• ${formData.skinZones}`] : []),
      '',
      `${wt.health} ${formatHealthSummary()}`,
      ...(formData.healthNotes ? [`• ${formData.healthNotes}`] : []),
      '',
      `${wt.goals} ${formatGoalsSummary()}`,
      ...(formData.routine ? ['', `${wt.routine} ${formData.routine}`] : []),
      '',
      wt.closing,
    ];
    return `https://wa.me/33665566702?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const generateMailtoUrl = () => {
    const wt = cs.whatsappTemplate;
    const subject = `Fiche Cliente & Diagnostic Beauté — ${formData.fullName || 'Cliente'} (${formData.commune})`;
    const bodyLines = [
      'Bonjour Karina,',
      '',
      'Voici ma Fiche Cliente & Pré-Diagnostic Beauté :',
      '',
      `1. COORDONNÉES`,
      `- Nom & Prénom : ${formData.fullName || wt.none}`,
      `- Date de naissance / Âge : ${formData.birthDate || wt.none}`,
      `- Téléphone : ${formData.phone || wt.none}`,
      `- Email : ${formData.email || wt.none}`,
      `- Commune : ${formData.commune}`,
      `- Adresse / Accès : ${formData.addressNote || wt.none}`,
      '',
      `2. PROFIL CUTANÉ & TYPE DE PEAU`,
      `- Type(s) de peau : ${formatSkinSummary()}`,
      `- Zones sensibles / particularités : ${formData.skinZones || wt.none}`,
      '',
      `3. SANTÉ, ALLERGIES & CONTRE-INDICATIONS`,
      `- Déclaration : ${formatHealthSummary()}`,
      `- Précisions santé / allergies : ${formData.healthNotes || wt.none}`,
      '',
      `4. ROUTINE & OBJECTIFS BEAUTÉ`,
      `- Objectifs recherchés : ${formatGoalsSummary()}`,
      `- Routine actuelle & attentes : ${formData.routine || wt.none}`,
      '',
      wt.closing,
    ];
    return `mailto:karinarobart@krbeaute.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setSubmitError(cs.errorConsent);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `📋 Fiche Cliente : ${formData.fullName} — ${formData.commune}`,
          from_name: 'KRbeauté · Fiche Cliente',
          destinataire: 'Karina Robart (karinarobart@krbeaute.com)',
          nom_complet: formData.fullName,
          date_naissance_ou_age: formData.birthDate || cs.whatsappTemplate.none,
          telephone: formData.phone,
          email: formData.email,
          commune: formData.commune,
          adresse_ou_acces: formData.addressNote || cs.whatsappTemplate.none,
          type_de_peau: formatSkinSummary(),
          particularites_cutanees: formData.skinZones || cs.whatsappTemplate.none,
          sante_et_contre_indications: formatHealthSummary(),
          precisions_sante_allergies: formData.healthNotes || cs.whatsappTemplate.none,
          objectifs_beaute: formatGoalsSummary(),
          routine_actuelle_et_attentes: formData.routine || cs.whatsappTemplate.none,
          replyto: formData.email,
          botcheck: false,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.message || cs.errorGeneric);
      }
    } catch {
      setSubmitError(cs.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="fiche-cliente"
      className="scroll-mt-20 sm:scroll-mt-24 py-4 sm:py-8 bg-[#F9F6F0]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1C4E9]/40 text-[#512D6D] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <ClipboardCheck className="w-3.5 h-3.5 text-[#8B2651]" />
            <span>{cs.kicker}</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#512D6D] tracking-tight">
            {cs.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4037]/85 mt-2.5 leading-relaxed">
            {cs.subtitle}
          </p>

          {/* Confidentiality Pill */}
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white border border-[#D1C4E9] shadow-2xs text-[11px] sm:text-xs text-[#5D4037]">
            <ShieldCheck className="w-4 h-4 text-[#512D6D] shrink-0" />
            <span className="font-semibold text-[#512D6D]">{cs.confidentialBadge}</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#D1C4E9] shadow-sm">
          {submitted ? (
            <div className="max-w-xl mx-auto py-8 px-4 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#512D6D] text-white flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#D1C4E9]/40 text-[#512D6D] text-xs font-bold uppercase tracking-wider">
                {cs.success.badge}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#512D6D]">
                {cs.success.title.replace('{name}', formData.fullName)}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D4037]/90 leading-relaxed">
                {cs.success.body.replace('{commune}', formData.commune)}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#512D6D] hover:bg-[#402257] text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>{cs.success.whatsappCta}</span>
                </a>
                <a
                  href={generateMailtoUrl()}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#F9F6F0] hover:bg-[#D1C4E9]/35 border border-[#D1C4E9] text-[#512D6D] text-xs sm:text-sm font-semibold transition-all active:scale-98"
                >
                  <Mail className="w-4 h-4 text-[#512D6D]" />
                  <span>{cs.success.mailtoCta}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="min-h-[48px] px-4 py-2.5 rounded-full bg-white border border-[#D1C4E9] text-[#5D4037] text-xs font-medium hover:bg-[#F9F6F0] cursor-pointer"
                >
                  {cs.success.newSheetBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* ROW 1: BLOCK 1 (COORDONNÉES) & BLOCK 2 (PROFIL CUTANÉ) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* BLOCK 1: COORDONNÉES COMPLÈTES */}
                <div className="bg-[#F9F6F0]/60 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9]/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#D1C4E9]/60">
                      <div className="w-8 h-8 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] leading-tight">
                          {cs.step1Title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#5D4037]/75">{cs.step1Sub}</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      {/* Full Name & BirthDate/Age */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="sheet-fullname"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.fullNameLabel}
                          </label>
                          <input
                            id="sheet-fullname"
                            type="text"
                            name="fullName"
                            required
                            placeholder={cs.fullNamePlaceholder}
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="sheet-birthdate"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.birthDateLabel}
                          </label>
                          <input
                            id="sheet-birthdate"
                            type="text"
                            name="birthDate"
                            placeholder={cs.birthDatePlaceholder}
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          />
                        </div>
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="sheet-phone"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.phoneLabel}
                          </label>
                          <input
                            id="sheet-phone"
                            type="tel"
                            name="phone"
                            required
                            placeholder={cs.phonePlaceholder}
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="sheet-email"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.emailLabel}
                          </label>
                          <input
                            id="sheet-email"
                            type="email"
                            name="email"
                            required
                            placeholder={cs.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          />
                        </div>
                      </div>

                      {/* Commune & Address Note */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="sheet-commune"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.communeLabel}
                          </label>
                          <select
                            id="sheet-commune"
                            name="commune"
                            value={formData.commune}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-2.5 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          >
                            {COMMUNES_DATA.map((c) => (
                              <option key={`${c.name}-${c.postalCode}`} value={c.name}>
                                {c.name} {c.feeEuro === 0 ? cs.freeOffered : `(+${c.feeEuro.toString().replace('.', ',')} €)`}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="sheet-address"
                            className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                          >
                            {cs.addressNoteLabel}
                          </label>
                          <input
                            id="sheet-address"
                            type="text"
                            name="addressNote"
                            placeholder={cs.addressNotePlaceholder}
                            value={formData.addressNote}
                            onChange={handleInputChange}
                            className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOCK 2: PROFIL CUTANÉ & TYPE DE PEAU */}
                <div className="bg-[#F9F6F0]/60 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9]/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#D1C4E9]/60">
                      <div className="w-8 h-8 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] leading-tight">
                          {cs.step2Title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#5D4037]/75">{cs.step2Sub}</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <span className="block text-xs sm:text-[13px] font-semibold text-[#5D4037]">
                          {cs.skinTypesLabel}
                        </span>
                        <span className="block text-[11px] text-[#5D4037]/70 mb-2">
                          {cs.skinTypesHint}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {skinTypesList.map((item) => {
                            const isSelected = selectedSkinTypes.includes(item.key);
                            return (
                              <button
                                key={item.key}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleSkinType(item.key)}
                                className={`min-h-[48px] px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                                  isSelected
                                    ? 'bg-[#512D6D] text-white border-[#512D6D] shadow-2xs font-semibold'
                                    : 'bg-white text-[#5D4037] border-[#D1C4E9] hover:border-[#512D6D]/50'
                                }`}
                              >
                                <span className="leading-snug">{item.label}</span>
                                <span
                                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                                    isSelected
                                      ? 'bg-white text-[#512D6D] border-white'
                                      : 'border-[#D1C4E9] bg-[#F9F6F0]'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="sheet-skin-zones"
                          className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                        >
                          {cs.skinZonesLabel}
                        </label>
                        <input
                          id="sheet-skin-zones"
                          type="text"
                          name="skinZones"
                          placeholder={cs.skinZonesPlaceholder}
                          value={formData.skinZones}
                          onChange={handleInputChange}
                          className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: BLOCK 3 (SANTÉ & CONTRE-INDICATIONS) & BLOCK 4 (ROUTINE & OBJECTIFS) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* BLOCK 3: SANTÉ, ALLERGIES & CONTRE-INDICATIONS */}
                <div className="bg-[#F9F6F0]/60 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9]/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#D1C4E9]/60">
                      <div className="w-8 h-8 rounded-xl bg-[#8B2651] text-white flex items-center justify-center shrink-0">
                        <HeartPulse className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] leading-tight">
                          {cs.step3Title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#5D4037]/75">{cs.step3Sub}</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <span className="block text-xs sm:text-[13px] font-semibold text-[#5D4037]">
                          {cs.contraindicationsLabel}
                        </span>
                        <span className="block text-[11px] text-[#5D4037]/70 mb-2">
                          {cs.contraindicationsHint}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {contraindicationsList.map((item) => {
                            const isSelected = selectedContraindications.includes(item.key);
                            return (
                              <button
                                key={item.key}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleContraindication(item.key)}
                                className={`min-h-[48px] px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                                  isSelected
                                    ? 'bg-[#512D6D] text-white border-[#512D6D] shadow-2xs font-semibold'
                                    : 'bg-white text-[#5D4037] border-[#D1C4E9] hover:border-[#512D6D]/50'
                                }`}
                              >
                                <span className="leading-snug">{item.label}</span>
                                <span
                                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                                    isSelected
                                      ? 'bg-white text-[#512D6D] border-white'
                                      : 'border-[#D1C4E9] bg-[#F9F6F0]'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="sheet-health-notes"
                          className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                        >
                          {cs.healthNotesLabel}
                        </label>
                        <input
                          id="sheet-health-notes"
                          type="text"
                          name="healthNotes"
                          placeholder={cs.healthNotesPlaceholder}
                          value={formData.healthNotes}
                          onChange={handleInputChange}
                          className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BLOCK 4: ROUTINE ACTUELLE & OBJECTIFS BEAUTÉ */}
                <div className="bg-[#F9F6F0]/60 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9]/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#D1C4E9]/60">
                      <div className="w-8 h-8 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] leading-tight">
                          {cs.step4Title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#5D4037]/75">{cs.step4Sub}</p>
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <span className="block text-xs sm:text-[13px] font-semibold text-[#5D4037]">
                          {cs.goalsLabel}
                        </span>
                        <span className="block text-[11px] text-[#5D4037]/70 mb-2">
                          {cs.goalsHint}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {goalsList.map((item) => {
                            const isSelected = selectedGoals.includes(item.key);
                            return (
                              <button
                                key={item.key}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleGoal(item.key)}
                                className={`min-h-[48px] px-3 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                                  isSelected
                                    ? 'bg-[#512D6D] text-white border-[#512D6D] shadow-2xs font-semibold'
                                    : 'bg-white text-[#5D4037] border-[#D1C4E9] hover:border-[#512D6D]/50'
                                }`}
                              >
                                <span className="leading-snug">{item.label}</span>
                                <span
                                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border ${
                                    isSelected
                                      ? 'bg-white text-[#512D6D] border-white'
                                      : 'border-[#D1C4E9] bg-[#F9F6F0]'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="sheet-routine"
                          className="block text-xs sm:text-[13px] font-semibold text-[#5D4037] mb-1"
                        >
                          {cs.routineLabel}
                        </label>
                        <input
                          id="sheet-routine"
                          type="text"
                          name="routine"
                          placeholder={cs.routinePlaceholder}
                          value={formData.routine}
                          onChange={handleInputChange}
                          className="min-h-[44px] w-full px-3 py-2 bg-white border border-[#D1C4E9] rounded-xl text-sm text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Honeypot anti-spam */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* RGPD Confidentiality Consent & Submit Footer */}
              <div className="pt-4 border-t border-[#D1C4E9]/70 space-y-4">
                <label
                  htmlFor="sheet-consent"
                  className="flex items-start gap-3 text-xs sm:text-sm text-[#5D4037] cursor-pointer select-none max-w-3xl"
                >
                  <input
                    id="sheet-consent"
                    type="checkbox"
                    required
                    checked={consentAccepted}
                    onChange={(e) => {
                      setConsentAccepted(e.target.checked);
                      if (e.target.checked && submitError) setSubmitError(null);
                    }}
                    className="w-5 h-5 rounded-md border-[#D1C4E9] text-[#512D6D] accent-[#512D6D] focus:ring-[#512D6D] shrink-0 mt-0.5 cursor-pointer"
                  />
                  <span className="leading-relaxed">{cs.consentLabel}</span>
                </label>

                {submitError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-start gap-2.5 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <div className="flex-1">
                      <p className="font-semibold">{cs.errorTitle}</p>
                      <p className="mt-0.5">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {/* Primary Action: Send by Email via Web3Forms to karinarobart@krbeaute.com */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`min-h-[48px] flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer ${
                      isSubmitting ? 'opacity-70 cursor-wait' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{cs.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{cs.submitEmailBtn}</span>
                      </>
                    )}
                  </button>

                  {/* Secondary Action: Simultaneous WhatsApp Send */}
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#D1C4E9]/45 hover:bg-[#D1C4E9]/75 active:scale-98 text-[#512D6D] text-xs sm:text-sm font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{cs.whatsappSimultaneousBtn}</span>
                  </a>

                  {/* Fallback Direct Mailto Action */}
                  <a
                    href={generateMailtoUrl()}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#F9F6F0] hover:bg-[#D1C4E9]/30 border border-[#D1C4E9] text-[#5D4037] text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#512D6D]" />
                    <span>{cs.mailtoFallbackBtn}</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Gift, Sparkles, MessageCircle, Mail, Printer, MapPin, Clock, Check } from 'lucide-react';
import { getServices } from '../data/servicesData';
import { COMMUNES_DATA } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';

type GiftFormat = 'solo' | 'duo';

const DUO_OPTIONS = [
  {
    id: 'duo-regard-eclat',
    key: 'regardEclat' as const,
    firstId: 'rehaussement-teinte-cils',
    secondId: 'soin-visage-purete-absolue',
  },
  {
    id: 'duo-cocon-visage-dos',
    key: 'coconVisageDos' as const,
    firstId: 'soin-visage-douceur-gelee',
    secondId: 'modelage-en-chaise',
  },
  {
    id: 'duo-nuage-legerete',
    key: 'nuageLegerete' as const,
    firstId: 'soin-des-pieds',
    secondId: 'modelage-en-chaise',
  },
];

const formatDurationMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} h ${m} min`;
  if (h > 0) return `${h} h`;
  return `${m} min`;
};

const MAX_NAME_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 160;

export const GiftCardSection: React.FC = () => {
  const { t, language } = useLanguage();
  const services = getServices(language);
  const g = t.giftCard;

  const [giftFormat, setGiftFormat] = useState<GiftFormat>('duo');
  const [selectedSoloId, setSelectedSoloId] = useState<string>('soin-visage-douceur-gelee');
  const [selectedDuoKey, setSelectedDuoKey] = useState<'regardEclat' | 'coconVisageDos' | 'nuageLegerete'>('coconVisageDos');
  const [recipientName, setRecipientName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('Rennes (Tous quartiers)');
  const [personalMessage, setPersonalMessage] = useState<string>('');

  // Compute current ritual details
  const currentSolo = services.find(s => s.id === selectedSoloId) || services[0];
  const currentDuoConfig = DUO_OPTIONS.find(d => d.key === selectedDuoKey) || DUO_OPTIONS[1];
  const duoFirst = services.find(s => s.id === currentDuoConfig.firstId) || services[0];
  const duoSecond = services.find(s => s.id === currentDuoConfig.secondId) || services[2];

  const ritualTitle =
    giftFormat === 'duo'
      ? `${t.services.signatureDuos.items[currentDuoConfig.key].title} (${duoFirst.title} + ${duoSecond.title})`
      : currentSolo.title;

  const ritualDuration =
    giftFormat === 'duo'
      ? formatDurationMinutes(duoFirst.durationMinutes + duoSecond.durationMinutes)
      : currentSolo.duration;

  const ritualBasePrice =
    giftFormat === 'duo' ? duoFirst.price + duoSecond.price : currentSolo.price;

  const communeObj = COMMUNES_DATA.find(c => c.name === selectedCommune) || COMMUNES_DATA[0];
  const travelFee = giftFormat === 'duo' || communeObj.isOffered ? 0 : communeObj.feeEuro;
  const totalPrice = ritualBasePrice + travelFee;

  const displayRecipient = recipientName.trim() || g.voucher.defaultRecipient;
  const displaySender = senderName.trim() || g.voucher.defaultSender;
  const displayMessage = personalMessage.trim()
    ? `« ${personalMessage.trim()} »`
    : g.voucher.defaultMessage;

  const buildWhatsAppUrl = (): string => {
    const lines = [
      g.whatsappTemplate.header,
      '',
      `${g.whatsappTemplate.ritual} ${ritualTitle} (${ritualDuration})`,
      `${g.whatsappTemplate.forRecipient} ${displayRecipient}`,
      `${g.whatsappTemplate.fromSender} ${displaySender}`,
      `${g.whatsappTemplate.commune} ${selectedCommune}`,
      `${g.whatsappTemplate.total} ${totalPrice} €`,
      personalMessage.trim() ? `${g.whatsappTemplate.message} "${personalMessage.trim()}"` : '',
      '',
      g.whatsappTemplate.closing,
    ].filter(Boolean);

    return `https://wa.me/33665566702?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildMailtoUrl = (): string => {
    const subject = `${g.voucher.voucherTitle} KRbeauté — ${displayRecipient}`;
    const lines = [
      g.whatsappTemplate.header.replace(/\*/g, ''),
      '',
      `${g.whatsappTemplate.ritual.replace(/\*/g, '')} ${ritualTitle} (${ritualDuration})`,
      `${g.whatsappTemplate.forRecipient.replace(/\*/g, '')} ${displayRecipient}`,
      `${g.whatsappTemplate.fromSender.replace(/\*/g, '')} ${displaySender}`,
      `${g.whatsappTemplate.commune.replace(/\*/g, '')} ${selectedCommune}`,
      `${g.whatsappTemplate.total.replace(/\*/g, '')} ${totalPrice} €`,
      personalMessage.trim() ? `${g.whatsappTemplate.message.replace(/\*/g, '')} "${personalMessage.trim()}"` : '',
      '',
      g.whatsappTemplate.closing,
    ].filter(Boolean);

    return `mailto:karinarobart@krbeaute.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handlePrintVoucher = () => {
    const source = document.getElementById('giftcard-summary-ticket');
    const printRoot = document.getElementById('print-root');
    if (source && printRoot) {
      printRoot.textContent = '';
      printRoot.appendChild(source.cloneNode(true));
    }
    window.print();
  };

  return (
    <section id="carte-cadeau" className="py-4 sm:py-8 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="kr-reveal text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#512D6D]/10 text-[#512D6D] text-xs font-bold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5 text-[#7A2048]" />
            <span>{g.kicker}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#5D4037] tracking-tight">
            {g.title}
          </h2>
          <p className="mt-2 text-xs sm:text-base text-[#5D4037]/80 leading-relaxed">
            {g.subtitle}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#D1C4E9] text-xs font-semibold text-[#7A2048] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#7A2048]" />
            <span>{g.validityBadge}</span>
          </div>
        </div>

        {/* Main 2-Column Symmetrical Studio: Left = Configuration & Steps, Right = Live Voucher Preview & Order CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* LEFT CARD (6 cols): CUSTOMIZATION FORM + 3-STEP GUIDE */}
          <div className="lg:col-span-6 kr-card-nacre bg-white rounded-3xl border border-[#D1C4E9] p-5 sm:p-7 shadow-xs flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {/* Step 1: Ritual Choice */}
              <div className="space-y-3.5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">
                  {g.step1Title}
                </h3>

                {/* Format Switcher: Duo Signature vs Solo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGiftFormat('duo')}
                    className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                      giftFormat === 'duo'
                        ? 'bg-[#7A2048] text-white border-[#7A2048] shadow-xs'
                        : 'bg-[#F9F6F0] text-[#5D4037] border-[#D1C4E9] hover:border-[#7A2048]'
                    }`}
                  >
                    {giftFormat === 'duo' && <Check className="w-4 h-4 text-emerald-300 shrink-0" />}
                    <span>{g.formatDuoBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGiftFormat('solo')}
                    className={`min-h-[48px] px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                      giftFormat === 'solo'
                        ? 'bg-[#512D6D] text-white border-[#512D6D] shadow-xs'
                        : 'bg-[#F9F6F0] text-[#5D4037] border-[#D1C4E9] hover:border-[#512D6D]'
                    }`}
                  >
                    {giftFormat === 'solo' && <Check className="w-4 h-4 text-emerald-300 shrink-0" />}
                    <span>{g.formatSoloBtn}</span>
                  </button>
                </div>

                {/* Select Dropdown */}
                <div>
                  <label
                    htmlFor="gift-ritual-select"
                    className="block text-xs font-bold text-[#5D4037] mb-1.5"
                  >
                    {g.selectRitualLabel}
                  </label>
                  {giftFormat === 'duo' ? (
                    <select
                      id="gift-ritual-select"
                      value={selectedDuoKey}
                      onChange={(e) =>
                        setSelectedDuoKey(
                          e.target.value as 'regardEclat' | 'coconVisageDos' | 'nuageLegerete'
                        )
                      }
                      className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm font-semibold text-[#512D6D] focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                    >
                      {DUO_OPTIONS.map((duo) => {
                        const s1 = services.find((s) => s.id === duo.firstId);
                        const s2 = services.find((s) => s.id === duo.secondId);
                        const price = (s1?.price || 45) + (s2?.price || 45);
                        const dur = formatDurationMinutes(
                          (s1?.durationMinutes || 45) + (s2?.durationMinutes || 20)
                        );
                        return (
                          <option key={duo.id} value={duo.key}>
                            {t.services.signatureDuos.items[duo.key].title} — {dur} · {price} €
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <select
                      id="gift-ritual-select"
                      value={selectedSoloId}
                      onChange={(e) => setSelectedSoloId(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm font-semibold text-[#512D6D] focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title} — {s.duration} · {s.price} €
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Step 2: Personalize Invitation */}
              <div className="pt-4 border-t border-[#E8DFD8] space-y-3.5">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">
                  {g.step2Title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="gift-recipient-name"
                      className="block text-xs font-bold text-[#5D4037] mb-1"
                    >
                      {g.recipientLabel}
                    </label>
                    <input
                      id="gift-recipient-name"
                      type="text"
                      maxLength={MAX_NAME_LENGTH}
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                      placeholder={g.recipientPlaceholder}
                      className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm text-[#5D4037] focus:bg-white focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gift-sender-name"
                      className="block text-xs font-bold text-[#5D4037] mb-1"
                    >
                      {g.senderLabel}
                    </label>
                    <input
                      id="gift-sender-name"
                      type="text"
                      maxLength={MAX_NAME_LENGTH}
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                      placeholder={g.senderPlaceholder}
                      className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm text-[#5D4037] focus:bg-white focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                    />
                  </div>
                </div>

                {/* Commune Selector */}
                <div>
                  <label
                    htmlFor="gift-commune-select"
                    className="block text-xs font-bold text-[#5D4037] mb-1"
                  >
                    {g.communeLabel}
                  </label>
                  <select
                    id="gift-commune-select"
                    value={selectedCommune}
                    onChange={(e) => setSelectedCommune(e.target.value)}
                    className="w-full min-h-[46px] px-3.5 py-2 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm text-[#5D4037] focus:bg-white focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                  >
                    {COMMUNES_DATA.map((c) => (
                      <option key={`${c.postalCode}-${c.name}`} value={c.name}>
                        {c.name} ({c.postalCode})
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] font-semibold text-emerald-800">
                    {travelFee === 0
                      ? g.freeTravelNote
                      : g.paidTravelNote.replace(
                          '{fee}',
                          travelFee.toFixed(2).replace('.', ',')
                        )}
                  </p>
                </div>

                {/* Personal Message + 1-Click Suggestions */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <label
                      htmlFor="gift-personal-message"
                      className="block text-xs font-bold text-[#5D4037]"
                    >
                      {g.messageLabel}
                    </label>
                    <span
                      className={`text-[11px] font-semibold ${
                        personalMessage.length >= MAX_MESSAGE_LENGTH
                          ? 'text-[#7A2048]'
                          : 'text-[#5D4037]/65'
                      }`}
                    >
                      {personalMessage.length} / {MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                  <textarea
                    id="gift-personal-message"
                    rows={2}
                    maxLength={MAX_MESSAGE_LENGTH}
                    value={personalMessage}
                    onChange={(e) =>
                      setPersonalMessage(
                        e.target.value.replace(/[\r\n]+/g, ' ').slice(0, MAX_MESSAGE_LENGTH)
                      )
                    }
                    placeholder={g.messagePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F9F6F0] border border-[#D1C4E9] text-xs sm:text-sm text-[#5D4037] focus:bg-white focus:border-[#512D6D] focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none resize-none"
                  />

                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-medium text-[#5D4037]/75 mr-1">
                      {g.suggestionsLabel}
                    </span>
                    {(
                      [
                        g.suggestions.birthday,
                        g.suggestions.cocooning,
                        g.suggestions.pleasure,
                      ] as const
                    ).map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPersonalMessage(sug.text)}
                        className="min-h-[34px] px-3 py-1 rounded-full bg-[#F9F6F0] hover:bg-[#F5EBF7] border border-[#D1C4E9] text-[11px] font-semibold text-[#512D6D] transition-colors cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated 3-Step Guide at bottom of Left Card */}
            <div className="rounded-2xl bg-[#F9F6F0] border border-[#E8DFD8] p-4 space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#512D6D]">
                {g.actions.howItWorksTitle}
              </h4>
              <ul className="space-y-1 text-xs text-[#5D4037]/85 leading-relaxed">
                <li>{g.actions.stepA}</li>
                <li>{g.actions.stepB}</li>
                <li>{g.actions.stepC}</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CARD (6 cols): UNIFIED LIVE PREVIEW + ORDER ACTIONS */}
          <div className="lg:col-span-6 kr-card-nacre bg-white rounded-3xl border border-[#D1C4E9] p-5 sm:p-7 shadow-xs flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Header aligned with Left Card's Step 1 Title */}
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A2048]">
                  <Sparkles className="w-3.5 h-3.5 text-[#7A2048] shrink-0" />
                  <span>{g.previewKicker}</span>
                </span>
              </div>

              {/* PRINTABLE LUXURY GIFT VOUCHER CARD */}
              <div
                id="giftcard-summary-ticket"
                className="printable-summary relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFFDFB] via-[#F9F6F0] to-[#F5E6EC]/80 border-2 border-[#C29D59]/50 p-4 sm:p-5 shadow-xs"
              >
                {/* Decorative inner border */}
                <div className="giftcard-print-inner border border-[#512D6D]/20 rounded-xl p-3.5 sm:p-4 bg-white/90 backdrop-blur-xs space-y-2.5">
                  {/* Brand Header */}
                  <div className="text-center border-b border-[#E8DFD8] pb-2">
                    <div className="w-8 h-8 rounded-full bg-[#512D6D] text-white font-serif text-xs font-bold flex items-center justify-center mx-auto mb-1 shadow-2xs">
                      KR
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7A2048]">
                      {g.voucher.brandHeader}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#512D6D] mt-0.5">
                      {g.voucher.voucherTitle}
                    </h3>
                    <p className="print-only-recipient-guide text-[11px] text-[#5D4037]/85 italic mt-0.5">
                      {g.voucher.voucherSubtitle}
                    </p>
                  </div>

                  {/* Recipient & Sender */}
                  <div className="bg-[#F9F6F0] p-2.5 rounded-xl border border-[#D1C4E9]/60 space-y-1.5">
                    <div className="summary-grid grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2048] block">
                          {g.voucher.forLabel}
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold text-[#5D4037] break-words block">
                          {displayRecipient}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A2048] block">
                          {g.voucher.fromLabel}
                        </span>
                        <span className="font-serif text-sm sm:text-base font-bold text-[#5D4037] break-words block">
                          {displaySender}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1 border-t border-[#E8DFD8] text-[10.5px] font-semibold text-emerald-800">
                      {g.voucher.paidInFullBadge}
                    </div>
                  </div>

                  {/* Personal Message */}
                  <div className="p-2.5 rounded-xl bg-[#FFFDFB] border border-[#E8DFD8] text-center italic font-serif text-xs sm:text-sm text-[#5D4037] leading-snug break-words">
                    {displayMessage}
                  </div>

                  {/* Ritual Offered Details + Complete Program for A4 Print */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-[#F5E6EC]/60 via-[#FFFDFB] to-[#F3E8FA]/60 border border-[#D1C4E9] space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D] block">
                        {g.voucher.ritualLabel}
                      </span>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#512D6D]">
                        {ritualTitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#5D4037]">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-[#7A2048]" />
                        <span>
                          {g.voucher.durationLabel} {ritualDuration}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#7A2048]" />
                        <span>
                          {g.voucher.locationLabel} {selectedCommune}
                        </span>
                      </span>
                    </div>

                    {/* Detailed Program of the Ritual (Displayed on the A4 PDF for the Recipient) */}
                    <div className="print-only-recipient-guide pt-2 border-t border-[#D1C4E9]/70 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A2048]">
                        {g.voucher.programIncludedTitle}
                      </p>

                      {giftFormat === 'duo' ? (
                        <div className="summary-grid grid grid-cols-2 gap-2">
                          {[duoFirst, duoSecond].map((care) => (
                            <div
                              key={care.id}
                              className="summary-card-item bg-white p-2 rounded-lg border border-[#D1C4E9]"
                            >
                              <p className="font-serif font-bold text-[11px] text-[#512D6D]">
                                {care.title} ({care.duration})
                              </p>
                              <p className="text-[10px] italic text-[#7A2048] mb-1">
                                {care.tagline}
                              </p>
                              <ul className="space-y-0.5 text-[10px] text-[#5D4037]">
                                {(care.comprend || care.benefits || []).map((item, idx) => (
                                  <li key={idx}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="summary-grid grid grid-cols-2 gap-2">
                          <div className="summary-card-item bg-white p-2 rounded-lg border border-[#D1C4E9]">
                            <p className="font-serif font-bold text-[11px] text-[#512D6D] mb-0.5">
                              {currentSolo.title} ({currentSolo.duration})
                            </p>
                            <p className="text-[10px] italic text-[#7A2048] mb-1">
                              {currentSolo.tagline}
                            </p>
                            <ul className="space-y-0.5 text-[10px] text-[#5D4037]">
                              {(currentSolo.comprend || currentSolo.benefits || []).map((item, idx) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="summary-card-item bg-white p-2 rounded-lg border border-[#D1C4E9]">
                            <p className="font-serif font-bold text-[11px] text-[#512D6D] mb-0.5">
                              {g.voucher.protocolStepsTitle}
                            </p>
                            <ul className="space-y-0.5 text-[10px] text-[#5D4037]">
                              {(currentSolo.protocolSteps || [currentSolo.description, currentSolo.idealFor]).map((step, idx) => (
                                <li key={idx}>• {step}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Practical Recipient Guide (Displayed on the A4 PDF to fill the page harmoniously) */}
                  <div className="print-only-recipient-guide space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D] text-center">
                      {g.voucher.recipientGuideHeader}
                    </p>
                    <div className="summary-grid grid grid-cols-2 gap-2">
                      <div className="summary-card-item bg-[#F9F6F0] p-2.5 rounded-lg border border-[#D1C4E9]">
                        <p className="font-serif font-bold text-[11px] text-[#512D6D] mb-1">
                          {g.voucher.recipientBookingTitle}
                        </p>
                        <ul className="space-y-0.5 text-[10px] text-[#5D4037]">
                          {g.voucher.recipientBookingSteps.map((step, idx) => (
                            <li key={idx}>• {step}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="summary-card-item bg-[#F9F6F0] p-2.5 rounded-lg border border-[#D1C4E9]">
                        <p className="font-serif font-bold text-[11px] text-[#512D6D] mb-1">
                          {g.voucher.recipientPrepTitle}
                        </p>
                        <ul className="space-y-0.5 text-[10px] text-[#5D4037]">
                          {g.voucher.recipientPrepSteps.map((step, idx) => (
                            <li key={idx}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer Validity, Signature & Contact */}
                  <div className="pt-1.5 border-t border-[#E8DFD8] text-center space-y-0.5">
                    <p className="text-[10.5px] font-semibold text-[#7A2048]">
                      {g.voucher.validityNote}
                    </p>
                    <p className="text-[10px] text-[#5D4037]/85 font-medium">
                      {g.voucher.bookingNote}
                    </p>
                    <p className="print-only-recipient-guide font-serif italic text-[11px] font-semibold text-[#512D6D] pt-0.5">
                      {g.voucher.signatureLine}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Action Buttons at bottom of Right Card */}
            <div className="pt-3 border-t border-[#E8DFD8] space-y-2.5">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="kr-btn-silk min-h-[50px] w-full px-6 py-3 rounded-full bg-[#7A2048] hover:bg-[#631839] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  {g.actions.orderWhatsAppBtn.replace('{total}', String(totalPrice))}
                </span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintVoucher}
                  className="min-h-[46px] px-4 py-2.5 rounded-full bg-[#F9F6F0] hover:bg-[#F5EBF7] border border-[#D1C4E9] text-[#512D6D] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                >
                  <Printer className="w-4 h-4 text-[#512D6D] shrink-0" />
                  <span>{g.actions.printVoucherBtn}</span>
                </button>

                <a
                  href={buildMailtoUrl()}
                  className="min-h-[46px] px-4 py-2.5 rounded-full bg-[#F9F6F0] hover:bg-[#F5EBF7] border border-[#D1C4E9] text-[#512D6D] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                >
                  <Mail className="w-4 h-4 text-[#512D6D] shrink-0" />
                  <span>{g.actions.orderEmailBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  Compass, 
  Check, 
  Car, 
  Info,
  Users,
  X,
  Sparkles,
  Home,
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';
import { COMMUNES_DATA, CommuneItem } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';
import { filterCommunes } from '../utils/logisticsUtils';

interface LogisticsCalculatorProps {
  onSelectCommuneForBooking?: (communeName: string) => void;
}

export const LogisticsCalculator: React.FC<LogisticsCalculatorProps> = ({ onSelectCommuneForBooking }) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommune, setSelectedCommune] = useState<CommuneItem | null>(null);
  const [activeChecklistIndex, setActiveChecklistIndex] = useState(0);
  const checklistSliderRef = useRef<HTMLDivElement>(null);

  const handleChecklistScroll = () => {
    if (checklistSliderRef.current) {
      const scrollLeft = checklistSliderRef.current.scrollLeft;
      const cardWidth = checklistSliderRef.current.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveChecklistIndex(Math.min(Math.max(index, 0), 3));
    }
  };

  const scrollToChecklist = (idx: number) => {
    if (checklistSliderRef.current) {
      const card = checklistSliderRef.current.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveChecklistIndex(idx);
    }
  };

  const isEs = language === 'es';

  // Communes by zone
  const zone1Communes = COMMUNES_DATA.filter(c => c.distanceKm <= 7);
  const zone2Communes = COMMUNES_DATA.filter(c => c.distanceKm > 7 && c.distanceKm <= 12);

  // Search filtered communes
  const searchResults = filterCommunes(searchQuery);

  return (
    <section id="secteur" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-white border-y border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* =========================================================================
            HEADER - Clean & Airy (Full max-w-7xl Width)
           ========================================================================= */}
        <div className="kr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D1C4E9]/50">
          <div>
            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-2">
              {t.logistics.kicker}
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.logistics.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-2xl">
              {t.logistics.subtitle}
            </p>
          </div>

          {/* Right Highlights */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-2xl border border-[#D1C4E9] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#512D6D]">{t.logistics.badge.free}</span>
              <span className="text-xs text-[#5D4037]/40">·</span>
              <span className="text-xs text-[#5D4037]/80 font-medium">{t.logistics.badge.from5}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OPTION 1: BANNIÈRE BIENVEILLANTE MISE À JOUR EN COURS
           ========================================================================= */}
        <div className="kr-reveal kr-card-nacre bg-gradient-to-r from-[#D1C4E9]/35 via-white to-[#D1C4E9]/35 p-5 sm:p-6 rounded-3xl border border-[#512D6D]/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Compass className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#512D6D]/15 text-[#512D6D] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  {t.logistics.updateNotice.badge}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">
                  {t.logistics.updateNotice.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/90 max-w-3xl leading-relaxed">
                  {t.logistics.updateNotice.message}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#D1C4E9]/60">
              <a
                href={`https://wa.me/33665566702?text=${encodeURIComponent(t.logistics.updateNotice.whatsappGreeting)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="kr-btn-silk min-h-[44px] flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white text-xs font-bold shadow-xs transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.logistics.updateNotice.whatsappBtn}</span>
              </a>
              <a
                href="tel:+33665566702"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] text-xs font-semibold shadow-2xs transition-all active:scale-98"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.logistics.updateNotice.callBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            THE 2 CLEAR COLUMNS (Zone 1, Zone 2)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          
          {/* COLUMN 1 : ZONE 1 (≤ 7 km) - DÉPLACEMENT OFFERT */}
          <div
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/30 flex flex-col"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>{t.logistics.zones.zone1Tag}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#5D4037]/60">0 - 7 km</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-1">
              {t.logistics.zones.zone1Title}
            </h3>
            <p className="text-xs text-[#5D4037]/75 mb-4">
              {t.logistics.zones.zone1Sub}
            </p>

            {/* Commune Pills */}
            <div className="flex flex-wrap gap-1.5">
              {zone1Communes.map((commune) => (
                <button
                  key={commune.name}
                  type="button"
                  onClick={() => setSelectedCommune(commune)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all duration-200 cursor-pointer text-left ${
                    selectedCommune?.name === commune.name
                      ? 'bg-[#512D6D] text-white font-bold shadow-2xs scale-[1.02]'
                      : 'bg-[#F9F6F0] text-[#5D4037] hover:bg-[#D1C4E9]/40 border border-[#D1C4E9]/50'
                  }`}
                >
                  {commune.name}
                </button>
              ))}
            </div>
          </div>

          {/* COLUMN 2 : ZONE 2 (7 à 12 km) - +8,50 € */}
          <div
            style={{ '--reveal-delay': '90ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre bg-white rounded-3xl p-5 sm:p-6 border border-[#D1C4E9] flex flex-col"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D1C4E9]/40 border border-[#D1C4E9] text-[#512D6D] text-xs font-bold">
                <Car className="w-3.5 h-3.5 text-[#512D6D]" />
                <span>{t.logistics.zones.zone2Tag}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#5D4037]/60">7 - 12 km</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-1">
              {t.logistics.zones.zone2Title}
            </h3>
            <p className="text-xs text-[#5D4037]/75 mb-4">
              {t.logistics.zones.zone2Sub}
            </p>

            {/* Commune Pills */}
            <div className="flex flex-wrap gap-1.5">
              {zone2Communes.map((commune) => (
                <button
                  key={commune.name}
                  type="button"
                  onClick={() => setSelectedCommune(commune)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all duration-200 cursor-pointer text-left ${
                    selectedCommune?.name === commune.name
                      ? 'bg-[#512D6D] text-white font-bold shadow-2xs scale-[1.02]'
                      : 'bg-[#F9F6F0] text-[#5D4037] hover:bg-[#D1C4E9]/40 border border-[#D1C4E9]/50'
                  }`}
                >
                  {commune.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================================
            SEARCH TOOL & INSTANT COMMUNE CHECKER (Full max-w-7xl Width)
           ========================================================================= */}
        <div className="kr-reveal kr-card-nacre bg-white rounded-3xl p-5 sm:p-7 border border-[#D1C4E9]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                {t.logistics.searchPrompt}
              </h3>
              <p className="text-xs text-[#5D4037]/70">
                {isEs 
                  ? 'Escribe las primeras letras de tu municipio o código postal para consultar la tarifa' 
                  : 'Tapez les premières lettres de votre ville pour afficher son tarif précis'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-[#5D4037]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.logistics.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCommune(null);
                }}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCommune(null);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5D4037]/50 hover:text-[#512D6D]"
                  title="Effacer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Dropdown / Live Results List */}
          {searchResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4 p-3 bg-[#F9F6F0] rounded-2xl border border-[#D1C4E9]/60">
              {searchResults.slice(0, 8).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedCommune(c);
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#D1C4E9]/60 hover:border-[#512D6D] text-left text-xs text-[#5D4037] cursor-pointer"
                >
                  <span className="font-semibold truncate">{c.name}</span>
                  <span className="text-[11px] font-bold text-[#512D6D] shrink-0 ml-1">
                    {c.feeEuro === 0 ? (isEs ? 'Sin costo' : 'Offert') : `+${c.feeEuro.toString().replace('.', ',')} €`}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Selected Commune Detail Bar */}
          {selectedCommune && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D1C4E9]/30 via-[#F9F6F0] to-[#D1C4E9]/30 border border-[#D1C4E9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                      {selectedCommune.name}
                    </span>
                    <span className="text-xs text-[#5D4037]/80 bg-white px-2 py-0.5 rounded border border-[#D1C4E9]">
                      {selectedCommune.postalCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5D4037]/75 mt-0.5">
                    {t.logistics.distanceLabel} <strong>{selectedCommune.distanceKm} km</strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1C4E9]/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5D4037]/80 font-medium">{t.logistics.feeLabel}</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#512D6D]">
                    {selectedCommune.feeEuro === 0 ? t.logistics.feeFree : `+${selectedCommune.feeEuro.toString().replace('.', ',')} €`}
                  </span>
                </div>
                {onSelectCommuneForBooking && (
                  <button
                    type="button"
                    onClick={() => onSelectCommuneForBooking(selectedCommune.name)}
                    className="kr-btn-silk min-h-[40px] px-4 py-2 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <span>{t.logistics.bookInCommuneBtn.replace('{commune}', selectedCommune.name)}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mutualization / Duo Footnote */}
          <div className="mt-4 pt-3 border-t border-[#D1C4E9]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5D4037]/80">
            <div className="flex items-center gap-1.5 font-medium text-[#512D6D]">
              <Users className="w-3.5 h-3.5 text-[#512D6D]" />
              <span>{t.logistics.perTripNote}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#5D4037]/70">
              <Info className="w-3 h-3 text-[#512D6D]" />
              <span>{t.logistics.infoHours}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CHECK-LIST SÉRÉNITÉ POUR M'ACCUEILLIR (Bienveillant & Rassurant)
           ========================================================================= */}
        <div className="kr-reveal bg-[#F9F6F0] rounded-3xl p-5 sm:p-8 border border-[#D1C4E9]/80 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#5D4037]">
              {t.logistics.checklist.title}
            </h3>
          </div>

          {/* Horizontal Snap Slider on Mobile (< sm), Grid on Tablet & Desktop (sm+) */}
          <div 
            ref={checklistSliderRef}
            onScroll={handleChecklistScroll}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0"
          >
            <div className="kr-card-nacre w-[80vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white p-4 sm:p-5 rounded-2xl border border-[#D1C4E9]/60 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mb-2.5">
                  <Home className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#5D4037] mb-1">
                  {t.logistics.checklist.item1Title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#5D4037]/75 leading-relaxed">
                  {t.logistics.checklist.item1Desc}
                </p>
              </div>
            </div>

            <div className="kr-card-nacre w-[80vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white p-4 sm:p-5 rounded-2xl border border-[#D1C4E9]/60 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mb-2.5">
                  <Car className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#5D4037] mb-1">
                  {t.logistics.checklist.item2Title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#5D4037]/75 leading-relaxed">
                  {t.logistics.checklist.item2Desc}
                </p>
              </div>
            </div>

            <div className="kr-card-nacre w-[80vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white p-4 sm:p-5 rounded-2xl border border-[#D1C4E9]/60 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#5D4037] mb-1">
                  {t.logistics.checklist.item3Title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#5D4037]/75 leading-relaxed">
                  {t.logistics.checklist.item3Desc}
                </p>
              </div>
            </div>

            <div className="kr-card-nacre w-[80vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white p-4 sm:p-5 rounded-2xl border border-[#D1C4E9]/60 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4 text-rose-600" />
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-bold text-[#5D4037] mb-1">
                  {t.logistics.checklist.item4Title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#5D4037]/75 leading-relaxed">
                  {t.logistics.checklist.item4Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Swipe Pagination Dots (< sm) */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToChecklist(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeChecklistIndex === idx
                    ? 'w-6 bg-[#512D6D]'
                    : 'w-2 bg-[#D1C4E9] hover:bg-[#512D6D]/40'
                }`}
                aria-label={`Conseil ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

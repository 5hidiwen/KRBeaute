import React, { useState } from 'react';
import { Clock, MessageCircle, Sparkles, Eye, Footprints, ChevronDown, Plus, Check, X, RotateCcw, ArrowRight } from 'lucide-react';
import { getServices, ServiceItem } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';

type QuizZoneKey = 'visage' | 'regard' | 'piedsCorps';
type QuizNeedKey =
  | 'visageDouceur'
  | 'visagePurete'
  | 'visageDetox'
  | 'regardCils'
  | 'piedsExpress'
  | 'piedsComplet'
  | 'corpsChaise';
type QuizFormatKey = 'solo' | 'duo';

const NEED_TO_SERVICES_MAP: Record<QuizNeedKey, { primaryId: string; companionId: string }> = {
  visageDouceur: { primaryId: 'soin-visage-douceur-gelee', companionId: 'modelage-en-chaise' },
  visagePurete: { primaryId: 'soin-visage-purete-absolue', companionId: 'modelage-en-chaise' },
  visageDetox: { primaryId: 'soin-visage-detox', companionId: 'modelage-en-chaise' },
  regardCils: { primaryId: 'rehaussement-teinte-cils', companionId: 'soin-visage-purete-absolue' },
  piedsExpress: { primaryId: 'beaute-des-pieds', companionId: 'modelage-en-chaise' },
  piedsComplet: { primaryId: 'soin-des-pieds', companionId: 'modelage-en-chaise' },
  corpsChaise: { primaryId: 'modelage-en-chaise', companionId: 'soin-visage-douceur-gelee' },
};

const SIGNATURE_DUOS_CONFIG = [
  {
    key: 'regardEclat' as const,
    firstId: 'rehaussement-teinte-cils',
    secondId: 'soin-visage-purete-absolue',
  },
  {
    key: 'coconVisageDos' as const,
    firstId: 'soin-visage-douceur-gelee',
    secondId: 'modelage-en-chaise',
  },
  {
    key: 'nuageLegerete' as const,
    firstId: 'soin-des-pieds',
    secondId: 'modelage-en-chaise',
  },
];

interface ServicesMenuProps {
  onSelectService: (service: ServiceItem) => void;
  onSelectRecommendedServices?: (services: ServiceItem[]) => void;
  selectedServices?: ServiceItem[];
  onToggleComboService?: (service: ServiceItem) => void;
  onBookCombo?: () => void;
  onOpenGiftCard?: () => void;
}

const formatDurationMinutes = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h} h ${m} min`;
  if (h > 0) return `${h} h`;
  return `${m} min`;
};

export const ServicesMenu: React.FC<ServicesMenuProps> = ({
  onSelectService,
  onSelectRecommendedServices,
  selectedServices = [],
  onToggleComboService,
  onBookCombo,
  onOpenGiftCard,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'visage-regard' | 'pieds-corps' | 'duos'>('all');
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  // Express 3-Click Diagnostic Quiz State
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedZone, setSelectedZone] = useState<QuizZoneKey | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<QuizNeedKey | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<QuizFormatKey>('solo');

  const services = getServices(language);

  const handleRestartQuiz = () => {
    setQuizStep(1);
    setSelectedZone(null);
    setSelectedNeed(null);
    setSelectedFormat('solo');
  };

  const handleSelectZone = (zone: QuizZoneKey) => {
    setSelectedZone(zone);
    setSelectedNeed(null);
    setQuizStep(2);
  };

  const handleSelectNeed = (need: QuizNeedKey) => {
    setSelectedNeed(need);
    setQuizStep(3);
  };

  const handleSelectFormat = (format: QuizFormatKey) => {
    setSelectedFormat(format);
    setQuizStep(4);
  };

  const getRecommendedPair = (): { primary: ServiceItem; companion: ServiceItem } => {
    const mapping = selectedNeed
      ? NEED_TO_SERVICES_MAP[selectedNeed]
      : NEED_TO_SERVICES_MAP.visageDouceur;
    const primary = services.find(s => s.id === mapping.primaryId) || services[0];
    const companion = services.find(s => s.id === mapping.companionId) || services[2];
    return { primary, companion };
  };

  const handleViewRecommendedOnMenu = (primary: ServiceItem, companion?: ServiceItem) => {
    setActiveTab('all');
    setExpandedServices(prev => ({
      ...prev,
      [primary.id]: true,
      ...(companion ? { [companion.id]: true } : {}),
    }));
    setTimeout(() => {
      const cardEl = document.getElementById(`service-card-${primary.id}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const toggleService = (id: string) => {
    setExpandedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const visageRegardCount = services.filter(s => s.group === 'visage-regard').length;
  const piedsCorpsCount = services.filter(s => s.group === 'pieds-corps').length;

  const renderServiceRow = (service: ServiceItem) => {
    const isExpanded = !!expandedServices[service.id];
    const isInCombo = selectedServices.some(s => s.id === service.id);
    const details = service.protocolSteps || service.comprend || [];
    const isProtocol = !!service.protocolSteps;
    const categoryLabel = t.services.categories[service.category] || service.category;

    return (
      <article
        key={service.id}
        id={`service-card-${service.id}`}
        className={`kr-card-nacre animate-fadeIn bg-white rounded-2xl border overflow-hidden ${
          isInCombo
            ? 'border-[#512D6D] ring-1 ring-[#512D6D]/25 bg-[#FFFDFB]'
            : isExpanded
            ? 'border-[#8B2651]/55 ring-1 ring-[#8B2651]/20 bg-[#FFFDFB]'
            : 'border-[#E8DFD8] hover:border-[#8B2651]/35'
        }`}
      >
        {/* COMPACT MASTER HEADER ROW (Interactive Accordion Trigger) */}
        <button
          type="button"
          onClick={() => toggleService(service.id)}
          aria-expanded={isExpanded}
          aria-controls={`service-panel-${service.id}`}
          className="w-full text-left p-3.5 sm:p-4.5 flex items-center justify-between gap-3 sm:gap-4 transition-colors cursor-pointer select-none group"
        >
          {/* Left Col: Badges + Title + Duration/Tagline */}
          <div className="flex-1 min-w-0 pr-2">
            {/* Top meta: Category pill + optional highlight badge */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  service.colorTheme === 'pink'
                    ? 'bg-[#F472B6]/15 text-[#BE185D]'
                    : service.colorTheme === 'cyan'
                    ? 'bg-[#38BDF8]/15 text-[#0369A1]'
                    : 'bg-[#8B2651]/15 text-[#7A2048]'
                }`}
              >
                {categoryLabel}
              </span>

              {service.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F5EBE1] text-[#7A2048] border border-[#C29D59]/30">
                  ★ {service.badge}
                </span>
              )}

              {isInCombo && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#512D6D] text-white shadow-2xs">
                  {t.services.inComboBtn}
                </span>
              )}

              {service.benefits.map((benefit, bIdx) => (
                <span
                  key={bIdx}
                  className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F9F6F0] text-[#5D4037]/85 border border-[#D1C4E9]/60"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Title + Tagline */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] group-hover:text-[#7A2048] transition-colors leading-snug">
                {service.title}
              </h4>
              <span className="hidden sm:inline text-xs text-[#5D4037]/70 font-normal">
                — {service.tagline}
              </span>
            </div>

            {/* Collapsed duration pill on mobile / compact info */}
            <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#5D4037]/80 font-medium">
                <Clock className="w-3 h-3 text-[#8B2651]" />
                <span>{service.duration}</span>
              </span>
              <span className="text-[#5D4037]/30 text-xs">·</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#8B2651] group-hover:underline">
                {isExpanded ? t.services.hideDetails : t.services.viewDetails}
              </span>
            </div>
          </div>

          {/* Right Col: Price + Chevron */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <div className="text-right">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#7A2048] block leading-none">
                {service.price}€
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#5D4037]/60 font-medium">
                {t.services.atHome}
              </span>
            </div>

            {/* Smooth Rotating Chevron Indicator */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isExpanded
                  ? 'bg-[#7A2048] text-white border-[#7A2048] shadow-2xs'
                  : 'bg-[#F9F6F0] text-[#7A2048] border-[#E8DFD8] group-hover:bg-[#8B2651]/10 group-hover:border-[#8B2651]/30'
              }`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
        </button>

        {/* EXPANDED CONTENT DRAWER (Silky CSS Grid Height Interpolation + Stagger) */}
        <div
          id={`service-panel-${service.id}`}
          aria-hidden={!isExpanded}
          inert={!isExpanded ? true : undefined}
          className={`kr-accordion-grid ${isExpanded ? 'is-open' : ''}`}
        >
          <div className="kr-accordion-inner">
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 border-t border-[#E8DFD8]/70 bg-[#FCFAF8]">
              {/* Tagline on mobile (since it was hidden in collapsed state) */}
              <p className="sm:hidden text-xs font-medium text-[#7A2048] mt-2 mb-1.5">
                {service.tagline}
              </p>

              {/* Mobile Benefit Pills */}
              <div className="flex md:hidden flex-wrap gap-1.5 mt-2 mb-2">
                {service.benefits.map((benefit, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white text-[#5D4037]/90 border border-[#D1C4E9]/70"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              {/* Sensory "Idéal si" Guidance Box */}
              <div className="mt-2.5 mb-3 px-3.5 py-2.5 rounded-xl bg-[#F5E6EC]/45 border border-[#8B2651]/20 text-xs sm:text-[13px] text-[#5D4037] leading-relaxed">
                <strong className="text-[#7A2048] font-bold mr-1.5">
                  {t.services.idealForLabel}
                </strong>
                <span>{service.idealFor}</span>
              </div>

              {/* Full Sensory Description */}
              <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed mb-3.5 max-w-3xl">
                {service.description}
              </p>

              {/* Protocol Steps / What's Included (Numbered Vertical Thread) */}
              {details.length > 0 && (
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8DFD8] mb-3.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#7A2048] uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B2651]" />
                    <span>{isProtocol ? t.services.protocolTitle : t.services.includedTitle}</span>
                  </div>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-[13px] text-[#5D4037]/90">
                    {details.map((step, idx) => (
                      <li
                        key={idx}
                        style={{ '--stagger-delay': `${60 + idx * 55}ms` } as React.CSSProperties}
                        className="kr-stagger-item flex items-start gap-2.5 bg-[#F9F6F0]/65 p-2.5 rounded-lg border border-[#E8DFD8]/60 border-l-2 border-l-[#8B2651]/60"
                      >
                        <span className="font-serif text-[#8B2651] font-bold text-xs shrink-0 mt-0.5">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="leading-snug">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* 3-Step Reassuring Session Timeline */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#E8DFD8] text-center">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">
                    {t.services.timelineStep1Title}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-[#5D4037]/75 mt-0.5">
                    {t.services.timelineStep1Sub}
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#7A2048]/8 border border-[#7A2048]/30 text-center">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7A2048]">
                    {t.services.timelineStep2Title}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-semibold text-[#7A2048] mt-0.5">
                    {t.services.timelineStep2Sub.replace('{duration}', service.duration)}
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#E8DFD8] text-center">
                  <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">
                    {t.services.timelineStep3Title}
                  </span>
                  <span className="block text-[10px] sm:text-xs text-[#5D4037]/75 mt-0.5">
                    {t.services.timelineStep3Sub}
                  </span>
                </div>
              </div>

              {/* Action Row: Reassurance pill + Combo Toggle + Big CTA Reserve Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5 border-t border-[#E8DFD8]/60">
                <div className="flex items-center gap-2 text-xs text-[#5D4037]/80">
                  <Clock className="w-3.5 h-3.5 text-[#8B2651] shrink-0" />
                  <span>
                    {t.services.sessionIncludes.replace('{duration}', service.duration)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {onToggleComboService && (
                    <button
                      type="button"
                      onClick={() => onToggleComboService(service)}
                      className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                        isInCombo
                          ? 'bg-[#512D6D] text-white border-[#512D6D] shadow-2xs'
                          : 'bg-white hover:bg-[#F9F6F0] text-[#512D6D] border-[#D1C4E9]'
                      }`}
                    >
                      {isInCombo ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#512D6D]" />
                      )}
                      <span>{isInCombo ? t.services.inComboBtn : t.services.addToComboBtn}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="kr-btn-silk min-h-[42px] px-5 sm:px-6 py-2.5 rounded-full bg-[#7A2048] hover:bg-[#631839] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-300" />
                    <span>{t.services.reserveBtn} — {service.price}€</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section id="soins" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-[#F9F6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="kr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-1.5">
              {t.services.kicker}
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-xl">
              {t.services.subtitle}
            </p>
          </div>

          {/* Interactive Category Filter Tabs (4 tabs including Duos Signature) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1 p-1 bg-white/90 backdrop-blur-xs rounded-2xl border border-[#D1C4E9]/80 shadow-2xs w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                activeTab === 'all'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D] hover:bg-[#F9F6F0]'
              }`}
            >
              <span>{t.services.filters.all} ({services.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('visage-regard')}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                activeTab === 'visage-regard'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D] hover:bg-[#F9F6F0]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>{t.services.filters.visageRegard} ({visageRegardCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pieds-corps')}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                activeTab === 'pieds-corps'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D] hover:bg-[#F9F6F0]'
              }`}
            >
              <Footprints className="w-3.5 h-3.5 shrink-0" />
              <span>{t.services.filters.piedsCorps} ({piedsCorpsCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('duos')}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                activeTab === 'duos'
                  ? 'bg-[#7A2048] text-white font-semibold shadow-xs'
                  : 'text-[#7A2048] font-semibold hover:bg-[#F5E6EC]/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{t.services.filters.duos} ({SIGNATURE_DUOS_CONFIG.length})</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE 3-CLICK BEAUTY DIAGNOSTIC ASSISTANT (US-09) — Sleek & Compact */}
        <div className="kr-reveal mb-6 sm:mb-8">
          {!quizOpen ? (
            <div className="kr-card-nacre bg-gradient-to-r from-[#FFFDFB] via-white to-[#F6EEF4] rounded-2xl border border-[#D1C4E9] p-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#512D6D]/10 text-[#512D6D] text-[10px] font-bold uppercase tracking-wider">
                      ✦ {t.services.diagnostic.bannerBadge}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#5D4037] leading-snug">
                      {t.services.diagnostic.bannerTitle}
                    </h3>
                  </div>
                  <p className="hidden sm:block text-xs text-[#5D4037]/75 mt-0.5 leading-relaxed">
                    {t.services.diagnostic.bannerSub}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setQuizOpen(true);
                  setQuizStep(1);
                }}
                className="kr-btn-silk min-h-[44px] sm:min-h-[46px] w-full sm:w-auto px-4 sm:px-5 py-2 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                <span>{t.services.diagnostic.startBtn}</span>
              </button>
            </div>
          ) : (
            <div className="kr-card-nacre animate-fadeIn bg-white rounded-3xl border-2 border-[#512D6D]/30 p-4 sm:p-6 shadow-md">
              {/* Top Quiz Bar: Step Indicator + Progress + Close */}
              <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#E8DFD8]">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#512D6D] text-white text-xs font-bold">
                    {quizStep <= 3
                      ? t.services.diagnostic.stepIndicator.replace('{current}', String(quizStep))
                      : t.services.diagnostic.result.kicker}
                  </span>
                  {quizStep <= 3 && (
                    <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
                      {[1, 2, 3].map((s) => (
                        <span
                          key={s}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            s <= quizStep ? 'w-8 bg-[#512D6D]' : 'w-4 bg-[#D1C4E9]/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {quizStep > 1 && quizStep <= 3 && (
                    <button
                      type="button"
                      onClick={() => setQuizStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1))}
                      className="min-h-[40px] px-3 py-1.5 rounded-full text-xs font-semibold text-[#512D6D] hover:bg-[#F9F6F0] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                    >
                      {t.services.diagnostic.backBtn}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setQuizOpen(false)}
                    aria-label={t.services.diagnostic.closeAria}
                    title={t.services.diagnostic.closeAria}
                    className="min-h-[40px] min-w-[40px] px-2.5 py-1.5 rounded-full bg-[#F9F6F0] hover:bg-[#EDE5DC] text-[#5D4037] text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                  >
                    <X className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.services.diagnostic.closeBtn}</span>
                  </button>
                </div>
              </div>

              {/* STEP 1: CHOOSE PRIORITY ZONE */}
              {quizStep === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-1">
                    {t.services.diagnostic.q1Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D4037]/75 mb-4">
                    {t.services.diagnostic.q1Sub}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(
                      [
                        { key: 'visage' as QuizZoneKey, icon: Sparkles },
                        { key: 'regard' as QuizZoneKey, icon: Eye },
                        { key: 'piedsCorps' as QuizZoneKey, icon: Footprints },
                      ] as const
                    ).map(({ key, icon: IconComp }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectZone(key)}
                        className="min-h-[64px] text-left p-4 rounded-2xl bg-[#F9F6F0]/70 hover:bg-[#F5EBF7] border border-[#D1C4E9] hover:border-[#512D6D] transition-all flex items-center justify-between gap-3 group cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#D1C4E9] text-[#512D6D] group-hover:bg-[#512D6D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block font-serif text-sm sm:text-base font-bold text-[#5D4037] group-hover:text-[#512D6D]">
                              {t.services.diagnostic.zones[key].title}
                            </span>
                            <span className="block text-xs text-[#5D4037]/75 mt-0.5 leading-snug">
                              {t.services.diagnostic.zones[key].sub}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#512D6D] shrink-0 opacity-70 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE SPECIFIC FEELING / NEED */}
              {quizStep === 2 && (
                <div className="animate-fadeIn">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-1">
                    {t.services.diagnostic.q2Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D4037]/75 mb-4">
                    {t.services.diagnostic.q2Sub}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(selectedZone === 'visage'
                      ? (['visageDouceur', 'visagePurete', 'visageDetox'] as QuizNeedKey[])
                      : selectedZone === 'regard'
                      ? (['regardCils'] as QuizNeedKey[])
                      : (['piedsExpress', 'piedsComplet', 'corpsChaise'] as QuizNeedKey[])
                    ).map((needKey) => {
                      const mappedService = services.find(
                        (s) => s.id === NEED_TO_SERVICES_MAP[needKey].primaryId
                      );
                      return (
                        <button
                          key={needKey}
                          type="button"
                          onClick={() => handleSelectNeed(needKey)}
                          className="min-h-[68px] text-left p-4 rounded-2xl bg-[#F9F6F0]/70 hover:bg-[#F5EBF7] border border-[#D1C4E9] hover:border-[#512D6D] transition-all flex flex-col justify-between gap-2.5 group cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                        >
                          <div>
                            <span className="block font-serif text-sm sm:text-base font-bold text-[#5D4037] group-hover:text-[#512D6D]">
                              {t.services.diagnostic.needs[needKey].title}
                            </span>
                            <span className="block text-xs text-[#5D4037]/75 mt-1 leading-relaxed">
                              {t.services.diagnostic.needs[needKey].sub}
                            </span>
                          </div>
                          {mappedService && (
                            <div className="pt-2 border-t border-[#D1C4E9]/50 flex items-center justify-between text-xs font-semibold text-[#7A2048]">
                              <span>
                                {mappedService.duration} · {mappedService.price} €
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#512D6D] group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE SESSION FORMAT (SOLO VS DUO WITH FREE TRAVEL) */}
              {quizStep === 3 && (() => {
                const { primary, companion } = getRecommendedPair();
                const duoPrice = primary.price + companion.price;
                const duoDuration = formatDurationMinutes(
                  primary.durationMinutes + companion.durationMinutes
                );
                return (
                  <div className="animate-fadeIn">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-1">
                      {t.services.diagnostic.q3Title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5D4037]/75 mb-4">
                      {t.services.diagnostic.q3Sub}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {/* Option A: Solo */}
                      <button
                        type="button"
                        onClick={() => handleSelectFormat('solo')}
                        className="min-h-[76px] text-left p-4 sm:p-5 rounded-2xl bg-[#F9F6F0]/70 hover:bg-[#F5EBF7] border border-[#D1C4E9] hover:border-[#512D6D] transition-all flex flex-col justify-between gap-3 group cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                      >
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-[#D1C4E9] text-[#512D6D] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                            {t.services.diagnostic.formats.solo.badge}
                          </span>
                          <span className="block font-serif text-base font-bold text-[#5D4037] group-hover:text-[#512D6D]">
                            {t.services.diagnostic.formats.solo.title}
                          </span>
                          <span className="block text-xs text-[#5D4037]/80 mt-1">
                            {t.services.diagnostic.formats.solo.sub}
                          </span>
                        </div>
                        <div className="pt-2.5 border-t border-[#D1C4E9]/50 flex items-center justify-between text-xs font-bold text-[#7A2048]">
                          <span>
                            {primary.title} ({primary.duration} · {primary.price} €)
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#512D6D]" />
                        </div>
                      </button>

                      {/* Option B: Duo Signature */}
                      <button
                        type="button"
                        onClick={() => handleSelectFormat('duo')}
                        className="min-h-[76px] text-left p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F5E6EC]/80 via-[#FFFDF9] to-[#F3E8FA]/80 hover:from-[#F2DCE6] hover:to-[#EADAF6] border-2 border-[#7A2048]/40 hover:border-[#512D6D] transition-all flex flex-col justify-between gap-3 group cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                      >
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold mb-1.5">
                            {t.services.diagnostic.formats.duo.badge}
                          </span>
                          <span className="block font-serif text-base font-bold text-[#5D4037] group-hover:text-[#512D6D]">
                            {t.services.diagnostic.formats.duo.title}
                          </span>
                          <span className="block text-xs text-[#5D4037]/80 mt-1">
                            {t.services.diagnostic.formats.duo.sub}
                          </span>
                        </div>
                        <div className="pt-2.5 border-t border-[#7A2048]/20 flex items-center justify-between text-xs font-bold text-[#7A2048]">
                          <span>
                            {primary.title} + {companion.title} ({duoDuration} · {duoPrice} €)
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#512D6D]" />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* STEP 4: PERSONALIZED RECOMMENDATION RESULT */}
              {quizStep === 4 && (() => {
                const { primary, companion } = getRecommendedPair();
                const isDuo = selectedFormat === 'duo';
                const recommendedList = isDuo ? [primary, companion] : [primary];
                const totalPrice = isDuo ? primary.price + companion.price : primary.price;
                const totalDuration = isDuo
                  ? formatDurationMinutes(primary.durationMinutes + companion.durationMinutes)
                  : primary.duration;
                const needAdvice = selectedNeed
                  ? t.services.diagnostic.needs[selectedNeed].advice
                  : t.services.diagnostic.needs.visageDouceur.advice;

                return (
                  <div className="animate-fadeIn space-y-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F9F6F0] via-[#FFFDFB] to-[#F5E6EC]/60 border border-[#D1C4E9]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#7A2048]">
                          ★ {isDuo ? t.services.diagnostic.result.titleDuo : t.services.diagnostic.result.titleSolo}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#512D6D] text-white text-xs font-bold">
                          {totalDuration} · {totalPrice} €
                        </span>
                      </div>

                      <h4 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                        {isDuo ? `${primary.title} + ${companion.title}` : primary.title}
                      </h4>

                      {isDuo && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                          <span>{t.services.diagnostic.result.freeTravelApplied}</span>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-[#E8DFD8] text-xs sm:text-sm text-[#5D4037]/90 leading-relaxed">
                        <strong className="text-[#512D6D] font-semibold">
                          {t.services.diagnostic.result.karinaAdviceLabel}{' '}
                        </strong>
                        <span>{needAdvice}</span>
                        {isDuo && (
                          <span className="block mt-1 text-[#7A2048] font-medium">
                            {t.services.diagnostic.result.duoBonusAdvice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectRecommendedServices) {
                              onSelectRecommendedServices(recommendedList);
                            } else {
                              onSelectService(primary);
                            }
                          }}
                          className="kr-btn-silk min-h-[48px] px-6 py-3 rounded-full bg-[#7A2048] hover:bg-[#631839] active:scale-98 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                          <span>
                            {t.services.diagnostic.result.bookRecommendedBtn.replace(
                              '{price}',
                              String(totalPrice)
                            )}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleViewRecommendedOnMenu(primary, isDuo ? companion : undefined)
                          }
                          className="min-h-[48px] px-4 py-2.5 rounded-full bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                        >
                          <span>{t.services.diagnostic.result.viewOnMenuBtn}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleRestartQuiz}
                        className="min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold text-[#5D4037]/80 hover:text-[#512D6D] hover:bg-[#F9F6F0] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.services.diagnostic.restartBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="kr-reveal">
          {/* SECTION 1: VISAGE & REGARD */}
          {(activeTab === 'all' || activeTab === 'visage-regard') && (
            <div key={`visage-${activeTab}`} className="animate-fadeIn mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#D1C4E9]/40">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B2651]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                    {t.services.sectionVisage}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#8B2651]">
                  {t.services.sectionVisageCount}
                </span>
              </div>

              <div className="space-y-3">
                {services.filter(s => s.group === 'visage-regard').map(renderServiceRow)}
              </div>
            </div>
          )}

          {/* SECTION 2: PIEDS & DETENTE CORPORELLE */}
          {(activeTab === 'all' || activeTab === 'pieds-corps') && (
            <div key={`pieds-${activeTab}`} className="animate-fadeIn mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#D1C4E9]/40">
                <div className="flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-[#8B2651]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                    {t.services.sectionPieds}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-[#8B2651]">
                  {t.services.sectionPiedsCount}
                </span>
              </div>

              <div className="space-y-3">
                {services.filter(s => s.group === 'pieds-corps').map(renderServiceRow)}
              </div>
            </div>
          )}
        </div>

        {/* 3 SIGNATURE DUOS READY-TO-BOOK (US-13) + UNIFIED CUSTOM COMBO TRAY */}
        {(activeTab === 'all' || activeTab === 'duos') && (
          <div key={`duos-${activeTab}`} className="kr-reveal animate-fadeIn mt-6 sm:mt-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 pb-2.5 border-b border-[#D1C4E9]/40">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#8B2651]" />
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                    {t.services.signatureDuos.title}
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-bold">
                    {t.services.comboFreeTravelBadge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed">
                  {t.services.signatureDuos.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {SIGNATURE_DUOS_CONFIG.map((duo) => {
                const firstService = services.find((s) => s.id === duo.firstId);
                const secondService = services.find((s) => s.id === duo.secondId);
                if (!firstService || !secondService) return null;

                const duoPrice = firstService.price + secondService.price;
                const duoDuration = formatDurationMinutes(
                  firstService.durationMinutes + secondService.durationMinutes
                );
                const isDuoSelected =
                  selectedServices.some((s) => s.id === firstService.id) &&
                  selectedServices.some((s) => s.id === secondService.id);
                const duoTrans = t.services.signatureDuos.items[duo.key];

                return (
                  <article
                    key={duo.key}
                    className={`kr-card-nacre rounded-2xl p-4 sm:p-5 border flex flex-col justify-between transition-all ${
                      isDuoSelected
                        ? 'bg-[#FFFDFB] border-2 border-[#512D6D] ring-2 ring-[#512D6D]/20 shadow-md'
                        : 'bg-white border-[#D1C4E9] hover:border-[#7A2048]/50 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Top row: Badge + Duration & Price */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F5EBE1] text-[#7A2048] border border-[#C29D59]/30 text-[10px] font-bold uppercase tracking-wider">
                          ★ {duoTrans.badge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#512D6D] text-white text-xs font-bold shrink-0">
                          {duoDuration} · {duoPrice} €
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] leading-snug">
                        {duoTrans.title}
                      </h4>
                      <p className="text-xs text-[#5D4037]/80 mt-1 leading-relaxed">
                        {duoTrans.desc}
                      </p>

                      {/* Included Services Breakdown */}
                      <ul className="mt-3.5 pt-3 border-t border-[#E8DFD8] space-y-1.5 text-xs text-[#5D4037]">
                        <li className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#512D6D] truncate">
                            1. {firstService.title}
                          </span>
                          <span className="text-[#5D4037]/70 shrink-0">
                            {firstService.duration} · {firstService.price} €
                          </span>
                        </li>
                        <li className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-[#512D6D] truncate">
                            2. {secondService.title}
                          </span>
                          <span className="text-[#5D4037]/70 shrink-0">
                            {secondService.duration} · {secondService.price} €
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8DFD8]/70 space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold w-full justify-center">
                        <span>{t.services.signatureDuos.freeTravelTag}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectRecommendedServices) {
                            onSelectRecommendedServices([firstService, secondService]);
                          } else {
                            onSelectService(firstService);
                          }
                        }}
                        className={`kr-btn-silk min-h-[48px] w-full px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                          isDuoSelected
                            ? 'bg-[#512D6D] hover:bg-[#402257] text-white shadow-xs'
                            : 'bg-[#7A2048] hover:bg-[#631839] text-white shadow-xs'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>
                          {(isDuoSelected
                            ? t.services.signatureDuos.selectedDuoBtn
                            : t.services.signatureDuos.chooseDuoBtn
                          ).replace('{price}', String(duoPrice))}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Compact Custom Combo Selection Bar (always visible when services are in combo, or as a subtle customizer bar) */}
        <div className="kr-reveal kr-card-nacre mt-6 bg-gradient-to-r from-[#F5E6EC]/60 via-[#FFFDF9] to-[#F5E6EC]/60 rounded-2xl p-3.5 sm:p-4.5 border border-[#8B2651]/25 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-9 h-9 rounded-xl bg-[#7A2048] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#5D4037]">
                  {t.services.comboTitle}
                </h3>
                <p className="text-xs text-[#5D4037]/80 leading-relaxed">
                  {t.services.comboDesc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
              {onOpenGiftCard && (
                <button
                  type="button"
                  onClick={onOpenGiftCard}
                  className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-bold text-[#512D6D] bg-white border border-[#D1C4E9] hover:bg-[#F5EBF7] rounded-full shadow-2xs transition-colors cursor-pointer"
                >
                  {t.services.giftCardCta}
                </button>
              )}

              {selectedServices.length >= 2 ? (
                <button
                  type="button"
                  onClick={() => (onBookCombo ? onBookCombo() : onSelectService(selectedServices[0]))}
                  className="kr-btn-silk min-h-[44px] px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#7A2048] hover:bg-[#631839] rounded-full shadow-xs transition-all cursor-pointer"
                >
                  {t.services.comboBookSelectionBtn
                    .replace('{count}', String(selectedServices.length))
                    .replace(
                      '{price}',
                      String(selectedServices.reduce((sum, s) => sum + s.price, 0))
                    )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onBookCombo && selectedServices.length === 1
                      ? onBookCombo()
                      : onSelectService(services[0])
                  }
                  className="min-h-[42px] px-5 py-2 text-xs sm:text-sm font-bold text-[#7A2048] bg-white border border-[#7A2048]/40 hover:bg-[#8B2651]/10 rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  {t.services.comboBtn}
                </button>
              )}
            </div>
          </div>

          {selectedServices.length > 0 && (
            <div className="pt-2.5 border-t border-[#8B2651]/15 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedServices.map((sel) => {
                  const localized = services.find((s) => s.id === sel.id) || sel;
                  return (
                    <span
                      key={sel.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#512D6D]/30 text-xs font-semibold text-[#512D6D] shadow-2xs"
                    >
                      <span>
                        {localized.title} ({localized.price}€)
                      </span>
                      {onToggleComboService && (
                        <button
                          type="button"
                          onClick={() => onToggleComboService(localized)}
                          aria-label={t.contact.rightCard.removeServiceTitle}
                          title={t.contact.rightCard.removeServiceTitle}
                          className="text-[#5D4037]/50 hover:text-[#7A2048] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </span>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-[#7A2048]">
                {t.services.comboTotalDurationLabel.replace(
                  '{duration}',
                  formatDurationMinutes(
                    selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0)
                  )
                )}
              </span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

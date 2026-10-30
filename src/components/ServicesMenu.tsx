import React, { useState } from 'react';
import { Clock, MessageCircle, Sparkles, Eye, Footprints, ChevronDown, Plus, Check, X } from 'lucide-react';
import { getServices, ServiceItem } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';

interface ServicesMenuProps {
  onSelectService: (service: ServiceItem) => void;
  selectedServices?: ServiceItem[];
  onToggleComboService?: (service: ServiceItem) => void;
  onBookCombo?: () => void;
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
  selectedServices = [],
  onToggleComboService,
  onBookCombo,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'visage-regard' | 'pieds-corps'>('all');
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  const services = getServices(language);

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

          {/* Interactive Category Filter Tabs with Sliding Pill */}
          <div className="relative grid grid-cols-3 p-1 bg-white/85 backdrop-blur-xs rounded-2xl border border-[#D1C4E9]/80 shadow-2xs self-start md:self-auto shrink-0">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-xl bg-[#512D6D] shadow-xs transition-transform duration-300 ease-out"
              style={{
                transform:
                  activeTab === 'all'
                    ? 'translateX(0%)'
                    : activeTab === 'visage-regard'
                    ? 'translateX(100%)'
                    : 'translateX(200%)',
              }}
            />
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`relative z-10 min-h-[34px] px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap ${
                activeTab === 'all'
                  ? 'text-white font-semibold'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D]'
              }`}
            >
              <span>{t.services.filters.all} ({services.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('visage-regard')}
              className={`relative z-10 min-h-[34px] px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'visage-regard'
                  ? 'text-white font-semibold'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>{t.services.filters.visageRegard} ({visageRegardCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pieds-corps')}
              className={`relative z-10 min-h-[34px] px-2.5 sm:px-3.5 py-1 text-xs sm:text-sm rounded-xl transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                activeTab === 'pieds-corps'
                  ? 'text-white font-semibold'
                  : 'text-[#5D4037] font-medium hover:text-[#512D6D]'
              }`}
            >
              <Footprints className="w-3.5 h-3.5 shrink-0" />
              <span>{t.services.filters.piedsCorps} ({piedsCorpsCount})</span>
            </button>
          </div>
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

        {/* Combination / Custom Session Callout & Interactive Combo Tray */}
        <div className="kr-reveal kr-card-nacre mt-6 sm:mt-10 max-w-4xl mx-auto bg-gradient-to-r from-[#F5E6EC]/70 via-[#FFFDF9] to-[#F5E6EC]/70 rounded-2xl p-4 sm:p-6 border border-[#8B2651]/25 space-y-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-[#7A2048] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-[11px] font-bold mb-1">
                  {t.services.comboFreeTravelBadge}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#5D4037]">
                  {t.services.comboTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed">
                  {t.services.comboDesc}
                </p>
              </div>
            </div>

            {selectedServices.length >= 2 ? (
              <button
                type="button"
                onClick={() => (onBookCombo ? onBookCombo() : onSelectService(selectedServices[0]))}
                className="kr-btn-silk min-h-[42px] w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#7A2048] hover:bg-[#631839] rounded-full shadow-xs transition-all shrink-0 cursor-pointer"
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
                className="min-h-[38px] w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-bold text-[#7A2048] bg-white border border-[#7A2048]/40 hover:bg-[#8B2651]/10 rounded-full shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                {t.services.comboBtn}
              </button>
            )}
          </div>

          {selectedServices.length > 0 && (
            <div className="pt-3 border-t border-[#8B2651]/15 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
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

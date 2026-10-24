import React, { useState } from 'react';
import { Clock, MessageCircle, Sparkles, Heart, Eye, Footprints, ChevronDown, ChevronUp } from 'lucide-react';
import { getServices, ServiceItem } from '../data/servicesData';
import { useLanguage } from '../i18n/LanguageContext';

interface ServicesMenuProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'visage-regard' | 'pieds-corps'>('all');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const services = getServices(language);

  const toggleSteps = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const visageRegardCount = services.filter(s => s.group === 'visage-regard').length;
  const piedsCorpsCount = services.filter(s => s.group === 'pieds-corps').length;

  const renderServiceRow = (service: ServiceItem) => {
    const isExpanded = !!expandedSteps[service.id];
    const details = service.protocolSteps || service.comprend || [];
    const isProtocol = !!service.protocolSteps;
    
    const detailLabel = isProtocol ? t.services.viewProtocol : t.services.viewIncluded;
    const hideLabel = isProtocol ? t.services.hideProtocol : t.services.hideIncluded;

    const categoryLabel = t.services.categories[service.category] || service.category;

    return (
      <div
        key={service.id}
        className="bg-white hover:bg-[#FFFDFB] border border-[#E8DFD8] hover:border-[#8B2651]/40 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs group"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Main Info: Category, Badges, Title, Descriptions */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                service.colorTheme === 'pink'
                  ? 'bg-[#F472B6]/15 text-[#BE185D]'
                  : service.colorTheme === 'cyan'
                  ? 'bg-[#38BDF8]/15 text-[#0369A1]'
                  : 'bg-[#8B2651]/15 text-[#7A2048]'
              }`}>
                {categoryLabel}
              </span>

              {service.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#F5EBE1] text-[#7A2048] border border-[#C29D59]/30">
                  ★ {service.badge}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] group-hover:text-[#7A2048] transition-colors">
                {service.title}
              </h4>
              <span className="hidden sm:inline text-xs text-[#512D6D] font-medium">
                — {service.tagline}
              </span>
            </div>

            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-2xl">
              {service.description}
            </p>

            {/* Micro Toggle for Details */}
            {details.length > 0 && (
              <button
                type="button"
                onClick={() => toggleSteps(service.id)}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B2651] hover:text-[#512D6D] transition-colors cursor-pointer select-none"
              >
                <span>{isExpanded ? hideLabel : `${detailLabel} (${details.length})`}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Right Action Block: Duration, Price, Reserve Button */}
          <div className="flex items-center justify-between lg:justify-end gap-3 sm:gap-5 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E8DFD8]/70">
            <div className="flex items-center gap-1.5 text-xs text-[#5D4037]/85 font-medium bg-[#F9F6F0] px-3 py-1.5 rounded-xl border border-[#E8DFD8]/60">
              <Clock className="w-3.5 h-3.5 text-[#8B2651]" />
              <span>{service.duration}</span>
            </div>

            <div className="text-right min-w-[70px]">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#7A2048]">
                {service.price}€
              </span>
            </div>

            <button
              onClick={() => onSelectService(service)}
              className="min-h-[40px] px-4 sm:px-5 py-2 rounded-full bg-[#7A2048] hover:bg-[#631839] active:scale-98 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>{t.services.reserveBtn}</span>
            </button>
          </div>

        </div>

        {/* Expandable Protocol / Inclusions Drawer */}
        {isExpanded && details.length > 0 && (
          <div className="mt-3.5 pt-3.5 border-t border-[#D1C4E9]/30 bg-[#FDF8FA] rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#7A2048] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B2651]" />
              <span>{isProtocol ? t.services.protocolTitle : t.services.includedTitle}</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#5D4037]/90">
              {details.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-[#E8DFD8]/50">
                  <span className="text-[#8B2651] font-bold text-xs shrink-0 mt-0.5">•</span>
                  <span className="leading-tight">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="soins" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-[#F9F6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8B2651]/10 text-[#8B2651] text-[11px] font-serif font-semibold tracking-wide mb-1.5">
              <Heart className="w-3 h-3 fill-[#8B2651]" />
              <span>{t.services.kicker}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-xl">
              {t.services.subtitle}
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#D1C4E9]/30 rounded-2xl border border-[#D1C4E9]/60 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`min-h-[34px] px-3 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              {t.services.filters.all} ({services.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('visage-regard')}
              className={`min-h-[34px] px-3 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'visage-regard'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t.services.filters.visageRegard} ({visageRegardCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pieds-corps')}
              className={`min-h-[34px] px-3 py-1 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pieds-corps'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>{t.services.filters.piedsCorps} ({piedsCorpsCount})</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: VISAGE & REGARD */}
        {(activeTab === 'all' || activeTab === 'visage-regard') && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#D1C4E9]/40">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8B2651]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                  {t.services.sectionVisage}
                </h3>
              </div>
              <span className="text-[11px] text-[#8B2651] font-semibold bg-[#8B2651]/10 px-2.5 py-0.5 rounded-full">
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
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#D1C4E9]/40">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-[#8B2651]" />
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                  {t.services.sectionPieds}
                </h3>
              </div>
              <span className="text-[11px] text-[#8B2651] font-semibold bg-[#8B2651]/10 px-2.5 py-0.5 rounded-full">
                {t.services.sectionPiedsCount}
              </span>
            </div>

            <div className="space-y-3">
              {services.filter(s => s.group === 'pieds-corps').map(renderServiceRow)}
            </div>
          </div>
        )}

        {/* Combination / Custom Session Callout */}
        <div className="mt-6 sm:mt-10 max-w-4xl mx-auto bg-gradient-to-r from-[#F5E6EC]/70 via-[#FFFDF9] to-[#F5E6EC]/70 rounded-2xl p-4 sm:p-6 border border-[#8B2651]/25 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#7A2048] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[#5D4037]">
                {t.services.comboTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed">
                {t.services.comboDesc}
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectService(services[0])}
            className="min-h-[38px] w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-bold text-[#7A2048] bg-white border border-[#7A2048]/40 hover:bg-[#8B2651]/10 rounded-full shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            {t.services.comboBtn}
          </button>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Clock, MessageCircle, Sparkles, Heart, Eye, Footprints, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/servicesData';

interface ServicesMenuProps {
  onSelectService: (service: ServiceItem) => void;
}

// Lotus SVG matching the flyer's lotus emblem
const LotusFlower: React.FC<{ className?: string }> = ({ className = "w-7 h-7 text-[#8B2651]" }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.5"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M50 82 C50 60, 42 32, 50 18 C58 32, 50 60, 50 82 Z" fill="currentColor" fillOpacity="0.12" />
    <path d="M50 82 C42 66, 26 44, 34 26 C44 40, 48 64, 50 82 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M50 82 C58 66, 74 44, 66 26 C56 40, 52 64, 50 82 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M50 82 C34 72, 14 56, 18 42 C30 52, 44 70, 50 82 Z" fill="currentColor" fillOpacity="0.05" />
    <path d="M50 82 C66 72, 86 56, 82 42 C70 52, 56 70, 50 82 Z" fill="currentColor" fillOpacity="0.05" />
    <path d="M26 84 C38 88, 62 88, 74 84" strokeWidth="3" />
  </svg>
);

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'visage-regard' | 'pieds-corps'>('all');
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const toggleSteps = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.group === activeTab);

  const visageRegardCount = SERVICES.filter(s => s.group === 'visage-regard').length;
  const piedsCorpsCount = SERVICES.filter(s => s.group === 'pieds-corps').length;

  return (
    <section id="soins" className="py-8 sm:py-20 bg-[#F9F6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#8B2651]/10 text-[#8B2651] text-xs font-serif font-semibold tracking-wide mb-2 sm:mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#8B2651]" />
            <span>Pour votre confort et votre bien-être</span>
            <Heart className="w-3.5 h-3.5 fill-[#8B2651]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-2 sm:mb-3">
            Carte des Soins & Tarifs
          </h2>
          <p className="text-xs sm:text-base text-[#5D4037]/80 leading-relaxed max-w-xl mx-auto">
            Prestations de beauté et de détente réalisées avec soin à votre domicile à Rennes. 
            Déplacement offert dans un rayon de 7 km.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-5 sm:mt-7 inline-flex items-center gap-1.5 p-1.5 bg-[#D1C4E9]/30 rounded-2xl border border-[#D1C4E9]/60 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              Tous les soins ({SERVICES.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('visage-regard')}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'visage-regard'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visage & Regard ({visageRegardCount})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pieds-corps')}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'pieds-corps'
                  ? 'bg-[#512D6D] text-white font-semibold shadow-xs'
                  : 'text-[#5D4037] hover:text-[#512D6D]'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              <span>Pieds & Détente ({piedsCorpsCount})</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: VISAGE & REGARD (FLYER 2 AESTHETIC) */}
        {(activeTab === 'all' || activeTab === 'visage-regard') && (
          <div className="mb-10 sm:mb-16">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D1C4E9]/50">
              <Sparkles className="w-4 h-4 text-[#8B2651]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                Soins du Visage & Sublimation du Regard
              </h3>
              <span className="text-xs text-[#8B2651] font-semibold ml-auto">
                4 soins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {SERVICES.filter(s => s.group === 'visage-regard').map((service) => {
                const isPink = service.colorTheme === 'pink';
                const isExpanded = !!expandedSteps[service.id];

                return (
                  <div
                    key={service.id}
                    className={`rounded-3xl p-4 sm:p-5 border-2 transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                      isPink
                        ? 'border-[#F472B6]/60 bg-gradient-to-br from-[#FFF5F9] via-[#FFFFFF] to-[#FDF2F8]'
                        : 'border-[#38BDF8]/60 bg-gradient-to-br from-[#F0F9FF] via-[#FFFFFF] to-[#F0FDFA]'
                    }`}
                  >
                    <div>
                      {/* Top Row: Pill Tagline & Duration */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                          isPink 
                            ? 'bg-[#F472B6]/20 text-[#BE185D]' 
                            : 'bg-[#38BDF8]/20 text-[#0369A1]'
                        }`}>
                          {service.category === 'regard' ? 'Soin du Regard' : 'Soin du Visage'}
                        </span>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D1C4E9]/60 shadow-2xs text-xs font-semibold text-[#5D4037]">
                          <Clock className="w-3.5 h-3.5 text-[#512D6D]" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      {/* Main Title & Price Header (Exact Flyer 2 Style) */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-sans font-bold tracking-wider text-sm sm:text-base text-[#1E293B] uppercase leading-snug">
                          {service.title}
                        </h4>
                        <div className="text-right shrink-0">
                          <span className={`font-serif text-2xl sm:text-3xl font-bold italic ${
                            isPink ? 'text-[#BE185D]' : 'text-[#0284C7]'
                          }`}>
                            {service.price}€
                          </span>
                        </div>
                      </div>

                      {/* Tagline / Subtitle */}
                      <p className="text-xs font-medium text-[#512D6D] mb-2">
                        {service.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed mb-3">
                        {service.description}
                      </p>

                      {/* Expandable Protocol Steps */}
                      {service.protocolSteps && (
                        <div className="mb-3">
                          <button
                            type="button"
                            onClick={() => toggleSteps(service.id)}
                            className="min-h-[34px] w-full flex items-center justify-between text-xs font-semibold text-[#512D6D] bg-white/70 hover:bg-white px-3 py-1.5 rounded-xl border border-[#D1C4E9]/50 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? 'Masquer le déroulé' : 'Voir les étapes du protocole'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {isExpanded && (
                            <ul className="mt-2 p-3 bg-white/80 rounded-xl border border-[#D1C4E9]/40 space-y-1.5 text-xs text-[#5D4037]/90 leading-tight">
                              {service.protocolSteps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#8B2651] font-bold text-xs mt-0.5">•</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Booking Button */}
                    <div className="pt-3 border-t border-black/5 flex items-center justify-between gap-3">
                      <span className="text-[11px] text-[#5D4037]/75 font-medium">
                        Matériel professionnel apporté
                      </span>
                      <button
                        onClick={() => onSelectService(service)}
                        className={`min-h-[40px] flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-full shadow-xs transition-transform active:scale-98 cursor-pointer ${
                          isPink
                            ? 'bg-[#BE185D] hover:bg-[#9D174D]'
                            : 'bg-[#0284C7] hover:bg-[#0369A1]'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-200" />
                        <span>Réserver ({service.price}€)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: PIEDS & DETENTE CORPORELLE (FLYER 1 AESTHETIC) */}
        {(activeTab === 'all' || activeTab === 'pieds-corps') && (
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#D1C4E9]/50">
              <Footprints className="w-4 h-4 text-[#8B2651]" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                Beauté & Soins des Pieds · Modelage en Chaise
              </h3>
              <span className="text-xs text-[#8B2651] font-semibold ml-auto">
                3 soins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {SERVICES.filter(s => s.group === 'pieds-corps').map((service, index) => {
                const isCenterCard = index === 1;

                return (
                  <div
                    key={service.id}
                    className={`relative bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md ${
                      isCenterCard 
                        ? 'border-[#8B2651]/40 ring-1 ring-[#8B2651]/20 -translate-y-0.5' 
                        : 'border-[#E6DCD1]'
                    }`}
                  >
                    {service.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <span className="px-3.5 py-1 rounded-full bg-[#8B2651] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                          {service.badge}
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Compact Header Highlight Banner */}
                      <div className="mb-3.5">
                        {index === 0 && (
                          <div className="rounded-2xl py-2.5 px-3.5 bg-gradient-to-r from-[#FDF2F6] via-[#FFF9FB] to-[#FDF2F6] border border-[#8B2651]/25 flex items-center justify-center gap-2.5 shadow-2xs">
                            <div className="w-8 h-8 rounded-full bg-[#8B2651]/15 text-[#8B2651] flex items-center justify-center shrink-0">
                              <Sparkles className="w-4 h-4 text-[#8B2651]" />
                            </div>
                            <span className="font-serif font-bold text-sm sm:text-base text-[#7A2048] tracking-tight">
                              Exfoliation & Éclat des Pieds
                            </span>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="rounded-2xl py-2.5 px-3.5 bg-gradient-to-r from-[#FBF0F5] via-[#FFF7FA] to-[#FBF0F5] border border-[#8B2651]/30 flex items-center justify-center gap-2.5 shadow-2xs">
                            <div className="w-8 h-8 rounded-full bg-[#8B2651] text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Heart className="w-4 h-4 fill-white" />
                            </div>
                            <span className="font-serif font-bold text-sm sm:text-base text-[#7A2048] tracking-tight">
                              Masque & Massage Japonais 10 min
                            </span>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="rounded-2xl py-2.5 px-3.5 bg-gradient-to-r from-[#FDF2F6] via-[#FFF9FB] to-[#FDF2F6] border border-[#8B2651]/25 flex items-center justify-center gap-2.5 shadow-2xs">
                            <div className="w-8 h-8 rounded-full bg-[#8B2651]/15 text-[#8B2651] flex items-center justify-center shrink-0">
                              <Sparkles className="w-4 h-4 text-[#8B2651]" />
                            </div>
                            <span className="font-serif font-bold text-sm sm:text-base text-[#7A2048] tracking-tight">
                              Chaise Ergonomique & Détente Express
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Title Banner (Brush-stroke style from flyer) */}
                      <div className="text-center mb-4">
                        <div className="inline-block relative px-5 py-2 rounded-2xl bg-gradient-to-r from-[#7A2048] via-[#8B2651] to-[#7A2048] text-white shadow-xs">
                          <h4 className="font-serif italic text-lg sm:text-xl font-bold tracking-wide">
                            {service.title}
                          </h4>
                        </div>
                      </div>

                      {/* Duration & Price Chips Row */}
                      <div className="flex items-center justify-center gap-2.5 mb-5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C29D59]/50 shadow-2xs text-xs font-semibold text-[#5D4037]">
                          <Clock className="w-3.5 h-3.5 text-[#C29D59]" />
                          <span>{service.duration}</span>
                        </div>

                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#7A2048] text-white text-base font-serif font-bold shadow-xs">
                          <span>{service.price} €</span>
                        </div>
                      </div>

                      {/* "Comprend :" Header (Script / Italic style like flyer) */}
                      <div className="mb-2">
                        <h5 className="font-serif italic text-sm sm:text-base font-bold text-[#7A2048]">
                          Comprend :
                        </h5>
                      </div>

                      {/* Checklist Items from flyer */}
                      {service.comprend && (
                        <ul className="space-y-2 mb-6">
                          {service.comprend.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5D4037]/90 leading-snug">
                              <span className="text-[#8B2651] font-bold text-sm shrink-0 leading-none mt-0.5">
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Lotus Flower decoration at bottom */}
                      <div className="flex justify-center my-3">
                        <LotusFlower className="w-8 h-8 text-[#8B2651]/80" />
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="pt-3 border-t border-[#E6DCD1]/60">
                      <button
                        onClick={() => onSelectService(service)}
                        className="min-h-[46px] w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#7A2048] hover:bg-[#631839] active:scale-98 rounded-full shadow-sm transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-300" />
                        <span>Réserver ce soin ({service.price} €)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Combination / Custom Session Callout */}
        <div className="mt-8 sm:mt-14 max-w-4xl mx-auto bg-gradient-to-r from-[#F5E6EC]/70 via-[#FFFDF9] to-[#F5E6EC]/70 rounded-3xl p-5 sm:p-7 border border-[#8B2651]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#7A2048] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                Envie d'un rendez-vous beauté complet ?
              </h4>
              <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed">
                Combinez par exemple un <strong>Soin du Visage</strong> avec un <strong>Rehaussement de Cils</strong> ou un <strong>Soin des Pieds</strong> pour une séance cocooning totale à votre domicile.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectService(SERVICES[0])}
            className="min-h-[42px] w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-[#7A2048] bg-white border border-[#7A2048]/40 hover:bg-[#8B2651]/10 rounded-full shadow-xs transition-colors shrink-0"
          >
            Personnaliser mon créneau
          </button>
        </div>

      </div>
    </section>
  );
};

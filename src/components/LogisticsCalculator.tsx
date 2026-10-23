import React, { useState } from 'react';
import { MapPin, Car, Search, Info, Compass } from 'lucide-react';
import { COMMUNES_DATA, CommuneItem } from '../data/communesData';
import { useLanguage } from '../i18n/LanguageContext';

export const LogisticsCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommune, setSelectedCommune] = useState<CommuneItem>(COMMUNES_DATA[0]);

  const filteredCommunes = COMMUNES_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.postalCode.includes(searchQuery)
  );

  return (
    <section id="secteur" className="py-6 sm:py-12 bg-gradient-to-b from-[#F9F6F0] via-[#F4EDE2]/50 to-[#F9F6F0] border-t border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#512D6D]/10 text-[#512D6D] text-[11px] font-semibold tracking-wide mb-1.5">
              <Compass className="w-3 h-3 text-[#512D6D]" />
              <span>{t.logistics.kicker}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.logistics.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-xl">
              {t.logistics.subtitle}
            </p>
          </div>

          {/* Right Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D1C4E9]/30 rounded-2xl border border-[#D1C4E9]/60 shrink-0 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-[#512D6D]">{t.logistics.badge.free}</span>
            <span className="text-xs text-[#5D4037]/50">·</span>
            <span className="text-xs text-[#5D4037]/80 font-medium">{t.logistics.badge.from5}</span>
          </div>
        </div>

        {/* Interactive Commune Checker with Integrated Tier Zones */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#D1C4E9] shadow-sm max-w-4xl mx-auto">
          
          {/* Integrated 3-Tier Legend Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 p-2 bg-[#F9F6F0] rounded-2xl border border-[#D1C4E9]/60">
            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#512D6D]/20 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <div>
                  <div className="text-[11px] font-bold text-[#512D6D]">{t.logistics.zones.zone1Title}</div>
                  <div className="text-[10px] text-[#5D4037]/75">{t.logistics.zones.zone1Sub}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D1C4E9] text-[#512D6D] shrink-0">
                {t.logistics.zones.zone1Tag}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#D1C4E9]/70 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <Car className="w-3.5 h-3.5 text-[#512D6D] shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-[#5D4037]">{t.logistics.zones.zone2Title}</div>
                  <div className="text-[10px] text-[#5D4037]/75">{t.logistics.zones.zone2Sub}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F9F6F0] border border-[#D1C4E9] text-[#5D4037] shrink-0">
                {t.logistics.zones.zone2Tag}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-[#D1C4E9]/70 shadow-2xs">
              <div className="flex items-center gap-2 min-w-0">
                <Compass className="w-3.5 h-3.5 text-[#512D6D] shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-[#5D4037]">{t.logistics.zones.zone3Title}</div>
                  <div className="text-[10px] text-[#5D4037]/75">{t.logistics.zones.zone3Sub}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F9F6F0] border border-[#D1C4E9] text-[#5D4037] shrink-0">
                {t.logistics.zones.zone3Tag}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                {t.logistics.simulatorTitle}
              </h3>
              <p className="text-xs text-[#5D4037]/80">
                {t.logistics.simulatorSub}
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#5D4037]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.logistics.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[40px] w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
              />
            </div>
          </div>

          {/* Quick Commune Selector Pills */}
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 mb-4 pb-2 border-b border-[#D1C4E9]/40">
            {filteredCommunes.slice(0, 12).map((commune) => (
              <button
                key={`${commune.name}-${commune.postalCode}`}
                onClick={() => setSelectedCommune(commune)}
                className={`min-h-[36px] px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCommune.name === commune.name
                    ? 'bg-[#512D6D] text-[#F9F6F0] font-bold'
                    : 'bg-[#F9F6F0] text-[#5D4037] hover:bg-[#D1C4E9]/40'
                }`}
              >
                {commune.name}
              </button>
            ))}
          </div>

          {/* Selected Commune Result Card */}
          {selectedCommune && (
            <div className="bg-[#D1C4E9]/30 rounded-xl p-4 border border-[#D1C4E9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                      {selectedCommune.name}
                    </span>
                    <span className="text-[11px] text-[#5D4037]/80 bg-white px-2 py-0.5 rounded border border-[#D1C4E9]">
                      {selectedCommune.postalCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5D4037]/80">
                    {t.logistics.distanceLabel} {selectedCommune.distanceKm} km
                  </p>
                </div>
              </div>

              <div className="sm:border-l sm:border-[#D1C4E9] sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1C4E9]/50">
                <span className="text-xs text-[#5D4037]/80 font-medium">{t.logistics.feeLabel}</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#512D6D]">
                  {selectedCommune.feeEuro === 0 ? t.logistics.feeFree : `+${selectedCommune.feeEuro} €`}
                </span>
              </div>
            </div>
          )}

          {/* Practical Logistics Setup Info */}
          <div className="mt-4 pt-3 border-t border-[#D1C4E9]/40 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5D4037]">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#512D6D] shrink-0 mt-0.5" />
              <span>
                <strong>{t.logistics.infoHoursBold}</strong> {t.logistics.infoHours}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#512D6D] shrink-0 mt-0.5" />
              <span>
                <strong>{t.logistics.infoSpaceBold}</strong> {t.logistics.infoSpace}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

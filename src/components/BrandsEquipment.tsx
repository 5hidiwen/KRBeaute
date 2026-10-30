import React, { useState, useRef } from 'react';
import { Cpu, Sun, Sparkles, Zap, ExternalLink, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const BrandsEquipment: React.FC = () => {
  const { t } = useLanguage();
  const farmasiAffiliateUrl = "https://www.fr.farmasi.com/karyrobart";
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const brandsSliderRef = useRef<HTMLDivElement>(null);

  const handleBrandsScroll = () => {
    if (brandsSliderRef.current) {
      const scrollLeft = brandsSliderRef.current.scrollLeft;
      const cardWidth = brandsSliderRef.current.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveBrandIndex(Math.min(Math.max(index, 0), 3));
    }
  };

  const scrollToBrand = (idx: number) => {
    if (brandsSliderRef.current) {
      const card = brandsSliderRef.current.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveBrandIndex(idx);
    }
  };

  return (
    <section id="marques" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-white border-y border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="kr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-1.5">
              {t.brands.kicker}
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.brands.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-xl">
              {t.brands.subtitle}
            </p>
          </div>

          {/* Right Action: Farmasi Partner Shop Link */}
          <a
            href={farmasiAffiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="kr-btn-silk inline-flex items-center gap-2 px-4 py-2 bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white rounded-full text-xs font-semibold shadow-2xs hover:shadow-xs transition-all shrink-0 self-start md:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D1C4E9]" />
            <span>{t.brands.farmasiShop}</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>
        </div>

        {/* Brands Showcase: Horizontal Snap Slider on Mobile (< sm), Grid on Tablet & Desktop (sm+) */}
        <div 
          ref={brandsSliderRef}
          onScroll={handleBrandsScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 mb-2 sm:mb-6"
        >
          {/* Nu Skin */}
          <div
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex flex-col justify-between"
          >
            <div>
              <div className="mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#512D6D] bg-[#D1C4E9]/40 px-2.5 py-0.5 rounded-full">
                  {t.brands.brands.nuSkin.badge}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">Nu Skin</h3>
              <p className="text-[11px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.nuSkin.category}
              </p>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed">
                {t.brands.brands.nuSkin.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-xs text-[#512D6D] font-medium">
              {t.brands.brands.nuSkin.footer}
            </div>
          </div>

          {/* Dr. Renaud Paris */}
          <div
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex flex-col justify-between"
          >
            <div>
              <div className="mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#512D6D] bg-[#D1C4E9]/40 px-2.5 py-0.5 rounded-full">
                  {t.brands.brands.drRenaud.badge}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">Dr. Renaud Paris</h3>
              <p className="text-[11px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.drRenaud.category}
              </p>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed">
                {t.brands.brands.drRenaud.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-xs text-[#512D6D] font-medium">
              {t.brands.brands.drRenaud.footer}
            </div>
          </div>

          {/* Farmasi */}
          <div
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white rounded-2xl p-4 border border-[#512D6D]/40 flex flex-col justify-between relative"
          >
            <div>
              <div className="mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#512D6D] bg-[#D1C4E9] px-2.5 py-0.5 rounded-full">
                  {t.brands.brands.farmasi.badge}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">Dr. Tuna by Farmasi</h3>
              <p className="text-[11px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.farmasi.category}
              </p>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed">
                {t.brands.brands.farmasi.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 flex items-center justify-between">
              <span className="text-xs text-[#512D6D] font-medium">{t.brands.brands.farmasi.footer}</span>
              <a
                href={farmasiAffiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#512D6D] hover:underline"
              >
                <span>{t.brands.brands.farmasi.shopBtn}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* House of Peau */}
          <div
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
            className="kr-reveal kr-card-nacre w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex flex-col justify-between"
          >
            <div>
              <div className="mb-2.5">
                <span className="inline-block text-[11px] font-bold text-[#512D6D] bg-[#D1C4E9]/40 px-2.5 py-0.5 rounded-full">
                  {t.brands.brands.houseOfPeau.badge}
                </span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">House of Peau</h3>
              <p className="text-[11px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.houseOfPeau.category}
              </p>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed">
                {t.brands.brands.houseOfPeau.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-xs text-[#512D6D] font-medium">
              {t.brands.brands.houseOfPeau.footer}
            </div>
          </div>
        </div>

        {/* Mobile Swipe Pagination Dots (< sm) */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mb-5">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToBrand(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeBrandIndex === idx
                  ? 'w-6 bg-[#512D6D]'
                  : 'w-2 bg-[#D1C4E9] hover:bg-[#512D6D]/40'
              }`}
              aria-label={`Marque ${idx + 1}`}
            />
          ))}
        </div>

        {/* Specialized Technologies Spotlight */}
        <div className="kr-reveal grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Microcurrents */}
          <div className="kr-card-nacre group bg-white/95 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.microcurrent.tag}</span>
                <span className="text-[11px] text-[#5D4037]/60">{t.brands.tech.microcurrent.note}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                {t.brands.tech.microcurrent.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed mt-0.5 line-clamp-2">
                {t.brands.tech.microcurrent.desc}
              </p>
            </div>
          </div>

          {/* LED Phototherapy */}
          <div className="kr-card-nacre group bg-white/95 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <Sun className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.led.tag}</span>
                <span className="text-[11px] text-[#5D4037]/60">{t.brands.tech.led.note}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                {t.brands.tech.led.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed mt-0.5 line-clamp-2">
                {t.brands.tech.led.desc}
              </p>
            </div>
          </div>

          {/* Galvanic Current */}
          <div className="kr-card-nacre group bg-white/95 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <Zap className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.galvanic.tag}</span>
                <span className="text-[11px] text-[#5D4037]/60">{t.brands.tech.galvanic.note}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                {t.brands.tech.galvanic.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed mt-0.5 line-clamp-2">
                {t.brands.tech.galvanic.desc}
              </p>
            </div>
          </div>

          {/* High Frequency */}
          <div className="kr-card-nacre group bg-white/95 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.highFrequency.tag}</span>
                <span className="text-[11px] text-[#5D4037]/60">{t.brands.tech.highFrequency.note}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                {t.brands.tech.highFrequency.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#5D4037]/85 leading-relaxed mt-0.5 line-clamp-2">
                {t.brands.tech.highFrequency.desc}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

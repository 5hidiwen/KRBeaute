import React from 'react';
import { Cpu, ShieldCheck, Sun, Sparkles, HeartHandshake, Feather, ExternalLink, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const BrandsEquipment: React.FC = () => {
  const { t } = useLanguage();
  const farmasiAffiliateUrl = "https://www.fr.farmasi.com/karyrobart";

  return (
    <section id="marques" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-white border-y border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#512D6D]/10 text-[#512D6D] text-[11px] font-semibold tracking-wide mb-1.5">
              <Sparkles className="w-3 h-3 text-[#512D6D]" />
              <span>{t.brands.kicker}</span>
            </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white rounded-full text-xs font-semibold shadow-2xs hover:shadow-xs transition-all shrink-0 self-start md:self-auto cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D1C4E9]" />
            <span>{t.brands.farmasiShop}</span>
            <ExternalLink className="w-3 h-3 text-white/80" />
          </a>
        </div>

        {/* Brands Showcase Grid - Compact Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          
          {/* Nu Skin */}
          <div className="bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/30 flex items-center justify-center text-[#512D6D]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#512D6D] bg-[#D1C4E9]/30 px-2 py-0.5 rounded-full">
                  {t.brands.brands.nuSkin.badge}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#512D6D]">Nu Skin</h3>
              <p className="text-[10px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.nuSkin.category}
              </p>
              <p className="text-xs text-[#5D4037]/80 leading-relaxed">
                {t.brands.brands.nuSkin.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-medium">
              {t.brands.brands.nuSkin.footer}
            </div>
          </div>

          {/* Dr. Renaud Paris */}
          <div className="bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/30 flex items-center justify-center text-[#512D6D]">
                  <Feather className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#512D6D] bg-[#D1C4E9]/30 px-2 py-0.5 rounded-full">
                  {t.brands.brands.drRenaud.badge}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#512D6D]">Dr. Renaud Paris</h3>
              <p className="text-[10px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.drRenaud.category}
              </p>
              <p className="text-xs text-[#5D4037]/80 leading-relaxed">
                {t.brands.brands.drRenaud.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-medium">
              {t.brands.brands.drRenaud.footer}
            </div>
          </div>

          {/* Farmasi */}
          <div className="bg-white rounded-2xl p-4 border border-[#512D6D]/40 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/30 flex items-center justify-center text-[#512D6D]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#512D6D] bg-[#D1C4E9] px-2 py-0.5 rounded-full">
                  {t.brands.brands.farmasi.badge}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#512D6D]">Farmasi</h3>
              <p className="text-[10px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.farmasi.category}
              </p>
              <p className="text-xs text-[#5D4037]/80 leading-relaxed">
                {t.brands.brands.farmasi.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 flex items-center justify-between">
              <span className="text-[11px] text-[#512D6D] font-medium">{t.brands.brands.farmasi.footer}</span>
              <a
                href={farmasiAffiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#512D6D] hover:underline"
              >
                <span>{t.brands.brands.farmasi.shopBtn}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* House of Peau */}
          <div className="bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/30 flex items-center justify-center text-[#512D6D]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-[#512D6D] bg-[#D1C4E9]/30 px-2 py-0.5 rounded-full">
                  {t.brands.brands.houseOfPeau.badge}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-[#512D6D]">House of Peau</h3>
              <p className="text-[10px] font-semibold text-[#5D4037]/70 uppercase tracking-wider mb-1.5">
                {t.brands.brands.houseOfPeau.category}
              </p>
              <p className="text-xs text-[#5D4037]/80 leading-relaxed">
                {t.brands.brands.houseOfPeau.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-medium">
              {t.brands.brands.houseOfPeau.footer}
            </div>
          </div>

        </div>

        {/* Specialized Technologies Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Microcurrents */}
          <div className="bg-white/90 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 shadow-2xs flex items-center gap-3.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.microcurrent.tag}</span>
                <span className="text-[10px] text-[#5D4037]/50">{t.brands.tech.microcurrent.note}</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#5D4037]">
                {t.brands.tech.microcurrent.title}
              </h3>
              <p className="text-xs text-[#5D4037]/80 leading-snug mt-0.5 line-clamp-2">
                {t.brands.tech.microcurrent.desc}
              </p>
            </div>
          </div>

          {/* LED Phototherapy */}
          <div className="bg-white/90 hover:bg-white rounded-2xl p-4 border border-[#D1C4E9]/70 shadow-2xs flex items-center gap-3.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Sun className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D]">{t.brands.tech.led.tag}</span>
                <span className="text-[10px] text-[#5D4037]/50">{t.brands.tech.led.note}</span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-[#5D4037]">
                {t.brands.tech.led.title}
              </h3>
              <p className="text-xs text-[#5D4037]/80 leading-snug mt-0.5 line-clamp-2">
                {t.brands.tech.led.desc}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

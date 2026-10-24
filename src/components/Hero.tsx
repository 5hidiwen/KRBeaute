import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  Award, 
  ArrowDown,
  ShieldCheck,
  Heart,
  Car
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  onGoToServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onGoToServices }) => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 border-b border-[#D1C4E9]/40 bg-gradient-to-b from-[#F9F6F0] via-[#F9F6F0] to-[#F3EDE2]/60">
      {/* Subtle organic ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#D1C4E9]/25 blur-3xl -z-10" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Centered Content */}
        <div className="flex flex-col items-center text-center">
          
          {/* Trust Kickers: certified + Google Maps 5.0 */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#512D6D] mb-4 sm:mb-5">
            <span className="flex items-center gap-1.5 uppercase">
              <Award className="w-3.5 h-3.5 text-[#512D6D]" />
              {t.hero.certifiedKicker}
            </span>
            <span className="text-[#512D6D]/40">·</span>
            <a
              href="https://maps.app.goo.gl/LA6mRurL1Dnmb4Vn8"
              target="_blank"
              rel="noopener noreferrer"
              title="Consulter les avis Google Maps de Karina Robart"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#D1C4E9] text-[#512D6D] hover:bg-white shadow-2xs transition-colors"
            >
              <span className="flex text-amber-500 font-bold tracking-tighter text-xs" aria-hidden="true">★★★★★</span>
              <span className="font-bold">{t.hero.googleReviewsBadge}</span>
            </a>
          </div>

          {/* Main Headline - Centered, balanced, serif luxury */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-medium text-[#5D4037] leading-[1.18] tracking-tight mb-4 sm:mb-6 max-w-4xl text-balance">
            {t.hero.title}
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-sm sm:text-lg text-[#5D4037]/85 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl text-balance">
            {t.hero.description}
          </p>

          {/* MOBILE QUICK ACTION PANEL: Immediate 1-tap buttons */}
          <div className="w-full sm:hidden mb-8 bg-white/95 p-3.5 rounded-2xl border border-[#D1C4E9] shadow-xs flex flex-col gap-2.5 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs font-semibold text-[#512D6D] px-1">
              <span>{t.hero.quickAccess}</span>
              <span className="text-[11px] text-[#5D4037]/70 font-normal">{t.hero.hours}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenBooking}
                className="min-h-[46px] w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#512D6D] hover:bg-[#402257] text-[#F9F6F0] rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{t.hero.bookWhatsApp}</span>
              </button>
              <a
                href="tel:+33665566702"
                className="min-h-[46px] w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D1C4E9]/40 hover:bg-[#D1C4E9]/60 border border-[#D1C4E9] text-[#512D6D] rounded-xl text-xs sm:text-sm font-bold active:scale-98 whitespace-nowrap cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#512D6D] shrink-0" />
                <span>{t.hero.callNumber}</span>
              </a>
            </div>
            {onGoToServices && (
              <button
                type="button"
                onClick={onGoToServices}
                className="min-h-[40px] w-full flex items-center justify-center gap-1.5 py-2 text-xs sm:text-[13px] font-semibold text-[#5D4037] hover:text-[#512D6D] border-t border-[#D1C4E9]/50 pt-2"
              >
                <span>{t.hero.viewServices}</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#512D6D]" />
              </button>
            )}
          </div>

          {/* Desktop Action Buttons (Centered) */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 w-full mb-10 sm:mb-12">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold tracking-wide text-[#F9F6F0] bg-[#512D6D] hover:bg-[#402257] active:scale-[0.98] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.hero.bookAppointment}</span>
            </button>
            
            {onGoToServices && (
              <button
                type="button"
                onClick={onGoToServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#5D4037] bg-white hover:bg-[#F3EDE2]/60 border border-[#D1C4E9] rounded-full transition-colors cursor-pointer shadow-2xs"
              >
                <span>{t.hero.exploreMenu}</span>
                <ArrowDown className="w-4 h-4 text-[#512D6D]" />
              </button>
            )}

            <a
              href="tel:+33665566702"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#5D4037] hover:text-[#512D6D] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#512D6D]" />
              <span>06 65 56 67 02</span>
            </a>
          </div>

          {/* 4 Key Reassurance Pillars (Horizontal Grid - Zero Redundancy) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 w-full text-left">
            {/* Card 1: Travel */}
            <div className="flex items-start gap-3 bg-white/85 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-[#512D6D]/10 text-[#512D6D] flex items-center justify-center shrink-0 mt-0.5">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] sm:text-sm font-bold text-[#5D4037]">{t.hero.advantages.freeTravelBold}</p>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 mt-0.5 leading-snug">{t.hero.advantages.freeTravel}</p>
              </div>
            </div>

            {/* Card 2: Chair */}
            <div className="flex items-start gap-3 bg-white/85 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-[#512D6D]/10 text-[#512D6D] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] sm:text-sm font-bold text-[#5D4037]">{t.hero.advantages.massageChairBold}</p>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 mt-0.5 leading-snug">{t.hero.advantages.massageChair}</p>
              </div>
            </div>

            {/* Card 3: Hygiene */}
            <div className="flex items-start gap-3 bg-white/85 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-[#512D6D]/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] sm:text-sm font-bold text-[#5D4037]">{t.hero.advantages.hygieneBold}</p>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 mt-0.5 leading-snug">{t.hero.advantages.hygiene}</p>
              </div>
            </div>

            {/* Card 4: Products */}
            <div className="flex items-start gap-3 bg-white/85 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#D1C4E9]/70 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="w-8 h-8 rounded-xl bg-[#512D6D]/10 text-[#512D6D] flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[13px] sm:text-sm font-bold text-[#5D4037]">{t.hero.advantages.certifiedCareBold}</p>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 mt-0.5 leading-snug">{t.hero.advantages.certifiedCare}</p>
              </div>
            </div>
          </div>

          {/* Partner Brands Ribbon (Centered) */}
          <div className="mt-8 sm:mt-10 pt-4 border-t border-[#D1C4E9]/50 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium text-[#5D4037]/80">
            <span className="font-semibold text-[#512D6D]">Partenaires d'excellence :</span>
            <span>{t.hero.showcase.brandsBar}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
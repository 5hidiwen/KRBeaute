import React from 'react';
import { MessageCircle, Phone, Award, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { KARINA_PHOTO_BASE64 } from '../karinaPhotoData';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  onGoToServices?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onGoToServices }) => {
  const { t } = useLanguage();

  return (
    <section id="accueil" className="scroll-mt-20 sm:scroll-mt-24 relative overflow-hidden pt-6 pb-12 sm:pt-14 sm:pb-24 border-b border-[#D1C4E9]/40 bg-gradient-to-b from-[#F9F6F0] via-[#F9F6F0] to-[#F3EDE2]/60">
      {/* Subtle organic ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-[#D1C4E9]/30 blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Main Content (7 cols on desktop, 12 cols on mobile) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Trust Kickers: certified + Google Maps 5.0 */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-[#512D6D] mb-3">
              <span className="flex items-center gap-1 uppercase">
                <Award className="w-3.5 h-3.5 text-[#512D6D]" />
                {t.hero.certifiedKicker}
              </span>
              <span className="text-[#512D6D]/40">·</span>
              <a
                href="https://maps.app.goo.gl/LA6mRurL1Dnmb4Vn8"
                target="_blank"
                rel="noopener noreferrer"
                title="Consulter les avis Google Maps de Karina Robart"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/80 border border-[#D1C4E9] text-[#512D6D] hover:bg-white transition-colors"
              >
                <span className="flex text-amber-500 font-bold tracking-tighter text-xs" aria-hidden="true">★★★★★</span>
                <span className="font-bold">{t.hero.googleReviewsBadge}</span>
              </a>
            </div>

            {/* Main Headline - balanced for mobile and desktop */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-serif font-medium text-[#5D4037] leading-[1.2] tracking-tight mb-3 sm:mb-6 text-balance">
              {t.hero.title}
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-sm sm:text-lg text-[#5D4037]/85 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl">
              {t.hero.description}
            </p>

            {/* MOBILE QUICK ACTION PANEL: Immediate 1-tap buttons */}
            <div className="w-full sm:hidden mb-6 bg-white/90 p-3.5 rounded-2xl border border-[#D1C4E9] shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#512D6D] px-1">
                <span>{t.hero.quickAccess}</span>
                <span className="text-[11px] text-[#5D4037]/70 font-normal">{t.hero.hours}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onOpenBooking}
                  className="min-h-[46px] w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#512D6D] text-[#F9F6F0] rounded-xl text-xs font-bold shadow-xs active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>{t.hero.bookWhatsApp}</span>
                </button>
                <a
                  href="tel:+33665566702"
                  className="min-h-[46px] w-full flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#D1C4E9]/40 border border-[#D1C4E9] text-[#512D6D] rounded-xl text-xs font-bold active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#512D6D]" />
                  <span>{t.hero.callNumber}</span>
                </a>
              </div>
              {onGoToServices && (
                <button
                  type="button"
                  onClick={onGoToServices}
                  className="min-h-[40px] w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#5D4037] hover:text-[#512D6D] border-t border-[#D1C4E9]/50 pt-2"
                >
                  <span>{t.hero.viewServices}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#512D6D]" />
                </button>
              )}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#F9F6F0] bg-[#512D6D] hover:bg-[#402257] active:scale-[0.98] rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.hero.bookAppointment}</span>
              </button>
              
              {onGoToServices && (
                <button
                  type="button"
                  onClick={onGoToServices}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#5D4037] bg-[#D1C4E9]/35 hover:bg-[#D1C4E9]/60 border border-[#D1C4E9] rounded-full transition-colors cursor-pointer"
                >
                  <span>{t.hero.exploreMenu}</span>
                  <ArrowRight className="w-4 h-4 text-[#512D6D]" />
                </button>
              )}

              <a
                href="tel:+33665566702"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-[#5D4037] hover:text-[#512D6D] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#512D6D]" />
                <span>06 65 56 67 02</span>
              </a>
            </div>

            {/* 3 Key Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 w-full text-xs sm:text-sm text-[#5D4037]">
              <div className="flex items-center sm:items-start gap-2 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-[#D1C4E9]/60">
                <CheckCircle2 className="w-4 h-4 text-[#512D6D] shrink-0" />
                <span className="leading-tight">
                  <strong>{t.hero.advantages.freeTravelBold}</strong> {t.hero.advantages.freeTravel}
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-2 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-[#D1C4E9]/60">
                <CheckCircle2 className="w-4 h-4 text-[#512D6D] shrink-0" />
                <span className="leading-tight">
                  <strong>{t.hero.advantages.massageChairBold}</strong> {t.hero.advantages.massageChair}
                </span>
              </div>
              <div className="flex items-center sm:items-start gap-2 bg-white/70 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-[#D1C4E9]/60">
                <CheckCircle2 className="w-4 h-4 text-[#512D6D] shrink-0" />
                <span className="leading-tight">
                  <strong>{t.hero.advantages.certifiedCareBold}</strong> {t.hero.advantages.certifiedCare}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase (Visible on both mobile & desktop) */}
          <div className="w-full lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl p-3.5 sm:p-4 bg-gradient-to-br from-[#D1C4E9]/60 via-[#F9F6F0] to-[#D1C4E9]/40 border border-[#D1C4E9] shadow-lg sm:shadow-xl">
                
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#EAE2F2] via-[#F4EFF8] to-[#E5DBEE] flex flex-col justify-between p-5 sm:p-8 border border-white/80">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-[#512D6D] shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#512D6D]" />
                      <span>{t.hero.showcase.tag}</span>
                    </div>
                    <span className="text-xs font-medium text-[#5D4037]/70 bg-white/70 px-2.5 py-1 rounded-full">
                      {t.hero.showcase.city}
                    </span>
                  </div>

                  <div className="my-auto py-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#512D6D]/10 flex items-center justify-center border border-[#512D6D]/20">
                      <Sparkles className="w-8 h-8 text-[#512D6D]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#5D4037] mb-1">
                      {t.hero.showcase.serenityTitle}
                    </h3>
                    <p className="text-xs text-[#5D4037]/80 max-w-xs mx-auto">
                      {t.hero.showcase.serenityDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#512D6D]/15 flex items-center justify-between text-[11px] font-medium text-[#5D4037]">
                    <span>Nu Skin</span>
                    <span>·</span>
                    <span>Dr. Renaud</span>
                    <span>·</span>
                    <span>Farmasi</span>
                    <span>·</span>
                    <span>House of Peau</span>
                  </div>
                </div>

                <div className="mt-4 bg-white/95 rounded-2xl p-4 border border-[#D1C4E9] shadow-md flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#512D6D]/20 shadow-xs shrink-0">
                    <img 
                      src={KARINA_PHOTO_BASE64} 
                      alt="Karina Robart" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-xs text-[#5D4037]">
                    <p className="font-semibold text-[#512D6D]">{t.hero.showcase.authorRole}</p>
                    <p className="text-[#5D4037]/80 mt-0.5">
                      {t.hero.showcase.quote}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

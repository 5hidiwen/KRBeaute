import React, { useState, useRef } from 'react';
import { ExternalLink, ShieldCheck, HeartHandshake, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const HomeTestimonials: React.FC = () => {
  const { t } = useLanguage();
  const { testimonials } = t.home;
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const pillarsSliderRef = useRef<HTMLDivElement>(null);

  const handlePillarsScroll = () => {
    if (pillarsSliderRef.current) {
      const scrollLeft = pillarsSliderRef.current.scrollLeft;
      const cardWidth = pillarsSliderRef.current.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / cardWidth);
      setActivePillarIndex(Math.min(Math.max(index, 0), 2));
    }
  };

  const scrollToPillar = (idx: number) => {
    if (pillarsSliderRef.current) {
      const card = pillarsSliderRef.current.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActivePillarIndex(idx);
    }
  };

  return (
    <section id="avis" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-[#F9F6F0] border-b border-[#D1C4E9]/40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-2">
            {testimonials.kicker}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#5D4037] tracking-tight mb-3">
            {testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037]/80 leading-relaxed">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Central Authentic Google Business Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D1C4E9] shadow-sm text-center max-w-2xl mx-auto mb-10">
          
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#F9F6F0] mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>

          <p className="text-sm sm:text-base font-semibold text-[#5D4037] mb-2 max-w-lg mx-auto">
            {testimonials.googleRatingSub}
          </p>

          <p className="text-xs sm:text-sm text-[#5D4037]/75 max-w-md mx-auto mb-6 leading-relaxed">
            {testimonials.transparencyNotice}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://maps.app.goo.gl/LA6mRurL1Dnmb4Vn8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-[#512D6D] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#402257] active:scale-98 transition-all"
              title="Consulter les avis réels en direct sur Google Maps"
            >
              <span>{testimonials.openGoogleBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="https://maps.app.goo.gl/LA6mRurL1Dnmb4Vn8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[46px] rounded-full bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] text-xs sm:text-sm font-semibold transition-all active:scale-98"
              title="Déposer un avis sur Google Maps"
            >
              <span>{testimonials.leaveReviewBtn}</span>
            </a>
          </div>

        </div>

        {/* 3 Real Service Commitments: Horizontal Snap Slider on Mobile (< md), Grid on Desktop (md+) */}
        <div 
          ref={pillarsSliderRef}
          onScroll={handlePillarsScroll}
          className="flex md:grid md:grid-cols-3 gap-3.5 sm:gap-6 text-center overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="w-[78vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white p-5 rounded-2xl border border-[#D1C4E9]/60 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#5D4037] mb-1">
                {testimonials.pillar1Title}
              </h3>
              <p className="text-xs text-[#5D4037]/75 leading-relaxed">
                {testimonials.pillar1Desc}
              </p>
            </div>
          </div>

          <div className="w-[78vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white p-5 rounded-2xl border border-[#D1C4E9]/60 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mx-auto mb-3">
                <HeartHandshake className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#5D4037] mb-1">
                {testimonials.pillar2Title}
              </h3>
              <p className="text-xs text-[#5D4037]/75 leading-relaxed">
                {testimonials.pillar2Desc}
              </p>
            </div>
          </div>

          <div className="w-[78vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-white p-5 rounded-2xl border border-[#D1C4E9]/60 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#D1C4E9]/30 text-[#512D6D] flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#5D4037] mb-1">
                {testimonials.pillar3Title}
              </h3>
              <p className="text-xs text-[#5D4037]/75 leading-relaxed">
                {testimonials.pillar3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Pagination Dots (< md) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToPillar(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activePillarIndex === idx
                  ? 'w-6 bg-[#512D6D]'
                  : 'w-2 bg-[#D1C4E9] hover:bg-[#512D6D]/40'
              }`}
              aria-label={`Engagement ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

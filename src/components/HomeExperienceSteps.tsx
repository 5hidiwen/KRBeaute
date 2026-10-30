import React, { useState, useRef } from 'react';
import { MessageCircle, HeartHandshake, ArrowRight, ArrowDown, Heart, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HomeExperienceStepsProps {
  onOpenBooking: () => void;
  onGoToServices?: () => void;
}

export const HomeExperienceSteps: React.FC<HomeExperienceStepsProps> = ({ 
  onOpenBooking, 
  onGoToServices 
}) => {
  const { t } = useLanguage();
  const { experience } = t.home;
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = sliderRef.current.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveStepIndex(Math.min(Math.max(index, 0), 2));
    }
  };

  const scrollToStep = (idx: number) => {
    if (sliderRef.current) {
      const card = sliderRef.current.children[idx] as HTMLElement;
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveStepIndex(idx);
    }
  };

  const steps = [
    {
      num: experience.step1Num,
      title: experience.step1Title,
      desc: experience.step1Desc,
      icon: <MessageCircle className="w-5 h-5 text-[#512D6D]" />,
      badge: 'Étape 1',
    },
    {
      num: experience.step2Num,
      title: experience.step2Title,
      desc: experience.step2Desc,
      icon: <Award className="w-5 h-5 text-[#512D6D]" />,
      badge: 'Étape 2',
    },
    {
      num: experience.step3Num,
      title: experience.step3Title,
      desc: experience.step3Desc,
      icon: <HeartHandshake className="w-5 h-5 text-[#512D6D]" />,
      badge: 'Étape 3',
    },
  ];

  return (
    <section id="experience" className="scroll-mt-20 sm:scroll-mt-24 py-12 sm:py-20 bg-white border-b border-[#D1C4E9]/40 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div 
        aria-hidden="true" 
        className="kr-ambient-float pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#D1C4E9]/25 blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="kr-reveal text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-2">
            {experience.kicker}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#5D4037] tracking-tight mb-3">
            {experience.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037]/80 leading-relaxed">
            {experience.subtitle}
          </p>
        </div>

        {/* 3 Steps: Horizontal Snap Slider on Mobile (< md), Grid on Desktop (md+) */}
        <div 
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 relative"
        >
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              style={{ '--reveal-delay': `${idx * 110}ms` } as React.CSSProperties}
              className="kr-reveal kr-card-nacre w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink relative flex flex-col justify-between bg-gradient-to-b from-[#F9F6F0] to-[#F3EDE2]/60 p-6 sm:p-7 rounded-3xl border border-[#D1C4E9]/75 group"
            >
              <div>
                {/* Step indicator top bar */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-[#512D6D]/25 group-hover:text-[#512D6D]/40 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#D1C4E9] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title & Description */}
                <h3 className="font-serif text-base sm:text-xl font-bold text-[#5D4037] mb-2 sm:mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress connector line on desktop */}
              {idx < steps.length - 1 && (
                <div 
                  aria-hidden="true" 
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-[#D1C4E9] to-transparent z-10 pointer-events-none" 
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Swipe Pagination Dots (< md) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              type="button"
              onClick={() => scrollToStep(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeStepIndex === idx
                  ? 'w-6 bg-[#512D6D]'
                  : 'w-2 bg-[#D1C4E9] hover:bg-[#512D6D]/40'
              }`}
              aria-label={`Étape ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Fast Action Prompt: Dual Action (Discover Services + Book) */}
        <div className="kr-reveal mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {onGoToServices && (
            <button
              type="button"
              onClick={onGoToServices}
              className="kr-btn-silk group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#512D6D] text-[#F9F6F0] hover:bg-[#402257] active:scale-98 text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 text-[#F9F6F0] transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>{experience.viewMenuBtn}</span>
            </button>
          )}
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-white hover:bg-[#F9F6F0] border border-[#D1C4E9] text-[#512D6D] active:scale-98 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.hero.bookAppointment}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

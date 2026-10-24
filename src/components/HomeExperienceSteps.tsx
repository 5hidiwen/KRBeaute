import React from 'react';
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
        className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#D1C4E9]/20 blur-3xl -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1C4E9]/35 border border-[#D1C4E9] text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#512D6D] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#512D6D]" />
            {experience.kicker}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#5D4037] tracking-tight mb-3">
            {experience.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037]/80 leading-relaxed">
            {experience.subtitle}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, idx) => (
            <div 
              key={step.num}
              className="relative flex flex-col bg-gradient-to-b from-[#F9F6F0] to-[#F3EDE2]/50 p-6 sm:p-7 rounded-3xl border border-[#D1C4E9]/70 shadow-xs hover:shadow-md transition-all group"
            >
              {/* Step indicator top bar */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#512D6D]/25 group-hover:text-[#512D6D]/40 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#D1C4E9] shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  {step.icon}
                </div>
              </div>

              {/* Step Title & Description */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-2.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed flex-1">
                {step.desc}
              </p>

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

        {/* Bottom Fast Action Prompt: Dual Action (Discover Services + Book) */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {onGoToServices && (
            <button
              type="button"
              onClick={onGoToServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#512D6D] text-[#F9F6F0] hover:bg-[#402257] active:scale-98 text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <ArrowDown className="w-4 h-4 text-[#F9F6F0]" />
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

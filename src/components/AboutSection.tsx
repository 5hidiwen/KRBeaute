import React from 'react';
import { Award, Heart, Sparkles, ShieldCheck, UserCheck, Check } from 'lucide-react';
import { KARINA_PHOTO_BASE64 } from '../karinaPhotoData';
import { useLanguage } from '../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="a-propos" className="scroll-mt-20 sm:scroll-mt-24 py-8 sm:py-20 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Column: Photo & Credentials Badge (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none">
              
              {/* Photo Frame Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAE2F2] via-[#F4EFF8] to-[#D1C4E9] border-2 border-[#D1C4E9] shadow-lg p-2.5 sm:p-3">
                
                {/* Photo Display Area (Emplacement carré 1:1) */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#2B1B36] shadow-inner">
                  <img 
                    src={KARINA_PHOTO_BASE64} 
                    alt={t.about.photoAlt}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/Karina.jpg')) {
                        target.src = '/Karina.jpg';
                      }
                    }}
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Identification de la Praticienne sous la photo */}
                <div className="mt-2.5 p-3.5 bg-white rounded-2xl border border-[#D1C4E9] shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-serif text-lg sm:text-xl font-bold text-[#512D6D] tracking-tight">
                      Karina Robart
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D1C4E9]/60 text-[#512D6D] rounded-full text-[10px] font-bold">
                      <Award className="w-3 h-3 text-[#512D6D]" />
                      <span>{t.about.badgeCap}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5D4037]/90 font-medium">
                    {t.about.roleSubtitle}
                  </p>
                </div>

                {/* Official Diploma Badge */}
                <div className="mt-2 bg-white p-3 rounded-xl border border-[#D1C4E9] flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-[#5D4037]">
                      <p className="font-bold text-[#512D6D]">{t.about.certTitle}</p>
                      <p className="text-[11px] text-[#5D4037]/80">
                        {t.about.certSub}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <Check className="w-3 h-3" />
                    <span>{t.about.verified}</span>
                  </span>
                </div>

                {/* 3 Key Credentials / Numbers */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2">
                  <div className="bg-white p-2 rounded-xl border border-[#D1C4E9] text-center shadow-2xs">
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#512D6D]">{t.about.stat1Val}</p>
                    <p className="text-[9px] sm:text-[10px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat1Label}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#D1C4E9] text-center shadow-2xs">
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#512D6D]">{t.about.stat2Val}</p>
                    <p className="text-[9px] sm:text-[10px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat2Label}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#D1C4E9] text-center shadow-2xs">
                    <p className="font-serif text-xs sm:text-sm font-bold text-amber-600 flex items-center justify-center gap-0.5">
                      <span aria-hidden="true">★</span>
                      <span>{t.about.stat3Val}</span>
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat3Label}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Philosophy & Bio (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#512D6D] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>{t.about.kicker}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-4">
              {t.about.title}
            </h2>

            <div className="space-y-3 text-xs sm:text-base text-[#5D4037]/85 leading-relaxed font-normal">
              <p>
                {t.about.paragraph1}
              </p>
              <p>
                {t.about.paragraph2}
              </p>
              <p>
                {t.about.paragraph3}
              </p>

              {/* Personal Signature Note */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-[#D1C4E9]/70 italic text-xs sm:text-sm text-[#512D6D] font-medium leading-relaxed mt-2 shadow-2xs">
                {t.about.signatureQuote}
              </div>
            </div>

            {/* Philosophy Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 w-full">
              
              <div className="p-3.5 bg-white rounded-2xl border border-[#D1C4E9] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.kindnessTitle}
                </h3>
                <p className="text-[11px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.kindnessDesc}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#D1C4E9] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.hygieneTitle}
                </h3>
                <p className="text-[11px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.hygieneDesc}
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-[#D1C4E9] shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.privacyTitle}
                </h3>
                <p className="text-[11px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.privacyDesc}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

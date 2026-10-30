import React from 'react';
import { Award, Heart, Sparkles, ShieldCheck, UserCheck, Check, Globe, MessageCircle } from 'lucide-react';
import { KARINA_PHOTO_BASE64 } from '../karinaPhotoData';
import { useLanguage } from '../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  const workshopsWhatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(t.about.workshopsBox.whatsappMessage)}`;

  return (
    <section id="a-propos" className="scroll-mt-20 sm:scroll-mt-24 py-8 sm:py-20 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Column: Photo & Credentials Badge (5 cols) */}
          <div className="kr-reveal lg:col-span-5">
            <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none">
              
              {/* Photo Frame Container */}
              <div className="kr-card-nacre relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#EAE2F2] via-[#F4EFF8] to-[#D1C4E9] border-2 border-[#D1C4E9] shadow-lg p-2.5 sm:p-3">
                
                {/* Photo Display Area (Emplacement carré 1:1) */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#2B1B36] shadow-inner group">
                  <img 
                    src={KARINA_PHOTO_BASE64} 
                    alt={t.about.photoAlt}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/Karina.jpg')) {
                        target.src = '/Karina.jpg';
                      }
                    }}
                    className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
                    <p className="text-[10px] sm:text-[11px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat1Label}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#D1C4E9] text-center shadow-2xs">
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#512D6D]">{t.about.stat2Val}</p>
                    <p className="text-[10px] sm:text-[11px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat2Label}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#D1C4E9] text-center shadow-2xs">
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#512D6D]">{t.about.stat3Val}</p>
                    <p className="text-[10px] sm:text-[11px] text-[#5D4037]/75 font-medium leading-tight mt-0.5">{t.about.stat3Label}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Philosophy & Bio (7 cols) */}
          <div
            style={{ '--reveal-delay': '100ms' } as React.CSSProperties}
            className="kr-reveal lg:col-span-7 flex flex-col items-start"
          >
            
            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-2">
              {t.about.kicker}
            </span>

            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-4">
              {t.about.title}
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-[#5D4037]/85 leading-relaxed font-normal">
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
              
              <div className="kr-card-nacre p-3.5 bg-white rounded-2xl border border-[#D1C4E9]">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.kindnessTitle}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.kindnessDesc}
                </p>
              </div>

              <div className="kr-card-nacre p-3.5 bg-white rounded-2xl border border-[#D1C4E9]">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.hygieneTitle}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.hygieneDesc}
                </p>
              </div>

              <div className="kr-card-nacre p-3.5 bg-white rounded-2xl border border-[#D1C4E9]">
                <div className="w-7 h-7 rounded-lg bg-[#D1C4E9]/50 flex items-center justify-center text-[#512D6D] mb-2">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#5D4037] mb-0.5">
                  {t.about.pillars.privacyTitle}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#5D4037]/80 leading-relaxed">
                  {t.about.pillars.privacyDesc}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Dedicated Online Workshops Banner (Visible uniquement pour la version espagnole) */}
        {language === 'es' && (
          <div className="kr-reveal kr-card-nacre mt-8 sm:mt-12 bg-gradient-to-br from-white via-[#F9F6F0] to-[#EAE2F2]/70 rounded-3xl border border-[#D1C4E9] p-5 sm:p-7">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#EAE2F2]" />
                </div>
                <div className="space-y-1 max-w-2xl">
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B2651] mb-0.5">
                    {t.about.workshopsBox.badge}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#512D6D]">
                    {t.about.workshopsBox.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed">
                    {t.about.workshopsBox.desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-start md:self-center">
                <a
                  href={workshopsWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kr-btn-silk inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{t.about.workshopsBox.cta}</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

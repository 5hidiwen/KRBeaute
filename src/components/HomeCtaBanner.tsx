import React from 'react';
import { MessageCircle, Phone, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HomeCtaBannerProps {
  onOpenBooking: () => void;
}

export const HomeCtaBanner: React.FC<HomeCtaBannerProps> = ({ onOpenBooking }) => {
  const { t, language } = useLanguage();
  const { ctaBanner } = t.home;

  const isEs = language === 'es';
  const whatsAppGreeting = isEs
    ? '¡Hola Karina! Quiero agendar un tratamiento a domicilio...'
    : 'Bonjour Karina, je souhaite réserver un soin à domicile...';

  const whatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(whatsAppGreeting)}`;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[#512D6D] via-[#402257] to-[#2B1B36] text-[#F9F6F0] relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D1C4E9]/15 blur-3xl -z-10" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl -z-10" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Availability */}
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300/95 tracking-wide mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{ctaBanner.hours}</span>
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight mb-3 text-balance">
          {ctaBanner.title}
        </h2>
        <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed mb-8">
          {ctaBanner.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 min-h-[48px] rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{ctaBanner.whatsappBtn}</span>
          </a>

          <a
            href="tel:+33665566702"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 min-h-[48px] rounded-full bg-white/15 hover:bg-white/25 active:scale-98 border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all"
          >
            <Phone className="w-4 h-4 text-[#D1C4E9]" />
            <span>{ctaBanner.callBtn}</span>
          </a>

        </div>

      </div>
    </section>
  );
};

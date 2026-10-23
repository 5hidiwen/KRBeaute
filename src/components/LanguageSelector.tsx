import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface LanguageSelectorProps {
  className?: string;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '', compact = false }) => {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    if (language !== lang) {
      setLanguage(lang);
    }
  };

  return (
    <div
      role="group"
      aria-label={language === 'fr' ? 'Sélection de la langue' : 'Selección de idioma'}
      className={`inline-flex items-center p-0.5 rounded-full bg-white/90 border border-[#D1C4E9] shadow-2xs ${className}`}
    >
      {/* Français */}
      <button
        type="button"
        onClick={() => handleSelect('fr')}
        aria-pressed={language === 'fr'}
        className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
          language === 'fr'
            ? 'bg-[#512D6D] text-white shadow-2xs font-bold'
            : 'text-[#5D4037] hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
        }`}
        title="Passer en Français"
      >
        <span className="text-xs sm:text-sm leading-none" role="img" aria-label="France">🇫🇷</span>
        {compact ? (
          <span>FR</span>
        ) : (
          <>
            <span className="hidden md:inline">Français</span>
            <span className="md:hidden">FR</span>
          </>
        )}
      </button>

      {/* Español */}
      <button
        type="button"
        onClick={() => handleSelect('es')}
        aria-pressed={language === 'es'}
        className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
          language === 'es'
            ? 'bg-[#512D6D] text-white shadow-2xs font-bold'
            : 'text-[#5D4037] hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
        }`}
        title="Cambiar a Español"
      >
        <span className="text-xs sm:text-sm leading-none" role="img" aria-label="España">🇪🇸</span>
        {compact ? (
          <span>ES</span>
        ) : (
          <>
            <span className="hidden md:inline">Español</span>
            <span className="md:hidden">ES</span>
          </>
        )}
      </button>
    </div>
  );
};

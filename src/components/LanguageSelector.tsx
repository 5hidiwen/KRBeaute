import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={language === 'fr' ? 'Sélection de la langue' : 'Selección de idioma'}
      className={`inline-flex items-center p-0.5 rounded-full bg-white/90 border border-[#D1C4E9]/80 shadow-2xs ${className}`}
    >
      {/* Français */}
      <button
        type="button"
        onClick={() => setLanguage('fr')}
        aria-pressed={language === 'fr'}
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all cursor-pointer select-none active:scale-95 ${
          language === 'fr'
            ? 'bg-[#512D6D] text-white shadow-2xs'
            : 'text-[#5D4037]/75 hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
        }`}
        title="Passer en Français"
      >
        FR
      </button>

      {/* Español (ES-MX) */}
      <button
        type="button"
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wider transition-all cursor-pointer select-none active:scale-95 ${
          language === 'es'
            ? 'bg-[#512D6D] text-white shadow-2xs'
            : 'text-[#5D4037]/75 hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
        }`}
        title="Cambiar a Español (Latinoamérica / México)"
      >
        ES
      </button>
    </div>
  );
};

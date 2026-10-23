import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';
import { LegalTab } from './LegalModal';
import { NavTab } from './Navbar';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
  onOpenBooking: () => void;
  onSelectTab?: (tab: NavTab) => void;
}

// Crisp Threads SVG icon
const ThreadsIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.095 5.467 0 12.186 0c6.64 0 12.016 5.305 12.016 11.814 0 3.755-1.745 6.945-4.708 8.784-1.127.7-2.457 1.096-3.87 1.134-2.887.08-4.996-1.503-5.263-4.004h-.056c-.63 1.34-1.688 2.37-3.037 2.949-1.259.54-2.657.57-3.93.09-2.28-.86-3.64-3.04-3.32-5.32.34-2.43 2.37-4.22 4.93-4.36 1.17-.06 2.32.17 3.32.67.92.46 1.63 1.15 2.06 2.02v-3.79c0-1.76-1.37-3.13-3.13-3.13-1.63 0-2.99 1.22-3.11 2.84h-2.12c.14-2.77 2.44-4.96 5.23-4.96 2.9 0 5.25 2.35 5.25 5.25v7.62c0 1.28.98 2.31 2.26 2.31 1.25 0 2.26-1.01 2.26-2.26 0-5.18-4.22-9.4-9.4-9.4-5.18 0-9.4 4.22-9.4 9.4 0 5.18 4.22 9.4 9.4 9.4 2.82 0 5.43-1.26 7.18-3.37l1.55 1.55C18.42 22.42 15.43 24 12.186 24zm-3.23-8.86c-.95 0-1.84.42-2.38 1.13-.53.7-.63 1.62-.27 2.45.36.83 1.16 1.34 2.08 1.34 1.35 0 2.48-1.07 2.57-2.42.06-.85-.25-1.66-.85-2.2-.42-.38-.97-.59-1.15-.3z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#F9F6F0] border-t border-[#D1C4E9]/60 py-6 text-[#5D4037]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek, lightweight single-tier bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-[#D1C4E9]/40">
          
          {/* Identity & Language switch */}
          <div className="flex items-center gap-3">
            <span className="font-serif text-base font-bold text-[#512D6D]">
              Karina Robart
            </span>
            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>
            <LanguageSelector compact />
          </div>

          {/* Quick Contacts & Socials */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 text-xs text-[#5D4037]">
            <span className="inline-flex items-center gap-1.5">
              <a 
                href="tel:+33665566702" 
                className="inline-flex items-center gap-1.5 font-semibold text-[#512D6D] hover:underline"
                title="Appeler Karina"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>06 65 56 67 02</span>
              </a>
              <span className="text-[#5D4037]/80 font-normal">{t.footer.appointmentOnly}</span>
            </span>
            
            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>

            <a 
              href="mailto:karinarobart@krbeaute.com" 
              className="inline-flex items-center gap-1.5 hover:text-[#512D6D] transition-colors"
              title="Envoyer un email"
            >
              <Mail className="w-3.5 h-3.5 text-[#512D6D]" />
              <span>karinarobart@krbeaute.com</span>
            </a>

            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>

            <a 
              href="https://www.instagram.com/karinarobart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#512D6D] transition-colors"
              title="Instagram @karinarobart"
            >
              <Instagram className="w-3.5 h-3.5 text-[#512D6D]" />
              <span>@karinarobart</span>
            </a>

            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>

            <a 
              href="https://www.threads.net/@karinarobart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#512D6D] transition-colors"
              title="Threads Karinarobart"
            >
              <ThreadsIcon className="w-3.5 h-3.5 text-[#512D6D]" />
              <span>Threads</span>
            </a>

            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>

            <a 
              href="https://www.fr.farmasi.com/karyrobart"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#512D6D] hover:underline"
              title="Boutique Farmasi Karina Robart"
            >
              <span>{t.footer.farmasiShop}</span>
            </a>
          </div>

        </div>

        {/* Minimal Legal Links & Copyright */}
        <div className="pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-[#5D4037]/75">
          <div>
            © {new Date().getFullYear()} Karina Robart {t.footer.copyrightDiploma}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenLegal('mentions')}
              className="hover:text-[#512D6D] transition-colors cursor-pointer"
            >
              {t.footer.mentions}
            </button>
            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('cgv')}
              className="hover:text-[#512D6D] transition-colors cursor-pointer"
            >
              {t.footer.cgv}
            </button>
            <span className="text-[#D1C4E9]" aria-hidden="true">·</span>
            <button
              onClick={() => onOpenLegal('rgpd')}
              className="hover:text-[#512D6D] transition-colors cursor-pointer"
            >
              {t.footer.rgpd}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

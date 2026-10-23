import React from 'react';
import { Phone, MessageCircle, Home, Sparkles, MapPin, HelpCircle, Award, Cpu, Mail } from 'lucide-react';

export type NavTab = 'accueil' | 'soins' | 'marques' | 'a-propos' | 'secteur' | 'faq' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

interface NavLinkItem {
  id: NavTab;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, onOpenBooking }) => {
  const navLinks: NavLinkItem[] = [
    { id: 'accueil', label: 'Accueil', shortLabel: 'Accueil', icon: <Home className="w-4 h-4" /> },
    { id: 'soins', label: 'Soins & Tarifs', shortLabel: 'Soins & Tarifs', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'secteur', label: "Rayon d'action (7 km offert)", shortLabel: 'Rayon 7 km', icon: <MapPin className="w-4 h-4" /> },
    { id: 'marques', label: 'Technologies & Marques', shortLabel: 'Technologies', icon: <Cpu className="w-4 h-4" /> },
    { id: 'a-propos', label: 'À Propos (CAP)', shortLabel: 'À Propos', icon: <Award className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', shortLabel: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Réservation', shortLabel: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#D1C4E9]/60 shadow-xs">
        
        {/* Top Tier: Wordmark & Direct Actions */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-3">
          
          {/* Brand Wordmark */}
          <button 
            onClick={() => handleTabClick('accueil')}
            className="flex items-center gap-2 sm:gap-2.5 font-serif tracking-tight text-[#512D6D] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center font-serif text-xs sm:text-sm font-bold tracking-tight shadow-xs">
              KR
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span className="text-sm sm:text-lg font-bold leading-tight">Karina Robart</span>
              <span className="text-[11px] sm:text-xs text-[#5D4037]/80 font-sans hidden xs:inline">
                · Esthéticienne à Domicile
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (Large screens) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[#5D4037]">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#512D6D] text-[#F9F6F0] font-semibold shadow-xs'
                      : 'text-[#5D4037] hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>


          {/* Mobile Top Right Fast Action Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            <a
              href="tel:+33665566702"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-[#D1C4E9] text-[#512D6D] text-xs font-semibold shadow-2xs active:scale-95"
              aria-label="Appeler directement au 06 65 56 67 02"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Appeler</span>
            </a>
            <a
              href="https://wa.me/33665566702?text=Bonjour%20Karina,%20je%20souhaite%20r%C3%A9server%20un%20soin%20%C3%A0%20domicile..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#512D6D] text-white text-xs font-bold shadow-2xs active:scale-95"
              aria-label="Contacter sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Mobile Horizontal Scrollable Tab Bar - Instant 1-tap switching without burger menu */}
        <div className="lg:hidden border-t border-[#D1C4E9]/50 bg-[#F4EFE6]/70 px-2 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#512D6D] text-white font-bold shadow-xs'
                    : 'bg-white/80 text-[#5D4037] border border-[#D1C4E9]/60 active:bg-[#D1C4E9]/40'
                }`}
              >
                {link.icon}
                <span>{link.shortLabel}</span>
              </button>
            );
          })}
        </div>

      </header>

      {/* MOBILE STICKY BOTTOM DIRECT CONTACT BAR (Instant 1-Tap Access to Essentials) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F9F6F0]/95 backdrop-blur-md border-t border-[#D1C4E9] shadow-xl px-3 py-2 flex items-center gap-2">
        <a
          href="tel:+33665566702"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-[#D1C4E9] text-[#512D6D] rounded-xl text-xs font-bold shadow-2xs active:scale-98"
        >
          <Phone className="w-4 h-4 text-[#512D6D]" />
          <span>06 65 56 67 02</span>
        </a>
        <a
          href="https://wa.me/33665566702?text=Bonjour%20Karina,%20je%20souhaite%20r%C3%A9server%20un%20soin%20%C3%A0%20domicile..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.3] min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-[#512D6D] text-white rounded-xl text-xs font-bold shadow-md active:scale-98"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Réserver (WhatsApp)</span>
        </a>
      </div>
    </>
  );
};

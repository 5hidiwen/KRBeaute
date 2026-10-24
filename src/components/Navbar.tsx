import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Home, Sparkles, MapPin, HelpCircle, Award, Cpu, Mail, Menu, X, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export type NavTab = 'accueil' | 'soins' | 'marques' | 'a-propos' | 'secteur' | 'faq' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

interface SecondaryNavItem {
  id: NavTab;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { t, language } = useLanguage();
  const [plusSheetOpen, setPlusSheetOpen] = useState(false);

  const isEs = language === 'es';

  // Prevent background scroll when mobile Plus bottom sheet is open
  useEffect(() => {
    if (plusSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [plusSheetOpen]);

  // Desktop Primary Links (≥ lg) - Synchronized with One-Page flow, with dedicated FAQ at the end
  const primaryLinks: { id: NavTab; label: string }[] = [
    { id: 'soins', label: isEs ? 'Tratamientos & Tarifas' : 'Soins & Tarifs' },
    { id: 'marques', label: isEs ? 'Tecnologías' : 'Technologies & Marques' },
    { id: 'a-propos', label: isEs ? 'Sobre Karina' : 'À Propos' },
    { id: 'secteur', label: isEs ? 'Zona (7 km)' : 'Secteur (7 km)' },
    { id: 'contact', label: isEs ? 'Contacto' : 'Contact' },
    { id: 'faq', label: isEs ? 'FAQ' : 'FAQ' },
  ];

  // Secondary items displayed inside the "Plus" Bottom Sheet on mobile/tablet
  const secondaryNavItems: SecondaryNavItem[] = [
    {
      id: 'marques',
      label: isEs ? 'Tecnologías y Marcas' : 'Technologies & Grandes Maisons',
      sub: isEs ? 'Nu Skin, Dr. Renaud, Farmasi, LED' : 'Nu Skin, Dr. Renaud Paris, Farmasi, LED',
      icon: <Cpu className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'a-propos',
      label: isEs ? 'Sobre Karina Robart' : 'À Propos de Karina Robart',
      sub: isEs ? 'Esteticista certificada con título oficial' : "Diplômée d'État & savoir-faire",
      icon: <Award className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'faq',
      label: isEs ? 'Preguntas Frecuentes & FAQ' : 'Conditions & FAQ',
      sub: isEs ? 'Organización, higiene y reservaciones' : 'Réservation, hygiène & modalités',
      icon: <HelpCircle className="w-4 h-4 text-[#512D6D]" />
    },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setPlusSheetOpen(false);
  };

  const whatsAppGreeting = isEs
    ? 'Hola Karina, deseo agendar un tratamiento a domicilio...'
    : 'Bonjour Karina, je souhaite réserver un soin à domicile...';

  const whatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(whatsAppGreeting)}`;

  // Whether a secondary tab (displayed inside "Plus" sheet) is currently active
  const isSecondaryTabActive = activeTab === 'marques' || activeTab === 'a-propos' || activeTab === 'faq';

  return (
    <>
      {/* =========================================================================
          1. TOP FLOATING NAVBAR (Desktop full menu + Mobile/Tablet streamlined)
         ========================================================================= */}
      <div className="sticky top-2 sm:top-3.5 z-40 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all">
        <header className="bg-[#F9F6F0]/95 backdrop-blur-md border border-[#D1C4E9]/80 rounded-full shadow-xs hover:shadow-sm transition-all px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Mark (Left) */}
          <button 
            type="button"
            onClick={() => handleTabClick('accueil')}
            className="flex items-center gap-2 text-[#512D6D] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none rounded-full"
            title="Karina Robart - Accueil"
            aria-label="Karina Robart - Retour à l'accueil"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center font-serif text-xs font-bold tracking-tight shadow-2xs group-hover:scale-105 transition-transform">
              KR
            </span>
            <div className="text-left">
              <span className="font-serif text-sm sm:text-base font-bold text-[#512D6D] tracking-tight block leading-tight">
                Karina Robart
              </span>
              <span className="text-[10px] text-[#5D4037]/75 hidden xs:block sm:hidden leading-none">
                {t.nav.brandRole}
              </span>
            </div>
          </button>

          {/* Desktop Primary Links (Center) - Visible on lg+ */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Navigation principale">
            {primaryLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleTabClick(link.id)}
                  className={`px-2.5 xl:px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#512D6D] text-white shadow-2xs font-semibold'
                      : 'text-[#5D4037] hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Block (Language, Phone, WhatsApp) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher [ FR | ES ] */}
            <LanguageSelector />

            {/* Direct Phone Call Button (Mobile & Tablet fast access) */}
            <a
              href="tel:+33665566702"
              className="lg:hidden min-h-[36px] min-w-[36px] p-2 rounded-full bg-white/90 hover:bg-white border border-[#D1C4E9]/80 text-[#512D6D] flex items-center justify-center active:scale-95 transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
              aria-label={t.nav.callAria}
              title={t.nav.callAria}
            >
              <Phone className="w-3.5 h-3.5 text-[#512D6D]" />
            </a>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-95 text-white text-xs font-semibold shadow-2xs transition-all focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
              aria-label={t.nav.whatsappAria}
              title={t.nav.whatsappAria}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">{isEs ? 'Agendar' : 'Réserver'}</span>
            </a>
          </div>

        </header>
      </div>

      {/* =========================================================================
          2. MOBILE & TABLET BOTTOM TAB BAR (Thumb Zone - Native App Style)
         ========================================================================= */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-md border-t border-[#D1C4E9]/80 shadow-[0_-4px_25px_rgba(81,45,109,0.08)] px-1 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
        aria-label="Navigation mobile"
      >
        <div className="grid grid-cols-5 items-center max-w-lg mx-auto">
          {/* Tab 1: Accueil */}
          <button
            type="button"
            onClick={() => handleTabClick('accueil')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
              activeTab === 'accueil' && !plusSheetOpen
                ? 'text-[#512D6D] font-bold'
                : 'text-[#5D4037]/75 hover:text-[#512D6D]'
            }`}
            aria-label={t.nav.tabs.accueil}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              activeTab === 'accueil' && !plusSheetOpen ? 'bg-[#512D6D]/10' : ''
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
              {t.nav.tabs.accueil}
            </span>
          </button>

          {/* Tab 2: Soins & Tarifs */}
          <button
            type="button"
            onClick={() => handleTabClick('soins')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
              activeTab === 'soins' && !plusSheetOpen
                ? 'text-[#512D6D] font-bold'
                : 'text-[#5D4037]/75 hover:text-[#512D6D]'
            }`}
            aria-label={isEs ? 'Tratamientos y Tarifas' : 'Carte des Soins & Tarifs'}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              activeTab === 'soins' && !plusSheetOpen ? 'bg-[#512D6D]/10' : ''
            }`}>
              <Sparkles className="w-5 h-5 text-[#8B2651]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
              {isEs ? 'Tratamientos' : 'Soins'}
            </span>
          </button>

          {/* Tab 3: Secteur (7 km) */}
          <button
            type="button"
            onClick={() => handleTabClick('secteur')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
              activeTab === 'secteur' && !plusSheetOpen
                ? 'text-[#512D6D] font-bold'
                : 'text-[#5D4037]/75 hover:text-[#512D6D]'
            }`}
            aria-label={isEs ? 'Zona de Cobertura (7 km)' : "Rayon d'action (7 km offert)"}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              activeTab === 'secteur' && !plusSheetOpen ? 'bg-[#512D6D]/10' : ''
            }`}>
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
              {isEs ? 'Zona 7 km' : 'Secteur'}
            </span>
          </button>

          {/* Tab 4: Contact & RDV */}
          <button
            type="button"
            onClick={() => handleTabClick('contact')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
              activeTab === 'contact' && !plusSheetOpen
                ? 'text-[#512D6D] font-bold'
                : 'text-[#5D4037]/75 hover:text-[#512D6D]'
            }`}
            aria-label={isEs ? 'Contacto y Citas' : 'Contact & Prise de RDV'}
          >
            <div className={`p-1 rounded-lg transition-colors ${
              activeTab === 'contact' && !plusSheetOpen ? 'bg-[#512D6D]/10' : ''
            }`}>
              <Mail className="w-5 h-5 text-[#8B2651]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
              {isEs ? 'Contacto' : 'Contact'}
            </span>
          </button>

          {/* Tab 5: Plus (Tiroir Bottom Sheet pour Marques, À Propos, FAQ, Horaires, Appel) */}
          <button
            type="button"
            onClick={() => setPlusSheetOpen(!plusSheetOpen)}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
              plusSheetOpen || isSecondaryTabActive
                ? 'text-[#512D6D] font-bold'
                : 'text-[#5D4037]/75 hover:text-[#512D6D]'
            }`}
            aria-label={isEs ? 'Más opciones' : 'Plus d\'options'}
            aria-expanded={plusSheetOpen}
          >
            <div className={`p-1 rounded-lg transition-colors relative ${
              plusSheetOpen || isSecondaryTabActive ? 'bg-[#512D6D]/10' : ''
            }`}>
              <Menu className="w-5 h-5" />
              {isSecondaryTabActive && !plusSheetOpen && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8B2651]" />
              )}
            </div>
            <span className="text-[10px] leading-tight tracking-tight truncate max-w-full">
              {isEs ? 'Más' : 'Plus'}
            </span>
          </button>
        </div>
      </nav>

      {/* =========================================================================
          3. BOTTOM SHEET MODAL (VOLET 'PLUS' AU POUCE)
         ========================================================================= */}
      {plusSheetOpen && (
        <div className="fixed inset-0 z-50 animate-fadeIn">
          {/* Backdrop */}
          <div
            onClick={() => setPlusSheetOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Bottom Sheet Container */}
          <div 
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-[#F9F6F0] rounded-t-3xl border-t border-x border-[#D1C4E9] shadow-2xl p-4 sm:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] animate-slideUp max-w-lg mx-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plus-sheet-title"
          >
            {/* Drag handle pill */}
            <div className="w-12 h-1 bg-[#D1C4E9] rounded-full mx-auto mb-3" />

            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D1C4E9]/60">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-serif text-xs font-bold shadow-2xs">
                  KR
                </span>
                <div>
                  <h3 id="plus-sheet-title" className="font-serif text-base font-bold text-[#512D6D] leading-tight">
                    {isEs ? 'Servicios & Más' : 'Prestations & Informations'}
                  </h3>
                  <p className="text-[11px] text-[#5D4037]/75">
                    {t.nav.brandRole}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPlusSheetOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-white border border-[#D1C4E9]/80 text-[#512D6D] active:scale-95 transition-all shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                aria-label={isEs ? 'Cerrar' : 'Fermer'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary Pages List */}
            <div className="space-y-2 mb-4">
              {secondaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full min-h-[48px] flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none ${
                      isActive
                        ? 'bg-white border border-[#512D6D]/30 shadow-xs'
                        : 'bg-white/60 hover:bg-white active:bg-white/90 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#512D6D] text-white' : 'bg-[#D1C4E9]/35 text-[#512D6D]'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-serif font-bold ${
                          isActive ? 'text-[#512D6D]' : 'text-[#5D4037]'
                        }`}>
                          {item.label}
                        </div>
                        <div className="text-[11px] text-[#5D4037]/70">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-[#512D6D] translate-x-0.5' : 'text-[#D1C4E9]'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Direct Contact & Opening Hours Quick Section */}
            <div className="pt-3 border-t border-[#D1C4E9]/60 space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5D4037]/75">
                <Clock className="w-3.5 h-3.5 text-[#512D6D]" />
                <span>{isEs ? 'Lunes a sábado de 9:00 a 19:30' : 'Du lundi au samedi : 9h00 - 19h30'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+33665566702"
                  className="min-h-[48px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#D1C4E9] text-[#512D6D] text-xs font-bold shadow-2xs hover:bg-[#F9F6F0] active:scale-98 transition-all focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                  aria-label={t.nav.callAria}
                >
                  <Phone className="w-4 h-4 text-[#512D6D]" />
                  <span>06 65 56 67 02</span>
                </a>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#512D6D] text-white text-xs font-bold shadow-2xs hover:bg-[#402257] active:scale-98 transition-all focus-visible:ring-2 focus-visible:ring-[#512D6D] focus-visible:outline-none"
                  aria-label={t.nav.whatsappAria}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

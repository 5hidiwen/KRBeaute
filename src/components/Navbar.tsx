import React, { useState } from 'react';
import { Phone, MessageCircle, Home, Sparkles, MapPin, HelpCircle, Award, Cpu, Mail, Menu, X, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export type NavTab = 'accueil' | 'soins' | 'marques' | 'a-propos' | 'secteur' | 'faq' | 'contact';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

interface NavDrawerItem {
  id: NavTab;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { t, language } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isEs = language === 'es';

  // 3 Primary Quick Links for Desktop Floating Pill
  const primaryLinks: { id: NavTab; label: string }[] = [
    { id: 'soins', label: isEs ? 'Tratamientos' : 'Soins & Tarifs' },
    { id: 'secteur', label: isEs ? 'Secteur (7 km)' : 'Secteur (7 km)' },
    { id: 'contact', label: isEs ? 'Contacto' : 'Contact' },
  ];

  // Full Drawer Menu Items with subtitles
  const allNavItems: NavDrawerItem[] = [
    {
      id: 'accueil',
      label: t.nav.tabs.accueil,
      sub: isEs ? 'Página principal' : 'Page principale',
      icon: <Home className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'soins',
      label: isEs ? 'Carte de Soins & Tarifas' : 'Carte des Soins & Tarifs',
      sub: isEs ? 'Rostro, mirada, pies y masaje en silla' : 'Visage, regard, pieds & massage assis',
      icon: <Sparkles className="w-4 h-4 text-[#8B2651]" />
    },
    {
      id: 'secteur',
      label: isEs ? 'Zona de Atención' : "Rayon d'action & Déplacement",
      sub: isEs ? '7 km gratis alrededor de Rennes' : '7 km offerts autour de Rennes',
      icon: <MapPin className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'marques',
      label: isEs ? 'Tecnologías y Marcas' : 'Technologies & Grandes Maisons',
      sub: isEs ? 'Nu Skin, Dr. Renaud, Farmasi, LED' : 'Nu Skin, Dr. Renaud Paris, Farmasi, LED',
      icon: <Cpu className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'a-propos',
      label: isEs ? 'Sobre Karina Robart' : 'À Propos de Karina Robart',
      sub: isEs ? 'Esteticista certificada CAP' : "Diplômée d'État & savoir-faire",
      icon: <Award className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'faq',
      label: isEs ? 'Preguntas Frecuentes & FAQ' : 'Conditions & FAQ',
      sub: isEs ? 'Organización, higiene y reservas' : 'Réservation, hygiène & modalités',
      icon: <HelpCircle className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'contact',
      label: isEs ? 'Contacto & Reserva' : 'Contact & Prise de RDV',
      sub: isEs ? 'Formulario directo y WhatsApp' : 'Formulaire direct & WhatsApp',
      icon: <Mail className="w-4 h-4 text-[#8B2651]" />
    },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsAppGreeting = isEs
    ? 'Hola Karina, deseo reservar un tratamiento a domicilio...'
    : 'Bonjour Karina, je souhaite réserver un soin à domicile...';

  const whatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(whatsAppGreeting)}`;

  return (
    <>
      {/* FLOATING PILL NAVBAR */}
      <div className="sticky top-2 sm:top-3.5 z-40 px-3 sm:px-6 max-w-4xl mx-auto w-full transition-all">
        <header className="bg-[#F9F6F0]/92 backdrop-blur-md border border-[#D1C4E9]/80 rounded-full shadow-sm hover:shadow-md transition-all px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Brand Mark (Left) */}
          <button 
            onClick={() => handleTabClick('accueil')}
            className="flex items-center gap-2 text-[#512D6D] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity cursor-pointer"
            title="Karina Robart - Accueil"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center font-serif text-xs font-bold tracking-tight shadow-2xs">
              KR
            </span>
            <span className="font-serif text-sm sm:text-base font-bold text-[#512D6D] tracking-tight">
              Karina Robart
            </span>
          </button>

          {/* Desktop Primary Links (Center) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {primaryLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#512D6D] text-white font-semibold shadow-2xs'
                      : 'text-[#5D4037] hover:text-[#512D6D] hover:bg-[#D1C4E9]/30'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Block (Language, WhatsApp, Drawer Toggle) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Micro Language Switcher [ FR | ES ] */}
            <LanguageSelector />

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-95 text-white text-xs font-semibold shadow-2xs transition-all"
              aria-label={t.nav.whatsappAria}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">{isEs ? 'Reservar' : 'Réserver'}</span>
            </a>

            {/* Menu Drawer Toggle Button (☰) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="p-1 sm:px-2.5 sm:py-1 rounded-full bg-white/80 hover:bg-white border border-[#D1C4E9]/80 text-[#512D6D] flex items-center gap-1 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
              aria-label={isEs ? 'Abrir menú completo' : 'Ouvrir le menu complet'}
              title="Menu"
            >
              <Menu className="w-4 h-4 text-[#512D6D]" />
              <span className="hidden md:inline text-[11px] font-bold">Menu</span>
            </button>
          </div>

        </header>
      </div>

      {/* FULL SLIDE-OVER DRAWER MENU (☰) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 animate-fadeIn">
          {/* Backdrop */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Side Drawer Panel */}
          <div className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-[#F9F6F0] shadow-2xl flex flex-col justify-between p-5 sm:p-6 border-l border-[#D1C4E9]/80 overflow-y-auto z-10 animate-slideInRight">
            
            {/* Drawer Top Header */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D1C4E9]/50">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-serif text-xs font-bold">
                    KR
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#512D6D]">
                      Karina Robart
                    </h3>
                    <p className="text-[11px] text-[#5D4037]/75">
                      {t.nav.brandRole}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-[#D1C4E9]/30 rounded-full transition-colors cursor-pointer"
                  aria-label={isEs ? 'Cerrar menú' : 'Fermer le menu'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="space-y-1">
                {allNavItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white border border-[#512D6D]/30 shadow-xs'
                          : 'hover:bg-white/70 hover:border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
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
                          <div className="text-[10px] text-[#5D4037]/70">
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
              </nav>
            </div>

            {/* Drawer Bottom Quick Action */}
            <div className="pt-4 mt-4 border-t border-[#D1C4E9]/50 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] text-[#5D4037]/75">
                <Clock className="w-3.5 h-3.5 text-[#512D6D]" />
                <span>{isEs ? 'Lun - Sáb: 9:00 - 19:30' : 'Du lundi au samedi : 9h00 - 19h30'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+33665566702"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#D1C4E9] text-[#512D6D] text-xs font-bold shadow-2xs hover:bg-[#F9F6F0] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>06 65 56 67 02</span>
                </a>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#512D6D] text-white text-xs font-bold shadow-2xs hover:bg-[#402257] transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM DIRECT CONTACT BAR (Instant 1-Tap Access) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F9F6F0]/95 backdrop-blur-md border-t border-[#D1C4E9] shadow-xl px-3 py-2 flex items-center gap-2">
        <a
          href="tel:+33665566702"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-[#D1C4E9] text-[#512D6D] rounded-xl text-xs font-bold shadow-2xs active:scale-98"
        >
          <Phone className="w-4 h-4 text-[#512D6D]" />
          <span>06 65 56 67 02</span>
        </a>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.3] min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 bg-[#512D6D] text-white rounded-xl text-xs font-bold shadow-md active:scale-98"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>{t.nav.bookWhatsApp}</span>
        </a>
      </div>
    </>
  );
};

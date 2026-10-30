import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeExperienceSteps } from './components/HomeExperienceSteps';
import { ServicesMenu } from './components/ServicesMenu';
import { LogisticsCalculator } from './components/LogisticsCalculator';
import { HomeTestimonials } from './components/HomeTestimonials';
import { HomeCtaBanner } from './components/HomeCtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import type { LegalTab } from './components/LegalModal';
import { ServiceItem } from './data/servicesData';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';

const BrandsEquipment = lazy(() => import('./components/BrandsEquipment').then(m => ({ default: m.BrandsEquipment })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const ClientSheetSection = lazy(() => import('./components/ClientSheetSection').then(m => ({ default: m.ClientSheetSection })));
const GiftCardSection = lazy(() => import('./components/GiftCardSection').then(m => ({ default: m.GiftCardSection })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

const DEDICATED_TABS: NavTab[] = ['faq', 'fiche-cliente', 'carte-cadeau', 'marques', 'a-propos'];
const isDedicatedTab = (tab: NavTab): boolean => DEDICATED_TABS.includes(tab);

const getTabFromUrl = (): NavTab | null => {
  if (typeof window === 'undefined') return null;
  const pathname = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '').trim();
  const rawHash = window.location.hash.toLowerCase().replace(/^#/, '').trim();
  const params = new URLSearchParams(window.location.search);
  const pageParam = (params.get('page') || '').toLowerCase().trim();

  const target = pathname || rawHash || pageParam;
  if (!target) return null;

  if (target === 'fiche-cliente' || target === 'fiche-client' || target === 'fiche' || target === 'diagnostic' || target === 'bilan') {
    return 'fiche-cliente';
  }
  if (target === 'carte-cadeau' || target === 'cadeau' || target === 'bon-cadeau' || target === 'regalo') {
    return 'carte-cadeau';
  }
  if (target === 'faq' || target === 'questions') {
    return 'faq';
  }
  if (target === 'tarifs' || target === 'soins' || target === 'traitements') {
    return 'soins';
  }
  if (target === 'marques' || target === 'technologies') {
    return 'marques';
  }
  if (target === 'a-propos' || target === 'apropos' || target === 'karina' || target === 'sobre-karina') {
    return 'a-propos';
  }
  if (target === 'secteur' || target === 'zone' || target === 'deplacement' || target === 'deplacements') {
    return 'secteur';
  }
  if (target === 'contact' || target === 'contacto' || target === 'rdv' || target === 'reservation') {
    return 'contact';
  }
  if (['accueil', 'soins', 'marques', 'a-propos', 'secteur', 'contact'].includes(target)) {
    return target as NavTab;
  }
  return null;
};

function AppContent() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<NavTab>(() => getTabFromUrl() || 'accueil');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [selectedCommuneName, setSelectedCommuneName] = useState<string | null>(null);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('mentions');

  useScrollReveal([activeTab, language]);

  // Deep linking: listen to URL changes and handle initial page load
  useEffect(() => {
    const handleUrlChange = (smooth = true) => {
      const tabFromUrl = getTabFromUrl();
      if (tabFromUrl) {
        setActiveTab(tabFromUrl);
        // Automatically normalize URL without '#' if hash was used
        const targetCleanUrl = tabFromUrl === 'accueil' ? '/' : `/${tabFromUrl}`;
        if (window.location.hash && window.history.replaceState) {
          window.history.replaceState(null, '', targetCleanUrl);
        }

        if (isDedicatedTab(tabFromUrl) || tabFromUrl === 'accueil') {
          window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
        } else {
          setTimeout(() => {
            const el = document.getElementById(tabFromUrl);
            if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
          }, smooth ? 100 : 250);
        }
      }
    };

    // Run on initial mount to scroll to section if URL was /soins, /secteur, etc.
    handleUrlChange(false);

    const onHashChange = () => handleUrlChange(true);
    const onPopState = () => handleUrlChange(true);

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // ScrollSpy on main page scroll to keep activeTab synchronized with current viewport
  useEffect(() => {
    if (isDedicatedTab(activeTab)) return;

    const sectionIds: NavTab[] = ['accueil', 'soins', 'secteur', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const handleSelectTab = (tab: NavTab) => {
    // Keep URL synchronized cleanly: /fiche-cliente, /soins, /marques, /a-propos, /faq without '#'
    const targetUrl = tab === 'accueil' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetUrl || window.location.hash) {
      if (window.history.pushState) {
        window.history.pushState(null, '', targetUrl);
      }
    }

    if (isDedicatedTab(tab)) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on a dedicated page, transition back to home first
    if (isDedicatedTab(activeTab)) {
      setActiveTab(tab);
      setTimeout(() => {
        if (tab === 'accueil') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(tab);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 50);
      return;
    }

    setActiveTab(tab);
    if (tab === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleToggleComboService = (service: ServiceItem) => {
    setSelectedServices(prev =>
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedServices(prev => {
        if (prev.some(s => s.id === service.id)) return prev;
        return prev.length > 0 ? [...prev, service] : [service];
      });
    }
    handleSelectTab('contact');
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#5D4037] font-sans selection:bg-[#D1C4E9] selection:text-[#512D6D]">
      
      {/* Top Bar & Mobile Bottom Tab Bar */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={handleSelectTab} 
        onOpenBooking={() => handleOpenBooking()} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: DEDICATED FAQ PAGE (Clean & Focused) */}
        {activeTab === 'faq' ? (
          <div className="animate-fadeIn py-8 sm:py-14 bg-[#F9F6F0]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <button
                type="button"
                onClick={() => handleSelectTab('accueil')}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white hover:bg-white/90 border border-[#D1C4E9] text-xs font-semibold text-[#512D6D] shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#512D6D]" />
                <span>{language === 'es' ? 'Volver al inicio' : 'Retour à l\'accueil'}</span>
              </button>
            </div>

            {/* The Dedicated FAQ Component */}
            <Suspense fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-3 border-[#512D6D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <FAQSection />
            </Suspense>

            {/* Contact & Support Help Box */}
            <div className="kr-reveal max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
              <div className="kr-card-nacre bg-white p-6 sm:p-8 rounded-3xl border border-[#D1C4E9] text-center">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037] mb-2">
                  {language === 'es' ? '¿Tienes alguna otra duda?' : 'Vous avez une question particulière ?'}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D4037]/80 max-w-lg mx-auto mb-6 leading-relaxed">
                  {language === 'es'
                    ? 'Karina te responde directamente con calidez para resolver cualquier duda y preparar tu cita en casa.'
                    : 'Karina vous répond directement pour lever le moindre doute et préparer votre soin à domicile.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking()}
                    className="kr-btn-silk inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-[#512D6D] text-white text-xs font-bold shadow-xs hover:bg-[#402257] active:scale-98 cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Agendar o consultar' : 'Poser une question / Réserver'}</span>
                  </button>
                  <a
                    href="tel:+33665566702"
                    className="inline-flex items-center gap-2 px-5 py-3 min-h-[46px] rounded-full bg-white border border-[#D1C4E9] text-[#512D6D] text-xs font-semibold shadow-xs hover:bg-[#F9F6F0] active:scale-98"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#512D6D]" />
                    <span>06 65 56 67 02</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'fiche-cliente' ? (
          /* VIEW 2: DEDICATED FICHE CLIENTE PAGE (Clean & Focused) */
          <div className="animate-fadeIn py-8 sm:py-14 bg-[#F9F6F0]">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-4">
              <button
                type="button"
                onClick={() => handleSelectTab('accueil')}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white hover:bg-white/90 border border-[#D1C4E9] text-xs font-semibold text-[#512D6D] shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#512D6D]" />
                <span>{language === 'es' ? 'Volver al inicio' : "Retour à l'accueil"}</span>
              </button>
            </div>

            {/* The Dedicated Fiche Cliente Component */}
            <Suspense fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-3 border-[#512D6D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <ClientSheetSection />
            </Suspense>
          </div>
        ) : activeTab === 'carte-cadeau' ? (
          /* VIEW 2B: DEDICATED CARTE CADEAU PAGE (Clean & Focused) */
          <div className="animate-fadeIn py-8 sm:py-12 bg-[#F9F6F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <button
                type="button"
                onClick={() => handleSelectTab('accueil')}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white hover:bg-white/90 border border-[#D1C4E9] text-xs font-semibold text-[#512D6D] shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#512D6D]" />
                <span>{language === 'es' ? 'Volver al inicio' : "Retour à l'accueil"}</span>
              </button>
            </div>

            <Suspense fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-3 border-[#512D6D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <GiftCardSection />
            </Suspense>
          </div>
        ) : activeTab === 'marques' ? (
          /* VIEW 3: DEDICATED TECHNOLOGIES & MARQUES PAGE */
          <div className="animate-fadeIn pt-6 sm:pt-10 bg-[#F9F6F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <button
                type="button"
                onClick={() => handleSelectTab('accueil')}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white hover:bg-white/90 border border-[#D1C4E9] text-xs font-semibold text-[#512D6D] shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#512D6D]" />
                <span>{language === 'es' ? 'Volver al inicio' : "Retour à l'accueil"}</span>
              </button>
            </div>

            <Suspense fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-3 border-[#512D6D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <BrandsEquipment />
            </Suspense>

            <HomeCtaBanner onOpenBooking={() => handleOpenBooking()} />
          </div>
        ) : activeTab === 'a-propos' ? (
          /* VIEW 4: DEDICATED À PROPOS DE KARINA PAGE */
          <div className="animate-fadeIn pt-6 sm:pt-10 bg-[#F9F6F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
              <button
                type="button"
                onClick={() => handleSelectTab('accueil')}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-white hover:bg-white/90 border border-[#D1C4E9] text-xs font-semibold text-[#512D6D] shadow-xs cursor-pointer transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 text-[#512D6D]" />
                <span>{language === 'es' ? 'Volver al inicio' : "Retour à l'accueil"}</span>
              </button>
            </div>

            <Suspense fallback={
              <div className="py-24 text-center">
                <div className="inline-block w-8 h-8 border-3 border-[#512D6D] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <AboutSection />
            </Suspense>

            <HomeCtaBanner onOpenBooking={() => handleOpenBooking()} />
          </div>
        ) : (
          /* VIEW 5: STREAMLINED ONE-PAGE CONVERSION FLOW (-40% MOBILE SCROLL) */
          <div className="space-y-0">
            
            {/* 1. HERO HEADER (Beige #F9F6F0) */}
            <Hero 
              onOpenBooking={() => handleOpenBooking()} 
              onGoToServices={() => handleSelectTab('soins')}
              onOpenBrands={() => handleSelectTab('marques')}
              onOpenAbout={() => handleSelectTab('a-propos')}
              onOpenGiftCard={() => handleSelectTab('carte-cadeau')}
            />

            {/* 2. RITUEL EN 3 ÉTAPES (Blanc bg-white) */}
            <HomeExperienceSteps 
              onOpenBooking={() => handleOpenBooking()} 
              onGoToServices={() => handleSelectTab('soins')}
            />

            {/* 3. SOINS, DIAGNOSTIC EXPRESS & DUOS SIGNATURE (Beige #F9F6F0) */}
            <ServicesMenu 
              onSelectService={(service) => handleOpenBooking(service)}
              onSelectRecommendedServices={(servicesList) => {
                setSelectedServices(servicesList);
                handleSelectTab('contact');
              }}
              selectedServices={selectedServices}
              onToggleComboService={handleToggleComboService}
              onBookCombo={() => handleSelectTab('contact')}
              onOpenGiftCard={() => handleSelectTab('carte-cadeau')}
            />

            {/* 4. RAYON D'ACTION & SECTEUR (Blanc bg-white) */}
            <LogisticsCalculator
              onSelectCommuneForBooking={(communeName) => {
                setSelectedCommuneName(communeName);
                handleSelectTab('contact');
              }}
            />

            {/* 5. AVIS CLIENTES & GOOGLE MAPS (Beige #F9F6F0) */}
            <HomeTestimonials />

            {/* 6. CONTACT & RÉSERVATION (Blanc bg-white) */}
            <ContactSection 
              selectedService={selectedServices[0] || null}
              selectedServices={selectedServices}
              onChangeSelectedServices={setSelectedServices}
              selectedCommuneName={selectedCommuneName}
              onOpenClientSheet={() => handleSelectTab('fiche-cliente')}
            />

          </div>
        )}

      </main>

      {/* Footer (Beige #F9F6F0) */}
      <Footer 
        onOpenLegal={handleOpenLegal} 
        onOpenBooking={() => handleOpenBooking()} 
        onSelectTab={handleSelectTab}
      />

      {/* Legal Pages Modal (Mentions Légales, CGV, RGPD) */}
      {legalModalOpen && (
        <Suspense fallback={null}>
          <LegalModal
            isOpen={legalModalOpen}
            initialTab={legalTab}
            onClose={() => setLegalModalOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

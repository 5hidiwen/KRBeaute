import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeExperienceSteps } from './components/HomeExperienceSteps';
import { ServicesMenu } from './components/ServicesMenu';
import { BrandsEquipment } from './components/BrandsEquipment';
import { AboutSection } from './components/AboutSection';
import { LogisticsCalculator } from './components/LogisticsCalculator';
import { HomeTestimonials } from './components/HomeTestimonials';
import { FAQSection } from './components/FAQSection';
import { HomeCtaBanner } from './components/HomeCtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { ServiceItem } from './data/servicesData';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<NavTab>('accueil');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('mentions');

  // ScrollSpy on main page scroll to keep activeTab synchronized with current viewport
  useEffect(() => {
    if (activeTab === 'faq') return;

    const sectionIds: NavTab[] = ['accueil', 'soins', 'marques', 'a-propos', 'secteur', 'contact'];
    
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
    if (tab === 'faq') {
      setActiveTab('faq');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on dedicated FAQ page, transition back to home first
    if (activeTab === 'faq') {
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

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
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
            <FAQSection />

            {/* Contact & Support Help Box */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D1C4E9] shadow-xs text-center">
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
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-[#512D6D] text-white text-xs font-bold shadow-xs hover:bg-[#402257] active:scale-98 cursor-pointer"
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
        ) : (
          /* VIEW 2: UNIFIED ONE-PAGE FLOW WITH PERFECT COLOR ALTERNATION */
          <div className="space-y-0">
            
            {/* 1. HERO HEADER (Beige #F9F6F0) */}
            <Hero 
              onOpenBooking={() => handleOpenBooking()} 
              onGoToServices={() => handleSelectTab('soins')}
            />

            {/* 2. RITUEL EN 3 ÉTAPES (Blanc bg-white) */}
            <HomeExperienceSteps 
              onOpenBooking={() => handleOpenBooking()} 
              onGoToServices={() => handleSelectTab('soins')}
            />

            {/* 3. SOINS & TARIFS (Beige #F9F6F0) */}
            <ServicesMenu 
              onSelectService={(service) => handleOpenBooking(service)} 
            />

            {/* 4. TECHNOLOGIES & MARQUES (Blanc bg-white) */}
            <BrandsEquipment />

            {/* 5. À PROPOS DE KARINA (Beige #F9F6F0) */}
            <AboutSection />

            {/* 6. RAYON D'ACTION & SECTEUR (Blanc bg-white) */}
            <LogisticsCalculator />

            {/* 7. AVIS CLIENTES & GOOGLE MAPS (Beige #F9F6F0) */}
            <HomeTestimonials />

            {/* 8. BANNIÈRE WARM CTA (Prune Foncé #512D6D) */}
            <HomeCtaBanner 
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 9. CONTACT & RÉSERVATION (Blanc bg-white) */}
            <ContactSection selectedService={selectedService} />

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
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />

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

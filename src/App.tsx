import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesMenu } from './components/ServicesMenu';
import { BrandsEquipment } from './components/BrandsEquipment';
import { AboutSection } from './components/AboutSection';
import { LogisticsCalculator } from './components/LogisticsCalculator';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { ServiceItem } from './data/servicesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('accueil');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('mentions');

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (service?: ServiceItem) => {
    if (service) {
      setSelectedService(service);
    }
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Main Content: Strictly limited to the selected tab, with safe bottom space on mobile for tab bar */}
      <main className="flex-1 pb-20 sm:pb-0">
        
        {/* TAB 1: ACCUEIL */}
        {activeTab === 'accueil' && (
          <div className="animate-fadeIn">
            <Hero 
              onOpenBooking={() => handleOpenBooking()} 
              onGoToServices={() => handleSelectTab('soins')}
            />
          </div>
        )}

        {/* TAB 2: SOINS & TARIFS */}
        {activeTab === 'soins' && (
          <div className="animate-fadeIn">
            <ServicesMenu 
              onSelectService={(service) => handleOpenBooking(service)} 
            />
          </div>
        )}

        {/* TAB 3: TECHNOLOGIES & MARQUES */}
        {activeTab === 'marques' && (
          <div className="animate-fadeIn">
            <BrandsEquipment />
          </div>
        )}

        {/* TAB 4: À PROPOS */}
        {activeTab === 'a-propos' && (
          <div className="animate-fadeIn">
            <AboutSection />
          </div>
        )}

        {/* TAB 5: RAYON D'ACTION */}
        {activeTab === 'secteur' && (
          <div className="animate-fadeIn">
            <LogisticsCalculator />
          </div>
        )}

        {/* TAB 6: FAQ */}
        {activeTab === 'faq' && (
          <div className="animate-fadeIn">
            <FAQSection />
          </div>
        )}

        {/* TAB 7: CONTACT & RÉSERVATION */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactSection selectedService={selectedService} />
          </div>
        )}

      </main>

      {/* Footer: Always displayed at the bottom of every selected tab */}
      <Footer 
        onOpenLegal={handleOpenLegal} 
        onOpenBooking={() => handleOpenBooking()} 
        onSelectTab={handleSelectTab}
      />

      {/* Mandatory French Legal Pages Modal (Mentions Légales, CGV, RGPD) */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalTab}
        onClose={() => setLegalModalOpen(false)}
      />

    </div>
  );
}

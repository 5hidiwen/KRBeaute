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
import { Sparkles, MapPin, Award, ArrowRight } from 'lucide-react';

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

            {/* Curated Accueil Quick Pathways */}
            <section className="py-8 sm:py-16 bg-[#F9F6F0] border-t border-[#D1C4E9]/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
                  <h2 className="text-xl sm:text-3xl font-serif font-medium text-[#5D4037] mb-1 sm:mb-2">
                    L'institut haute exigence dans votre salon
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5D4037]/80">
                    Sélectionnez une rubrique pour accéder directement au contenu :
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
                  
                  {/* Card 1 -> Soins & Tarifs */}
                  <div 
                    onClick={() => handleSelectTab('soins')}
                    className="group bg-white/85 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#D1C4E9] hover:border-[#512D6D]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D1C4E9]/40 text-[#512D6D] flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] group-hover:text-[#512D6D] transition-colors mb-1 sm:mb-2">
                        Carte des Soins & Tarifs
                      </h3>
                      <p className="text-xs text-[#5D4037]/80 leading-relaxed mb-3">
                        7 soins d'institut : soins du visage (Pureté, Douceur Gelée, Detox), rehaussement & teinte de cils, beauté & soins des pieds, et modelage en chaise.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#512D6D]">
                      <span>Voir tous les tarifs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2 -> Rayon d'action */}
                  <div 
                    onClick={() => handleSelectTab('secteur')}
                    className="group bg-white/85 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#D1C4E9] hover:border-[#512D6D]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D1C4E9]/40 text-[#512D6D] flex items-center justify-center mb-3">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] group-hover:text-[#512D6D] transition-colors mb-1 sm:mb-2">
                        Rayon d'action à Rennes
                      </h3>
                      <p className="text-xs text-[#5D4037]/80 leading-relaxed mb-3">
                        Déplacement 100% offert dans un rayon de 7 km autour de Rennes. Simulateur interactif par commune.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#512D6D]">
                      <span>Vérifier ma commune</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3 -> À Propos (Diplôme CAP) */}
                  <div 
                    onClick={() => handleSelectTab('a-propos')}
                    className="group bg-white/85 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#D1C4E9] hover:border-[#512D6D]/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D1C4E9]/40 text-[#512D6D] flex items-center justify-center mb-3">
                        <Award className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] group-hover:text-[#512D6D] transition-colors mb-1 sm:mb-2">
                        Diplômée d'État (CAP)
                      </h3>
                      <p className="text-xs text-[#5D4037]/80 leading-relaxed mb-3">
                        CAP Esthétique Cosmétique et Parfumerie. Découvrez les protocoles d'hygiène et de bienveillance.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#512D6D]">
                      <span>En savoir plus</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </div>
            </section>
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

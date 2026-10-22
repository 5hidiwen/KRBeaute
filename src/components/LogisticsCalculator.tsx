import React, { useState } from 'react';
import { MapPin, CheckCircle2, Car, Search, Info, Compass } from 'lucide-react';
import { COMMUNES_DATA, CommuneItem } from '../data/communesData';

export const LogisticsCalculator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommune, setSelectedCommune] = useState<CommuneItem>(COMMUNES_DATA[0]);

  const filteredCommunes = COMMUNES_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.postalCode.includes(searchQuery)
  );

  return (
    <section id="secteur" className="py-8 sm:py-20 bg-gradient-to-b from-[#F9F6F0] via-[#F4EDE2]/50 to-[#F9F6F0] border-t border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#512D6D] mb-2">
            <span>Rennes & Alentours</span>
            <span aria-hidden="true">·</span>
            <span>Transparence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-2 sm:mb-3">
            Rayon d'action & Déplacement
          </h2>
          <p className="text-xs sm:text-base text-[#5D4037]/80 leading-relaxed max-w-xl mx-auto">
            Déplacement 100% offert dans un rayon de 7 km autour du centre de Rennes, et supplément forfaitaire modéré au-delà.
          </p>
        </div>

        {/* 3 Tier Policy Cards (Compact on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 mb-8 sm:mb-12">
          
          {/* Tier 1: 0 - 7 km (OFFERT) */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-[#512D6D] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#512D6D]">
                  Zone Prioritaire
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#D1C4E9] text-[#512D6D]">
                  0 € OFFERT
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#512D6D] mb-1">
                Jusqu'à 7 km
              </h3>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed mb-3">
                Rennes (tous quartiers), Saint-Grégoire, Cesson-Sévigné, Chantepie, Vezin-le-Coquet, Saint-Jacques-de-la-Lande, Montgermont...
              </p>
            </div>
            <div className="pt-2.5 border-t border-[#D1C4E9]/50 flex items-center gap-1.5 text-xs font-bold text-[#512D6D]">
              <CheckCircle2 className="w-4 h-4 text-[#512D6D] shrink-0" />
              <span>Inclus sans aucun surcoût</span>
            </div>
          </div>

          {/* Tier 2: 7 - 20 km (5 €) */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D4037]/80">
                  Zone Élargie
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F9F6F0] border border-[#D1C4E9] text-[#5D4037]">
                  + 5 € Forfait
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5D4037] mb-1">
                De 7 à 20 km
              </h3>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed mb-3">
                Pacé, Betton, Le Rheu, Noyal-Châtillon, Bruz, Chartres-de-Bretagne, Thorigné-Fouillard, Acigné, Mordelles, Vern-sur-Seiche, Châteaugiron...
              </p>
            </div>
            <div className="pt-2.5 border-t border-[#D1C4E9]/50 flex items-center gap-1.5 text-xs font-medium text-[#5D4037]">
              <Car className="w-4 h-4 text-[#512D6D] shrink-0" />
              <span>Forfait unique par visite</span>
            </div>
          </div>

          {/* Tier 3: 20 - 30 km (10 €) */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5D4037]/80">
                  Zone Confort
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F9F6F0] border border-[#D1C4E9] text-[#5D4037]">
                  + 10 € Forfait
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#5D4037] mb-1">
                De 20 à 30 km
              </h3>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed mb-3">
                Liffré, Guichen, Janzé, Montfort-sur-Meu, etc. Au-delà : sur devis.
              </p>
            </div>
            <div className="pt-2.5 border-t border-[#D1C4E9]/50 flex items-center gap-1.5 text-xs font-medium text-[#5D4037]">
              <Compass className="w-4 h-4 text-[#512D6D] shrink-0" />
              <span>Confort direct à votre porte</span>
            </div>
          </div>

        </div>

        {/* Interactive Commune Checker */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#D1C4E9] shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5D4037]">
                Simulateur : vérifiez votre commune
              </h3>
              <p className="text-xs text-[#5D4037]/80">
                Tapez votre ville ou sélectionnez-la dans la liste rapide :
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-[#5D4037]/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex : Cesson, 35000, Bruz..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-h-[40px] w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-[#F9F6F0] border border-[#D1C4E9] rounded-xl text-[#5D4037] focus:outline-none focus:border-[#512D6D]"
              />
            </div>
          </div>

          {/* Quick Commune Selector Pills */}
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1 mb-4 pb-2 border-b border-[#D1C4E9]/40">
            {filteredCommunes.slice(0, 12).map((commune) => (
              <button
                key={`${commune.name}-${commune.postalCode}`}
                onClick={() => setSelectedCommune(commune)}
                className={`min-h-[36px] px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCommune.name === commune.name
                    ? 'bg-[#512D6D] text-[#F9F6F0] font-bold'
                    : 'bg-[#F9F6F0] text-[#5D4037] hover:bg-[#D1C4E9]/40'
                }`}
              >
                {commune.name}
              </button>
            ))}
          </div>

          {/* Selected Commune Result Card */}
          {selectedCommune && (
            <div className="bg-[#D1C4E9]/30 rounded-xl p-4 border border-[#D1C4E9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#512D6D] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-[#5D4037]">
                      {selectedCommune.name}
                    </span>
                    <span className="text-[11px] text-[#5D4037]/80 bg-white px-2 py-0.5 rounded border border-[#D1C4E9]">
                      {selectedCommune.postalCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5D4037]/80">
                    Distance centre de Rennes : ~{selectedCommune.distanceKm} km
                  </p>
                </div>
              </div>

              <div className="sm:border-l sm:border-[#D1C4E9] sm:pl-6 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1C4E9]/50">
                <span className="text-xs text-[#5D4037]/80 font-medium">Frais de déplacement :</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#512D6D]">
                  {selectedCommune.feeEuro === 0 ? '0 € (OFFERT)' : `+${selectedCommune.feeEuro} €`}
                </span>
              </div>
            </div>
          )}

          {/* Practical Logistics Setup Info */}
          <div className="mt-4 pt-3 border-t border-[#D1C4E9]/40 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#5D4037]">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#512D6D] shrink-0 mt-0.5" />
              <span>
                <strong>Horaires & Arrivée :</strong> Arrivée 10-15 min avant pour l'installation sans décompte sur le soin.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#512D6D] shrink-0 mt-0.5" />
              <span>
                <strong>Espace nécessaire :</strong> Environ 2m × 1,5m dégagé et une prise électrique standard.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

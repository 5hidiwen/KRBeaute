import React from 'react';
import { Cpu, ShieldCheck, Sun, Sparkles, HeartHandshake, Feather, ExternalLink, ShoppingBag } from 'lucide-react';

export const BrandsEquipment: React.FC = () => {
  const farmasiAffiliateUrl = "https://www.fr.farmasi.com/karyrobart";

  return (
    <section id="marques" className="py-8 sm:py-20 bg-gradient-to-b from-[#F9F6F0] via-[#F5EFE6] to-[#F9F6F0] border-y border-[#D1C4E9]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#512D6D] mb-2">
            <span>Excellence & Sécurité</span>
            <span aria-hidden="true">·</span>
            <span>Cosmétiques & Tech</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-2 sm:mb-3">
            Technologies & Grandes Maisons
          </h2>
          <p className="text-xs sm:text-base text-[#5D4037]/80 leading-relaxed max-w-xl mx-auto">
            Dispositifs certifiés CE et formulations professionnelles reconnues pour des résultats visibles dès la première séance.
          </p>
        </div>

        {/* Brands Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-14">
          
          {/* Nu Skin */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/40 flex items-center justify-center text-[#512D6D] mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] mb-0.5">Nu Skin</h3>
              <p className="text-[10px] font-bold text-[#5D4037]/70 uppercase tracking-wider mb-2">Cosméceutique Anti-Âge</p>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed">
                Pionnier mondial de la bio-innovation cutanée. Formules ciblées restaurant fermeté et éclat naturel.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-bold">
              Soins tenseurs & micro-courants
            </div>
          </div>

          {/* Dr. Renaud */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/40 flex items-center justify-center text-[#512D6D] mb-3">
                <Feather className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] mb-0.5">Dr. Renaud Paris</h3>
              <p className="text-[10px] font-bold text-[#5D4037]/70 uppercase tracking-wider mb-2">Botanique d'Institut</p>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed">
                70 ans d’herboristerie d'exception. Textures gourmandes aux fleurs et fruits pour apaiser les peaux sensibles.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-bold">
              Soins purifiants & apaisants
            </div>
          </div>

          {/* Farmasi (With Affiliate Link) */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-[#512D6D]/40 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#D1C4E9] text-[#512D6D] rounded-full text-[9px] font-bold">
              Partenaire Officielle
            </div>
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/40 flex items-center justify-center text-[#512D6D] mb-3">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] mb-0.5">Farmasi</h3>
              <p className="text-[10px] font-bold text-[#5D4037]/70 uppercase tracking-wider mb-2">Formules Pures & Vernis</p>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed mb-3">
                Huiles bien-être relaxantes, baumes au marronnier d'Inde et vernis semi-permanents ultra-brillants respectueux de l’ongle.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30">
              <a
                href={farmasiAffiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#512D6D] text-white rounded-xl text-xs font-semibold hover:bg-[#402257] transition-colors"
                title="Visiter la boutique Farmasi de Karina Robart"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Boutique Farmasi</span>
                <ExternalLink className="w-3 h-3 text-[#D1C4E9]" />
              </a>
            </div>
          </div>

          {/* House of Peau */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#D1C4E9]/40 flex items-center justify-center text-[#512D6D] mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#512D6D] mb-0.5">House of Peau</h3>
              <p className="text-[10px] font-bold text-[#5D4037]/70 uppercase tracking-wider mb-2">Bio-Cellulose & Sérums</p>
              <p className="text-xs text-[#5D4037]/85 leading-relaxed">
                Masques hydrogels concentrés en peptides biomimétiques pour une barrière cutanée intensément repulpée.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#D1C4E9]/30 text-[11px] text-[#512D6D] font-bold">
              Rituels signatures
            </div>
          </div>

        </div>

        {/* Farmasi Boutique Banner Callout */}
        <div className="mb-10 sm:mb-14 bg-gradient-to-r from-[#D1C4E9]/50 via-white to-[#D1C4E9]/40 rounded-3xl p-5 sm:p-7 border border-[#512D6D]/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#512D6D] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-[#512D6D] text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
                Lien Partenaire Officiel · Karina Robart
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#512D6D] mb-1">
                Envie de prolonger vos rituels à domicile ?
              </h3>
              <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed max-w-2xl">
                Retrouvez l'intégralité des produits de soin, cosmétiques et bien-être de la gamme <strong>Farmasi</strong> utilisés lors des prestations directement sur mon espace boutique en ligne certifié.
              </p>
            </div>
          </div>
          
          <a
            href={farmasiAffiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[46px] w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white rounded-full text-xs sm:text-sm font-bold shadow-md transition-all whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#D1C4E9]" />
            <span>Accéder à ma boutique Farmasi</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>

        {/* Specialized Technologies Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Microcurrents */}
          <div className="bg-[#D1C4E9]/30 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D]">Technologie Expert</span>
                <span className="text-xs text-[#5D4037]/60">·</span>
                <span className="text-xs text-[#5D4037]/80">Non invasif</span>
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] mb-1.5">
                Micro-Courants Liftants Doux
              </h4>
              <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed mb-2.5">
                Micro-impulsions stimulant les 43 muscles du visage pour tonifier l'ovale, lisser les ridules et relancer l'ATP cellulaire sans douleur.
              </p>
              <ul className="text-xs text-[#5D4037] space-y-1">
                <li>✓ Effet tenseur immédiat sur l'ovale</li>
                <li>✓ Stimulation musculaire et microcirculation</li>
              </ul>
            </div>
          </div>

          {/* LED Phototherapy */}
          <div className="bg-[#D1C4E9]/30 rounded-2xl p-4 sm:p-6 border border-[#D1C4E9] flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#512D6D] text-[#F9F6F0] flex items-center justify-center shrink-0">
              <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#512D6D]">Luminothérapie</span>
                <span className="text-xs text-[#5D4037]/60">·</span>
                <span className="text-xs text-[#5D4037]/80">Sans UV ni chaleur</span>
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#5D4037] mb-1.5">
                Photothérapie LED Médicale Douce
              </h4>
              <p className="text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed mb-2.5">
                Ondes de lumière rouge et proche infrarouge stimulant la fabrication naturelle de collagène et calmant durablement les rougeurs.
              </p>
              <ul className="text-xs text-[#5D4037] space-y-1">
                <li>✓ Relance la synthèse de collagène naturel</li>
                <li>✓ Apaise les rougeurs et calme les sensibilités</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

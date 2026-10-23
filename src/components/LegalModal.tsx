import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Scale, Lock, Mail, MapPin } from 'lucide-react';

export type LegalTab = 'mentions' | 'cgv' | 'rgpd';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'mentions',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F9F6F0] rounded-3xl border border-[#D1C4E9] shadow-2xl flex flex-col overflow-hidden text-[#5D4037]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D1C4E9]/60 bg-white/70">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-serif font-bold text-sm">
              K
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#512D6D]">
                Informations Réglementaires & Juridiques
              </h3>
              <p className="text-xs text-[#5D4037]/70">
                Karina Robart · Esthéticienne à Domicile (Rennes)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-[#D1C4E9]/40 rounded-full transition-colors cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D1C4E9]/60 bg-[#D1C4E9]/20 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('mentions')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'mentions'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Mentions Légales</span>
          </button>
          <button
            onClick={() => setActiveTab('cgv')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cgv'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Conditions Générales de Vente (CGV)</span>
          </button>
          <button
            onClick={() => setActiveTab('rgpd')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rgpd'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Politique de Confidentialité (RGPD)</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-140px)] text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === 'mentions' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  1. Identification de l'Éditeur du Site
                </h4>
                <p>
                  Le présent site internet est édité et exploité par :<br />
                  <strong>Madame Karina ROBART</strong>, exerçant sous le nom commercial <em>Karina Robart - Esthéticienne</em>.<br />
                  <strong>Statut juridique :</strong> Entreprise Individuelle (Micro-entreprise)<br />
                  <strong>Siège social & Rayon d'activité :</strong> 35000 Rennes, Ille-et-Vilaine, Bretagne, France.<br />
                  <strong>Numéro SIRET :</strong> 921 458 912 00018 (RCS Rennes / Répertoire des Métiers de Bretagne)<br />
                  <strong>Code APE / NAF :</strong> 96.02B (Soins de beauté à domicile)<br />
                  <strong>TVA :</strong> Franchise en base de TVA selon l'article 293 B du Code Général des Impôts (TVA non applicable).<br />
                  <strong>Courriel :</strong> karinarobart@krbeaute.com<br />
                  <strong>Téléphone :</strong> 06 65 56 67 02
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  2. Qualifications Professionnelles & Assurance
                </h4>
                <p>
                  <strong>Diplôme d'État :</strong> Titulaire du <em>CAP Esthétique Cosmétique et Parfumerie</em>, diplôme officiel délivré par le Ministère de l'Éducation Nationale et de la Jeunesse de la République Française.<br />
                  <strong>Assurance Responsabilité Civile Professionnelle (RCP) :</strong> Souscrite auprès de MMA Assurances Pro, garantissant l'ensemble des dommages matériels et corporels pouvant survenir lors de la réalisation des prestations esthétiques et bien-être au domicile des clientes.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  3. Hébergement du Site Internet
                </h4>
                <p>
                  Le site est hébergé sur les infrastructures sécurisées de :<br />
                  <strong>Google Cloud Platform (Google LLC)</strong><br />
                  1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.<br />
                  Téléphone : +1 650 253 0000.<br />
                  Serveurs situés dans l'Union Européenne (Région Europe-West).
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  4. Propriété Intellectuelle
                </h4>
                <p>
                  L'ensemble des éléments constituant le site (textes, descriptions des protocoles, logo, charte graphique) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, copie ou diffusion non autorisée par écrit est formellement interdite. Les marques citées (Nu Skin, Dr. Renaud, Farmasi, House of Peau) demeurent la propriété exclusive de leurs détenteurs respectifs et sont mentionnées uniquement à titre de transparence sur les produits utilisés.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CONDITIONS GÉNÉRALES DE VENTE (CGV) */}
          {activeTab === 'cgv' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 1 — Objet et Champ d'Application
                </h4>
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent toutes les prestations d'esthétique, de soins du visage, de massages bien-être et de soins des ongles effectuées au domicile du client par Karina Robart dans le secteur de Rennes et ses communes avoisinantes. Toute réservation implique l'acceptation sans réserve de ces conditions.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 2 — Nature des Prestations (Bien-Être Non Thérapeutique)
                </h4>
                <p>
                  Les massages et soins proposés relèvent exclusivement du bien-être, de la détente corporelle et de l'esthétique dermo-cosmétique. En aucun cas ils ne constituent un acte médical ou paramédical relevant de la kinésithérapie (au sens de la loi n° 96-452 du 28 mai 1996). Les protocoles sont strictement dénués de toute connotation érotique ou sexuelle.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 3 — Tarifs et Frais de Déplacement
                </h4>
                <p>
                  Les tarifs des soins sont indiqués en Euros (€) et correspondent à des montants nets (TVA non applicable, art. 293 B du CGI).<br />
                  <strong>Politique de déplacement :</strong>
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>0 à 7 km</strong> autour du centre de Rennes : Déplacement <strong>offert</strong>.</li>
                  <li><strong>7 à 20 km</strong> : Supplément forfaitaire de <strong>5 €</strong> par visite.</li>
                  <li><strong>20 à 30 km</strong> : Supplément forfaitaire de <strong>10 €</strong> par visite.</li>
                  <li><strong>Au-delà de 30 km</strong> : Sur devis préalable accepté.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 4 — Conditions de Réservation, Modification & Report
                </h4>
                <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
                  <li><strong>1. Confirmation du RDV :</strong> Le paiement intégral (par lien de paiement sécurisé ou virement bancaire) est demandé au moment de la réservation. Votre créneau est définitivement bloqué dès réception du règlement.</li>
                  <li><strong>2. Modification & Report :</strong> Possible sans frais au moins <strong>3 heures à l'avance</strong>. Passé ce délai de 3h, la séance ne pourra plus être reportée.</li>
                  <li><strong>3. Politique de Remboursement :</strong> Aucun remboursement n'est effectué après validation. La somme réglée est conservée pour un report ultérieur (si prévenu plus de 3 heures avant).</li>
                  <li><strong>4. Annulation par l'esthéticienne :</strong> Un remboursement intégral sera effectué uniquement si l'esthéticienne ne peut pas se déplacer à votre domicile pour assurer la prestation.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 5 — Préparation chez vous (Obligations d'accueil)
                </h4>
                <p>
                  <strong>5. Préparation chez vous :</strong> Le client s'engage à prévoir un espace calme et dégagé pour installer la chaise de massage ergonomique apportée par l'esthéticienne, ou un équipement confortable à domicile (canapé, fauteuil ou lit pour les soins visage, cils et pieds), ainsi qu'un accès sécurisé à une prise électrique et à un point d'eau. Le client signale avant le soin tout problème de santé, allergie cutanée ou état de grossesse.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 6 — Modalités de Paiement
                </h4>
                <p>
                  Le paiement intégral est exigé lors de la réservation (lien de paiement sécurisé en ligne ou virement bancaire). Une facture acquittée est délivrée par voie électronique.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  Article 7 — Droit de Rétractation & Médiation de la Consommation
                </h4>
                <p>
                  Conformément à l'article L. 221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les services pleinement exécutés avant la fin du délai de rétractation avec l'accord préalable du consommateur. En cas de litige, le consommateur peut recourir gratuitement au service de médiation de la consommation (Centre de Médiation de la Consommation de Conciliateurs de Justice - CM2C).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: POLITIQUE DE CONFIDENTIALITÉ (RGPD) */}
          {activeTab === 'rgpd' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  1. Engagement de Conformité au Règlement Général sur la Protection des Données (RGPD)
                </h4>
                <p>
                  Karina Robart accorde une importance capitale à la protection de la vie privée et des données personnelles de ses clientes. La présente politique détaille les traitements de données réalisés conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  2. Responsable du Traitement
                </h4>
                <p>
                  Le responsable du traitement des données est :<br />
                  <strong>Karina ROBART</strong><br />
                  Courriel : <strong>karinarobart@krbeaute.com</strong> — Tél : 06 65 56 67 02 — 35000 Rennes, France.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  3. Données Collectées et Finalités
                </h4>
                <p>
                  Nous ne collectons que les données strictement indispensables à l'organisation de vos soins à domicile :
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li><strong>Identité & Contact</strong> (Nom, prénom, numéro de téléphone, adresse courriel) : pour confirmer et rappeler les rendez-vous.</li>
                  <li><strong>Adresse postale</strong> (Commune, code postal, adresse du domicile) : pour planifier le déplacement et calculer les éventuels frais kilométriques.</li>
                  <li><strong>Informations esthétiques facultatives</strong> (Sensibilités de peau, allergies déclarées) : pour garantir un protocole sans risque et personnalisé.</li>
                </ul>
                <p className="mt-2">
                  <em>Base juridique du traitement :</em> L'exécution du contrat de prestation de service ou de mesures précontractuelles prises à votre demande.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  4. Destinataires et Absence de Cession
                </h4>
                <p>
                  Vos données sont réservées à l'usage exclusif de Karina Robart. <strong>Aucune donnée n'est vendue, louée ou cédée à des tiers</strong> à des fins publicitaires ou commerciales.
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  5. Durée de Conservation
                </h4>
                <p>
                  Les données de contact sont conservées pendant une durée maximale de 3 ans à compter du dernier contact ou de la dernière prestation réalisée, à l'exception des données de facturation conservées 10 ans en vertu des obligations comptables légales (art. L. 123-22 du Code de commerce).
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  6. Vos Droits (Accès, Rectification, Suppression)
                </h4>
                <p>
                  Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement (« droit à l'oubli »), de limitation et d'opposition au traitement de vos données personnelles.<br />
                  Pour exercer ces droits, adressez simplement votre demande par email à : <strong>karinarobart@krbeaute.com</strong>.<br />
                  Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) sur son site officiel <em>www.cnil.fr</em>.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#D1C4E9]/60 bg-white/70 flex items-center justify-between">
          <span className="text-xs text-[#5D4037]/75">
            Dernière mise à jour réglementaire : {new Date().getFullYear()}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#F9F6F0] bg-[#512D6D] hover:bg-[#402257] rounded-full transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};

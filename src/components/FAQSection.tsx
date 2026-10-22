import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, CreditCard, Clock, Home, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      id: 'confirmation-paiement',
      question: '1. Comment se confirme le rendez-vous ? (Paiement)',
      answer: 'Le paiement intégral (par lien de paiement sécurisé ou par virement bancaire) est demandé au moment de la réservation. Votre créneau horaire est définitivement bloqué dès la réception effective de votre règlement.',
      icon: <CreditCard className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'modification-report',
      question: '2. Est-il possible de modifier ou reporter la séance ?',
      answer: 'Oui, une modification ou un report est possible sans aucun frais au moins 3 heures à l\'avance. Passé ce délai strict de 3 heures, la séance ne pourra plus être reportée.',
      icon: <Clock className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'remboursement',
      question: '3. Quelle est la politique de remboursement ?',
      answer: 'Aucun remboursement n\'est effectué après validation. La somme réglée est intégralement conservée pour un report ultérieur (si vous avez prévenu plus de 3 heures avant l\'heure prévue).',
      icon: <RefreshCw className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'annulation-estheticienne',
      question: '4. Que se passe-t-il en cas d\'annulation par l\'esthéticienne ?',
      answer: 'Un remboursement intégral sera effectué immédiatement si je ne peux pas me déplacer à votre domicile pour assurer la prestation (cas de force majeure, impératif de santé).',
      icon: <AlertCircle className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'preparation-domicile',
      question: '5. Que dois-je prévoir chez moi pour préparer la séance ?',
      answer: 'Merci de prévoir un espace calme et dégagé pour installer le matériel (table ou chaise ergonomique), ainsi qu\'un accès facile à une prise électrique standard et à un point d\'eau.',
      icon: <Home className="w-4 h-4 text-[#512D6D]" />
    },
    {
      id: 'hygiene-cap',
      question: 'Comment garantissez-vous l\'hygiène et la sécurité ?',
      answer: 'Titulaire du CAP Esthétique Cosmétique et Parfumerie, Karina applique des normes hospitalières strictes : désinfection complète de la table / chaise au virucide entre chaque cliente, linge propre stérilisé et instruments sous sachet scellé.',
      icon: <ShieldCheck className="w-4 h-4 text-[#512D6D]" />
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 sm:py-20 bg-[#F9F6F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#512D6D] mb-2">
            <HelpCircle className="w-4 h-4 text-[#512D6D]" />
            <span>Conditions & Questions Fréquentes</span>
            <span aria-hidden="true">·</span>
            <span>Organisation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#5D4037] tracking-tight mb-2 sm:mb-3">
            Conditions de Réservation & FAQ
          </h2>
          <p className="text-xs sm:text-base text-[#5D4037]/80 leading-relaxed max-w-xl mx-auto">
            Afin de vous garantir un moment de détente optimal et une organisation fluide, retrouvez ci-dessous toutes les modalités.
          </p>
        </div>

        {/* Accordion List with >=44px touch targets */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#D1C4E9] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="min-h-[50px] w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D1C4E9]/40 flex items-center justify-center shrink-0">
                      {faq.icon}
                    </div>
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#5D4037]">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#512D6D] shrink-0 border border-[#D1C4E9]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#5D4037]/85 leading-relaxed border-t border-[#D1C4E9]/30 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout */}
        <div className="mt-8 p-4 sm:p-6 bg-[#D1C4E9]/30 rounded-2xl border border-[#D1C4E9] text-center">
          <p className="font-serif italic text-sm text-[#512D6D] font-medium">
            « Merci de votre confiance et au plaisir de prendre soin de vous ! »
          </p>
        </div>

      </div>
    </section>
  );
};

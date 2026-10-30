import React, { useState } from 'react';
import { MessageCircle, ChevronDown, HelpCircle, CreditCard, Clock, Home, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PaymentDetailsCard } from './PaymentDetailsCard';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(t.faq.whatsappGreeting)}`;

  const icons: Record<string, React.ReactNode> = {
    'confirmation-paiement': <CreditCard className="w-4 h-4 text-[#512D6D]" />,
    'modification-report': <Clock className="w-4 h-4 text-[#512D6D]" />,
    'remboursement': <RefreshCw className="w-4 h-4 text-[#512D6D]" />,
    'annulation-estheticienne': <AlertCircle className="w-4 h-4 text-[#512D6D]" />,
    'preparation-domicile': <Home className="w-4 h-4 text-[#512D6D]" />,
    'hygiene-cap': <ShieldCheck className="w-4 h-4 text-[#512D6D]" />
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-12 bg-[#F9F6F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Split Layout */}
        <div className="kr-reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#D1C4E9]/40">
          <div>
            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8B2651] mb-1.5">
              {t.faq.kicker}
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#5D4037] tracking-tight">
              {t.faq.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#5D4037]/80 leading-relaxed max-w-xl">
              {t.faq.subtitle}
            </p>
          </div>

          {/* Right Action: Quick Question Link -> WhatsApp */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${t.faq.askBtn} sur WhatsApp`}
            aria-label={`${t.faq.askBtn} sur WhatsApp`}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] bg-white hover:bg-[#FDF8FA] border border-[#512D6D]/30 text-[#512D6D] rounded-full text-xs sm:text-[13px] font-semibold shadow-2xs hover:shadow-xs transition-all shrink-0 self-start md:self-auto cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.faq.askBtn}</span>
          </a>
        </div>

        {/* Accordion List with >=44px touch targets */}
        <div className="space-y-3">
          {t.faq.items.map((faq, index) => {
            const isOpen = openIndex === index;
            const icon = icons[faq.id] || <HelpCircle className="w-4 h-4 text-[#512D6D]" />;

            return (
              <div
                key={faq.id}
                className="kr-card-nacre bg-white rounded-2xl border border-[#D1C4E9] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="min-h-[50px] w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D1C4E9]/40 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      {icon}
                    </div>
                    <span className="font-serif text-[15px] sm:text-base font-semibold text-[#5D4037] group-hover:text-[#512D6D] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#512D6D] text-white border-[#512D6D]'
                      : 'bg-[#F9F6F0] text-[#512D6D] border-[#D1C4E9] group-hover:bg-[#D1C4E9]/30'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <div
                  aria-hidden={!isOpen}
                  inert={!isOpen ? true : undefined}
                  className={`kr-accordion-grid ${isOpen ? 'is-open' : ''}`}
                >
                  <div className="kr-accordion-inner">
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-sm sm:text-base text-[#5D4037]/85 leading-relaxed border-t border-[#D1C4E9]/30 mt-1">
                      <p className="pt-3">{faq.answer}</p>
                      {faq.id === 'confirmation-paiement' && (
                        <div className="mt-4">
                          <PaymentDetailsCard />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout */}
        <div className="mt-8 p-4 sm:p-6 bg-[#D1C4E9]/30 rounded-2xl border border-[#D1C4E9] text-center">
          <p className="font-serif italic text-sm text-[#512D6D] font-medium">
            {t.faq.callout}
          </p>
        </div>

      </div>
    </section>
  );
};

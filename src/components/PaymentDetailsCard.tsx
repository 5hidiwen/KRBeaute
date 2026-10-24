import React, { useState } from 'react';
import { Smartphone, Building2, Copy, Check, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PaymentDetailsCardProps {
  compact?: boolean;
  className?: string;
}

export const PaymentDetailsCard: React.FC<PaymentDetailsCardProps> = ({
  compact = false,
  className = ''
}) => {
  const { t } = useLanguage();
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('0665566702');
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      // Fallback
    }
  };

  const transferWhatsAppUrl = `https://wa.me/33665566702?text=${encodeURIComponent(t.paymentDetails.transferWhatsAppMsg)}`;

  return (
    <div
      className={`rounded-3xl border-2 border-[#D1C4E9] bg-gradient-to-br from-[#F4EFF8] via-white to-[#EAE2F2]/70 p-4 sm:p-6 shadow-sm ${className}`}
    >
      {/* Header banner inspired by the official flyer */}
      <div className="text-center pb-3 mb-4 border-b border-[#D1C4E9]/70">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#512D6D]/10 text-[#512D6D] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-[#512D6D]" />
          <span>{t.paymentDetails.kicker}</span>
        </div>
        <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#512D6D] tracking-tight">
          {t.paymentDetails.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-[#5D4037]/80 mt-1 max-w-md mx-auto leading-relaxed">
          {t.paymentDetails.subtitle}
        </p>
      </div>

      {/* 2 Payment Methods Grid */}
      <div className={`grid grid-cols-1 ${compact ? 'gap-3' : 'sm:grid-cols-2 gap-3.5 sm:gap-4'}`}>
        
        {/* Method 1: Wero (Paiement instantané mobile sans frais) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D1C4E9] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EAE2F2] to-[#D1C4E9] flex items-center justify-center text-[#512D6D] shrink-0 shadow-2xs">
                  <Smartphone className="w-4 h-4 text-[#512D6D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">
                    {t.paymentDetails.weroTitle}
                  </h4>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Instantané & sans frais
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 py-2 px-3 bg-[#F9F6F0] rounded-xl border border-[#D1C4E9]/60 text-center">
              <p className="text-[11px] text-[#5D4037]/70 font-medium">Numéro de mobile associé :</p>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#512D6D] tracking-wider mt-0.5">
                {t.paymentDetails.weroPhone}
              </p>
            </div>

            <p className="text-[11px] sm:text-xs text-[#5D4037]/80 leading-relaxed mt-2.5">
              {t.paymentDetails.weroSub}
            </p>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#D1C4E9]/40 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPhone}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#512D6D]/10 hover:bg-[#512D6D]/20 text-[#512D6D] text-xs font-bold transition-colors cursor-pointer"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.paymentDetails.weroCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.paymentDetails.weroAction}</span>
                </>
              )}
            </button>
            <a
              href="tel:+33665566702"
              className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-[#512D6D] hover:bg-[#402257] text-white text-xs font-bold shadow-2xs transition-colors"
            >
              Appeler
            </a>
          </div>
        </div>

        {/* Method 2: Virement Bancaire Revolut PRO (Sécurisé, sans exposition publique d'IBAN) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D1C4E9] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EAE2F2] to-[#D1C4E9] flex items-center justify-center text-[#512D6D] shrink-0 shadow-2xs">
                  <Building2 className="w-4 h-4 text-[#512D6D]" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#512D6D]">
                    {t.paymentDetails.transferTitle}
                  </h4>
                  <span className="text-[10px] font-bold text-[#512D6D] bg-[#D1C4E9]/40 px-2 py-0.5 rounded-full">
                    {t.paymentDetails.bankName}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs text-[#5D4037]">
              <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#D1C4E9]/60">
                <p className="text-[11px] text-[#5D4037]/80 font-medium">
                  {t.paymentDetails.beneficiaryLabel} <strong className="text-[#512D6D] font-bold">{t.paymentDetails.beneficiaryVal}</strong>
                </p>
                <div className="mt-2 pt-2 border-t border-[#D1C4E9]/40 flex items-start gap-1.5 text-[11px] text-[#5D4037]/85 leading-snug">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.paymentDetails.transferSub}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#D1C4E9]/40">
            <a
              href={transferWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] rounded-full bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{t.paymentDetails.transferAction}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Flyer Footer Note */}
      <div className="mt-3.5 pt-2.5 border-t border-[#D1C4E9]/60 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-[#5D4037]/75 text-center sm:text-left">
        <span className="font-medium">{t.paymentDetails.siretText}</span>
        <span className="font-serif italic font-semibold text-[#512D6D]">{t.paymentDetails.trustNote}</span>
      </div>
    </div>
  );
};

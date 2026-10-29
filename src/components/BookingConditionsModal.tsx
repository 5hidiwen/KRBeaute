import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BookingConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingConditionsModal: React.FC<BookingConditionsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { t } = useLanguage();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const card = t.contact.leftCard;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-conditions-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#F9F6F0] rounded-3xl border border-[#D1C4E9] shadow-2xl flex flex-col overflow-hidden text-[#5D4037]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 sm:px-6 py-4 border-b border-[#D1C4E9]/60 bg-white/80">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#8B2651] block mb-0.5">
              {card.kicker}
            </span>
            <h3 id="booking-conditions-title" className="font-serif text-lg sm:text-2xl font-bold text-[#512D6D] tracking-tight">
              {card.title}
            </h3>
            <p className="font-serif italic text-xs sm:text-sm text-[#8B2651] font-semibold mt-0.5">
              {card.sub}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center -mr-2 text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-[#D1C4E9]/40 rounded-full transition-colors cursor-pointer"
            aria-label={card.modalCloseBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with smooth scrolling */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <p className="text-xs sm:text-[13px] text-[#5D4037]/90 leading-relaxed bg-[#D1C4E9]/20 p-3 rounded-xl border border-[#D1C4E9]/40">
            {card.intro}
          </p>

          <ol className="space-y-3.5 text-xs sm:text-sm text-[#5D4037]">
            {card.points.map((pt) => (
              <li key={pt.num} className="flex items-start gap-3 bg-white p-3.5 rounded-2xl border border-[#D1C4E9]/60 shadow-2xs">
                <span className="w-6 h-6 rounded-full bg-[#512D6D] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                  {pt.num}
                </span>
                <div>
                  <strong className="text-[#512D6D] uppercase font-bold text-[12px] sm:text-[13px] tracking-wide block mb-0.5">
                    {pt.title}
                  </strong>
                  <p className="text-[#5D4037]/90 text-[12px] sm:text-[13px] leading-relaxed">
                    {pt.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Reassurance Callout */}
          <div className="pt-2 text-center">
            <p className="font-serif italic text-xs sm:text-sm text-[#512D6D] font-medium">
              {card.callout}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#D1C4E9]/60 bg-white/80 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#512D6D] hover:bg-[#402257] active:scale-98 text-white text-xs sm:text-sm font-bold shadow-xs transition-transform cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{card.modalCloseBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

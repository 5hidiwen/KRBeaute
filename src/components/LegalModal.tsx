import React, { useState, useEffect } from 'react';
import { X, FileText, Scale, Lock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  // Synchronize activeTab whenever modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

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

  const leg = t.legal;

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
                {leg.modalTitle}
              </h3>
              <p className="text-xs text-[#5D4037]/70">
                {leg.modalSub}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-[#D1C4E9]/40 rounded-full transition-colors cursor-pointer"
            aria-label={leg.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation - Fixed 3 equal columns for zero layout shift & stable sizing */}
        <div className="grid grid-cols-3 border-b border-[#D1C4E9]/60 bg-[#D1C4E9]/20 px-2 sm:px-6 gap-1 sm:gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('mentions')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer text-center truncate ${
              activeTab === 'mentions'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl shadow-xs'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-white/40 rounded-t-lg'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span className="sm:hidden truncate">Mentions</span>
            <span className="hidden sm:inline truncate">{leg.tabs.mentions}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cgv')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer text-center truncate ${
              activeTab === 'cgv'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl shadow-xs'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-white/40 rounded-t-lg'
            }`}
          >
            <Scale className="w-4 h-4 shrink-0" />
            <span className="sm:hidden truncate">CGV</span>
            <span className="hidden sm:inline truncate">{leg.tabs.cgv}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rgpd')}
            className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer text-center truncate ${
              activeTab === 'rgpd'
                ? 'border-[#512D6D] text-[#512D6D] bg-[#F9F6F0] rounded-t-xl shadow-xs'
                : 'border-transparent text-[#5D4037]/70 hover:text-[#512D6D] hover:bg-white/40 rounded-t-lg'
            }`}
          >
            <Lock className="w-4 h-4 shrink-0" />
            <span className="sm:hidden truncate">RGPD</span>
            <span className="hidden sm:inline truncate">{leg.tabs.rgpd}</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-140px)] text-xs sm:text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: MENTIONS LÉGALES */}
          {activeTab === 'mentions' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.mentions.editorTitle}
                </h4>
                <p>
                  {leg.mentions.editorContent.intro}<br />
                  <strong>{leg.mentions.editorContent.name}</strong><br />
                  <strong>{leg.mentions.editorContent.statusLabel}</strong> {leg.mentions.editorContent.statusVal}<br />
                  <strong>{leg.mentions.editorContent.seatLabel}</strong> {leg.mentions.editorContent.seatVal}<br />
                  <strong>{leg.mentions.editorContent.siretLabel}</strong> {leg.mentions.editorContent.siretVal}<br />
                  <strong>{leg.mentions.editorContent.apeLabel}</strong> {leg.mentions.editorContent.apeVal}<br />
                  <strong>{leg.mentions.editorContent.vatLabel}</strong> {leg.mentions.editorContent.vatVal}<br />
                  <strong>{leg.mentions.editorContent.emailLabel}</strong> karinarobart@krbeaute.com<br />
                  <strong>{leg.mentions.editorContent.phoneLabel}</strong> 06 65 56 67 02
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.mentions.qualificationsTitle}
                </h4>
                <p>
                  <strong>{leg.mentions.qualificationsDiplomaLabel}</strong> {leg.mentions.qualificationsDiplomaVal}<br />
                  <strong>{leg.mentions.qualificationsInsurLabel}</strong> {leg.mentions.qualificationsInsurVal}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.mentions.hostingTitle}
                </h4>
                <p>
                  {leg.mentions.hostingVal}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.mentions.ipTitle}
                </h4>
                <p>
                  {leg.mentions.ipVal}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CONDITIONS GÉNÉRALES DE VENTE (CGV) */}
          {activeTab === 'cgv' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art1Title}
                </h4>
                <p>
                  {leg.cgv.art1Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art2Title}
                </h4>
                <p>
                  {leg.cgv.art2Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art3Title}
                </h4>
                <p>
                  {leg.cgv.art3Intro}
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {leg.cgv.art3Items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art4Title}
                </h4>
                <ul className="list-disc list-inside space-y-1.5 leading-relaxed">
                  {leg.cgv.art4Items.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.bold}</strong> {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art5Title}
                </h4>
                <p>
                  {leg.cgv.art5Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art6Title}
                </h4>
                <p>
                  {leg.cgv.art6Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.cgv.art7Title}
                </h4>
                <p>
                  {leg.cgv.art7Val}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: POLITIQUE DE CONFIDENTIALITÉ (RGPD) */}
          {activeTab === 'rgpd' && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec1Title}
                </h4>
                <p>
                  {leg.rgpd.sec1Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec2Title}
                </h4>
                <p>
                  {leg.rgpd.sec2Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec3Title}
                </h4>
                <p>
                  {leg.rgpd.sec3Intro}
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {leg.rgpd.sec3Items.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.bold}</strong> {item.text}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">
                  <em>{leg.rgpd.sec3LegalBasis}</em>
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec4Title}
                </h4>
                <p>
                  {leg.rgpd.sec4Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec5Title}
                </h4>
                <p>
                  {leg.rgpd.sec5Val}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#512D6D] mb-2">
                  {leg.rgpd.sec6Title}
                </h4>
                <p>
                  {leg.rgpd.sec6Val}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#D1C4E9]/60 bg-white/70 flex items-center justify-between">
          <span className="text-xs text-[#5D4037]/75">
            {leg.lastUpdate} {new Date().getFullYear()}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#F9F6F0] bg-[#512D6D] hover:bg-[#402257] rounded-full transition-colors cursor-pointer"
          >
            {leg.closeBtn}
          </button>
        </div>

      </div>
    </div>
  );
};

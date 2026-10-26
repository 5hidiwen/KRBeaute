export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactSubmission(formData: {
  name: string;
  phone: string;
  commune: string;
  botcheck?: string;
  termsAccepted: boolean;
}): FormValidationResult {
  const errors: Record<string, string> = {};

  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Nom requis';
  }
  if (!formData.phone || formData.phone.trim().length === 0) {
    errors.phone = 'Téléphone requis';
  }
  if (!formData.termsAccepted) {
    errors.terms = 'Consentement requis';
  }
  if (formData.botcheck && formData.botcheck.trim().length > 0) {
    errors.bot = 'Détection bot anti-spam';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

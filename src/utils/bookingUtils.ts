import { ContactTranslations } from '../i18n/types';

export interface BookingData {
  name: string;
  phone?: string;
  email?: string;
  commune: string;
  serviceTitle: string;
  preferredDate?: string;
  preferredTimeSlot: string;
  message?: string;
}

export function getSlotLabel(
  slotKey: string,
  slots: ContactTranslations['rightCard']['slots']
): string {
  if (slotKey === 'morning') return slots.morning;
  if (slotKey === 'noon') return slots.noon;
  if (slotKey === 'afternoon') return slots.afternoon;
  if (slotKey === 'evening') return slots.evening;
  return slotKey;
}

/**
 * Construit l'URL WhatsApp de prise de rendez-vous KRbeauté
 * Cible officielle : https://wa.me/33665566702
 */
export function buildWhatsAppBookingUrl(
  formData: BookingData,
  t: { contact: ContactTranslations }
): string {
  const wt = t.contact.whatsappTemplate;
  const slotText = getSlotLabel(formData.preferredTimeSlot, t.contact.rightCard.slots);
  const dateText = formData.preferredDate || wt.toAgree;
  const nameText = formData.name || wt.clientDefault;

  const text = encodeURIComponent(
    `${wt.greeting}\n\n${wt.intro}\n` +
    `${wt.service} ${formData.serviceTitle}\n` +
    `${wt.location} ${formData.commune}\n` +
    `${wt.slot} ${dateText} (${slotText})\n` +
    `${wt.name} ${nameText}\n` +
    (formData.message ? `${wt.precision} ${formData.message}\n` : '') +
    `\n${wt.closing}`
  );
  return `https://wa.me/33665566702?text=${text}`;
}

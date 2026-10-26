import { Language } from '../i18n/types';

export interface CommuneItem {
  name: string;
  postalCode: string;
  distanceKm: number;
  feeEuro: number;
  isOffered: boolean;
  notes?: string;
}

export const COMMUNES_DATA: CommuneItem[] = [
  // Rayon 0 - 7 km : DÉPLACEMENT OFFERT / DESPLAZAMIENTO GRATIS
  { name: 'Rennes Centre & Quartiers', postalCode: '35000', distanceKm: 0, feeEuro: 0, isOffered: true },
  { name: 'Rennes Sud / Bréquigny', postalCode: '35200', distanceKm: 3, feeEuro: 0, isOffered: true },
  { name: 'Rennes Nord / Beauregard', postalCode: '35700', distanceKm: 4, feeEuro: 0, isOffered: true },
  { name: 'Rennes Est / Jeanne d’Arc', postalCode: '35700', distanceKm: 4, feeEuro: 0, isOffered: true },
  { name: 'Saint-Grégoire', postalCode: '35760', distanceKm: 5, feeEuro: 0, isOffered: true },
  { name: 'Saint-Jacques-de-la-Lande', postalCode: '35136', distanceKm: 5, feeEuro: 0, isOffered: true },
  { name: 'Cesson-Sévigné', postalCode: '35510', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Chantepie', postalCode: '35135', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Vezin-le-Coquet', postalCode: '35132', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Montgermont', postalCode: '35760', distanceKm: 7, feeEuro: 0, isOffered: true },

  // Rayon 7 - 12 km : FORFAIT 8,50 €
  { name: 'Pacé', postalCode: '35740', distanceKm: 8, feeEuro: 8.5, isOffered: false },
  { name: 'Betton', postalCode: '35830', distanceKm: 9, feeEuro: 8.5, isOffered: false },
  { name: 'Le Rheu', postalCode: '35650', distanceKm: 9, feeEuro: 8.5, isOffered: false },
  { name: 'Noyal-Châtillon-sur-Seiche', postalCode: '35230', distanceKm: 9, feeEuro: 8.5, isOffered: false },
  { name: 'Chartres-de-Bretagne', postalCode: '35131', distanceKm: 11, feeEuro: 8.5, isOffered: false },
  { name: 'Thorigné-Fouillard', postalCode: '35235', distanceKm: 11, feeEuro: 8.5, isOffered: false },
  { name: 'La Chapelle-des-Fougeretz', postalCode: '35520', distanceKm: 11, feeEuro: 8.5, isOffered: false },
  { name: 'Vern-sur-Seiche', postalCode: '35770', distanceKm: 12, feeEuro: 8.5, isOffered: false },
  { name: 'Bruz', postalCode: '35170', distanceKm: 12, feeEuro: 8.5, isOffered: false },
  { name: 'Saint-Gilles', postalCode: '35590', distanceKm: 12, feeEuro: 8.5, isOffered: false }
];

export function getFeeForDistance(distanceKm: number, lang: Language = 'fr'): { fee: number; isOffered: boolean; label: string } {
  if (lang === 'es') {
    if (distanceKm <= 7) {
      return { fee: 0, isOffered: true, label: 'Traslado sin costo (hasta 7 km)' };
    } else if (distanceKm <= 12) {
      return { fee: 8.5, isOffered: false, label: '+8,5 € (Tarifa fija 7-12 km)' };
    } else {
      return { fee: 0, isOffered: false, label: 'No cubierto actualmente (> 12 km)' };
    }
  }

  // French default
  if (distanceKm <= 7) {
    return { fee: 0, isOffered: true, label: 'Déplacement offert (jusqu\'à 7 km)' };
  } else if (distanceKm <= 12) {
    return { fee: 8.5, isOffered: false, label: '+8,5 € (Forfait 7-12 km)' };
  } else {
    return { fee: 0, isOffered: false, label: 'Non desservi actuellement (> 12 km)' };
  }
}

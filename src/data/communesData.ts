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
  { name: 'Saint-Grégoire', postalCode: '35760', distanceKm: 5, feeEuro: 0, isOffered: true },
  { name: 'Saint-Jacques-de-la-Lande', postalCode: '35136', distanceKm: 5, feeEuro: 0, isOffered: true },
  { name: 'Cesson-Sévigné', postalCode: '35510', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Chantepie', postalCode: '35135', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Vezin-le-Coquet', postalCode: '35132', distanceKm: 6, feeEuro: 0, isOffered: true },
  { name: 'Montgermont', postalCode: '35760', distanceKm: 7, feeEuro: 0, isOffered: true },

  // Rayon 7 - 20 km : FORFAIT 5 €
  { name: 'Pacé', postalCode: '35740', distanceKm: 8, feeEuro: 5, isOffered: false },
  { name: 'Betton', postalCode: '35830', distanceKm: 9, feeEuro: 5, isOffered: false },
  { name: 'Le Rheu', postalCode: '35650', distanceKm: 9, feeEuro: 5, isOffered: false },
  { name: 'Noyal-Châtillon-sur-Seiche', postalCode: '35230', distanceKm: 9, feeEuro: 5, isOffered: false },
  { name: 'Chartres-de-Bretagne', postalCode: '35131', distanceKm: 11, feeEuro: 5, isOffered: false },
  { name: 'Thorigné-Fouillard', postalCode: '35235', distanceKm: 11, feeEuro: 5, isOffered: false },
  { name: 'La Chapelle-des-Fougeretz', postalCode: '35520', distanceKm: 11, feeEuro: 5, isOffered: false },
  { name: 'Vern-sur-Seiche', postalCode: '35770', distanceKm: 12, feeEuro: 5, isOffered: false },
  { name: 'Bruz', postalCode: '35170', distanceKm: 12, feeEuro: 5, isOffered: false },
  { name: 'Acigné', postalCode: '35690', distanceKm: 13, feeEuro: 5, isOffered: false },
  { name: 'Pont-Péan', postalCode: '35131', distanceKm: 14, feeEuro: 5, isOffered: false },
  { name: 'L’Hermitage', postalCode: '35590', distanceKm: 14, feeEuro: 5, isOffered: false },
  { name: 'Saint-Erblon', postalCode: '35230', distanceKm: 14, feeEuro: 5, isOffered: false },
  { name: 'Mordelles', postalCode: '35310', distanceKm: 15, feeEuro: 5, isOffered: false },
  { name: 'Chevaigné', postalCode: '35250', distanceKm: 15, feeEuro: 5, isOffered: false },
  { name: 'Orgères', postalCode: '35230', distanceKm: 16, feeEuro: 5, isOffered: false },
  { name: 'Melesse', postalCode: '35520', distanceKm: 16, feeEuro: 5, isOffered: false },
  { name: 'La Mézière', postalCode: '35520', distanceKm: 17, feeEuro: 5, isOffered: false },
  { name: 'Châteaugiron', postalCode: '35410', distanceKm: 18, feeEuro: 5, isOffered: false },

  // Rayon 20 - 30 km : FORFAIT 10 €
  { name: 'Liffré', postalCode: '35340', distanceKm: 22, feeEuro: 10, isOffered: false },
  { name: 'Guichen', postalCode: '35580', distanceKm: 23, feeEuro: 10, isOffered: false },
  { name: 'Janzé', postalCode: '35150', distanceKm: 25, feeEuro: 10, isOffered: false },
  { name: 'Montfort-sur-Meu', postalCode: '35160', distanceKm: 26, feeEuro: 10, isOffered: false },
  { name: 'Bain-de-Bretagne', postalCode: '35470', distanceKm: 33, feeEuro: 15, isOffered: false, notes: 'Sur devis (> 30 km)' }
];

export function getFeeForDistance(distanceKm: number, lang: Language = 'fr'): { fee: number; isOffered: boolean; label: string } {
  if (lang === 'es') {
    if (distanceKm <= 7) {
      return { fee: 0, isOffered: true, label: 'Desplazamiento gratis (hasta 7 km)' };
    } else if (distanceKm <= 20) {
      return { fee: 5, isOffered: false, label: '+5 € (Tarifa fija 7-20 km)' };
    } else if (distanceKm <= 30) {
      return { fee: 10, isOffered: false, label: '+10 € (Tarifa fija 20-30 km)' };
    } else {
      return { fee: 15, isOffered: false, label: 'Bajo presupuesto (> 30 km)' };
    }
  }

  // French default
  if (distanceKm <= 7) {
    return { fee: 0, isOffered: true, label: 'Déplacement offert (jusqu\'à 7 km)' };
  } else if (distanceKm <= 20) {
    return { fee: 5, isOffered: false, label: '+5 € (Forfait 7-20 km)' };
  } else if (distanceKm <= 30) {
    return { fee: 10, isOffered: false, label: '+10 € (Forfait 20-30 km)' };
  } else {
    return { fee: 15, isOffered: false, label: 'Sur devis (> 30 km)' };
  }
}

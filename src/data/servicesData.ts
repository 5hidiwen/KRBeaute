export interface ServiceItem {
  id: string;
  category: 'visage' | 'regard' | 'pieds' | 'corps';
  group: 'visage-regard' | 'pieds-corps';
  title: string;
  tagline: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: number;
  comprend?: string[];
  protocolSteps?: string[];
  badge?: string;
  colorTheme?: 'plum' | 'pink' | 'cyan';
}

export const SERVICES: ServiceItem[] = [
  // --- PARTIE 1 : PIEDS & CORPS (Flyer 1) ---
  {
    id: 'beaute-des-pieds',
    category: 'pieds',
    group: 'pieds-corps',
    title: 'Beauté des pieds',
    tagline: 'Ongles nets, exfoliation & hydratation profonde',
    description: 'Soin express et soigné pour retrouver des pieds doux, soignés et légers au quotidien.',
    duration: '45 min',
    durationMinutes: 45,
    price: 35,
    colorTheme: 'plum',
    comprend: [
      'Coupe des ongles',
      'Élimination des callosités',
      'Exfoliation',
      'Hydratation profonde',
      'Petit massage avec appareil masseur'
    ]
  },
  {
    id: 'soin-des-pieds',
    category: 'pieds',
    group: 'pieds-corps',
    title: 'Soin des pieds',
    tagline: 'Nettoyage en profondeur, masque & massage japonais 10 min',
    description: 'Le rituel d’excellence pour une rénovation complète des pieds et un délassement intense.',
    duration: '1 h',
    durationMinutes: 60,
    price: 50,
    badge: 'Complet & Relaxant',
    colorTheme: 'plum',
    comprend: [
      'Nettoyage en profondeur',
      'Coupe des ongles',
      'Élimination des callosités',
      'Exfoliation',
      'Hydratation nourrissante',
      'Masque nourrissant',
      'Massage des pieds de 10 min avec technique japonaise'
    ]
  },
  {
    id: 'modelage-en-chaise',
    category: 'corps',
    group: 'pieds-corps',
    title: 'Modelage en chaise',
    tagline: 'Massage assis ergonomique : épaules, nuque & bras',
    description: 'Massage décontractant sur chaise ergonomique professionnelle apportée chez vous pour dénouer immédiatement le haut du corps sans déshabillage.',
    duration: '20 min',
    durationMinutes: 20,
    price: 30,
    badge: 'Détente Express',
    colorTheme: 'plum',
    comprend: [
      'Massage doux, épaules, nuque et bras',
      'Détente musculaire',
      'Soulagement des tensions',
      'Bien-être immédiat'
    ]
  },

  // --- PARTIE 2 : VISAGE & REGARD (Flyer 2) ---
  {
    id: 'rehaussement-teinte-cils',
    category: 'regard',
    group: 'visage-regard',
    title: 'Rehaussement + Teinte de Cils',
    tagline: 'Regard sublimé, courbure naturelle & teinture longue durée',
    description: 'Rehaussement délicat des cils naturels cil à cil dès la racine combiné à une teinture noire/brune intense pour ouvrir le regard sans mascara pendant 6 à 8 semaines.',
    duration: '60 min',
    durationMinutes: 60,
    price: 45,
    badge: 'Sublimateur de Regard',
    colorTheme: 'pink',
    protocolSteps: [
      'Diagnostic personnalisé et choix du galbe adapté à vos yeux',
      'Nettoyage et pose délicate des patchs hydrogel protecteurs',
      'Fixation de la courbure cil à cil sur pads ergonomiques en silicone',
      'Application de la teinture douce pour une intensité regard sans maquillage',
      'Soin nourrissant fortifiant et brossage soigné'
    ]
  },
  {
    id: 'soin-visage-purete-absolue',
    category: 'visage',
    group: 'visage-regard',
    title: 'Soin du Visage Pureté Absolue',
    tagline: 'Nettoyage profond, désincrustation & pureté éclat',
    description: 'Soin nettoyant désincrustant et rééquilibrant express pour clarifier le grain de peau, éliminer les toxines et resserrer les pores.',
    duration: '30 min',
    durationMinutes: 30,
    price: 45,
    colorTheme: 'cyan',
    protocolSteps: [
      'Double nettoyage doux adapté à votre typologie cutanée',
      'Gommage enzymatique dermo-nettoyant',
      'Désincrustation douce et élimination ciblée des impuretés',
      'Masque purifiant et rééquilibrant',
      'Application d’un soin hydratant matifiant et protecteur'
    ]
  },
  {
    id: 'soin-visage-douceur-gelee',
    category: 'visage',
    group: 'visage-regard',
    title: 'Soin du Visage Douceur Gelée',
    tagline: 'Bain de fraîcheur apaisant au masque hydro-gelée sensoriel',
    description: 'Soin cocon ultra-frais et réconfortant formulé pour désaltérer, apaiser les rougeurs et repulper l’épiderme grâce à la texture enveloppante du masque gelée.',
    duration: '45 min',
    durationMinutes: 45,
    price: 55,
    badge: 'Cocon Sensoriel',
    colorTheme: 'cyan',
    protocolSteps: [
      'Nettoyage démaquillant velouté aux effluves botaniques',
      'Exfoliation douce pour préparer la peau à l’assimilation',
      'Modelage relaxant décongestionnant du visage, cou et trapèzes',
      'Pose du masque hydro-gelée ultra-frais aux pétales actifs',
      'Crème de finition soyeuse régénérante'
    ]
  },
  {
    id: 'soin-visage-detox',
    category: 'visage',
    group: 'visage-regard',
    title: 'Soin du Visage Detox',
    tagline: 'Oxygénation cutanée, dermo-purification & éclat ravivé',
    description: 'Soin détoxifiant utilisant des vibrations douces de spatule dermo-purifiante pour déloger en profondeur les toxines, stimuler le renouvellement et redonner tout son éclat au teint.',
    duration: '45 min',
    durationMinutes: 45,
    price: 55,
    colorTheme: 'pink',
    protocolSteps: [
      'Préparation détoxifiante et brumisation tonifiante',
      'Passage doux de la spatule ultrasonique désincrustante',
      'Drainage manuel liftant pour drainer les toxines tissulaires',
      'Masque oxygénant éclat immédiat',
      'Sérum protecteur antioxydant et crème hydratante velours'
    ]
  }
];

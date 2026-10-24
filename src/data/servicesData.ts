import { Language } from '../i18n/types';

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

export const SERVICES_FR: ServiceItem[] = [
  // --- PARTIE 1 : PIEDS & CORPS ---
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

  // --- PARTIE 2 : VISAGE & REGARD ---
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

export const SERVICES_ES: ServiceItem[] = [
  // --- PARTE 1 : PIES Y RELAJACIÓN ---
  {
    id: 'beaute-des-pieds',
    category: 'pieds',
    group: 'pieds-corps',
    title: 'Belleza de pies',
    tagline: 'Uñas impecables, exfoliación e hidratación profunda',
    description: 'Cuidado exprés y minucioso para lucir pies suaves, saludables y descansados en tu día a día.',
    duration: '45 min',
    durationMinutes: 45,
    price: 35,
    colorTheme: 'plum',
    comprend: [
      'Corte y limado de uñas',
      'Eliminación de asperezas y callosidades',
      'Exfoliación suavizante',
      'Hidratación profunda',
      'Breve masaje con aparato especializado'
    ]
  },
  {
    id: 'soin-des-pieds',
    category: 'pieds',
    group: 'pieds-corps',
    title: 'Cuidado completo de pies',
    tagline: 'Limpieza profunda, mascarilla y masaje japonés de 10 min',
    description: 'El ritual ideal para consentir y renovar tus pies por completo con un alivio reconfortante.',
    duration: '1 h',
    durationMinutes: 60,
    price: 50,
    badge: 'Completo y Relajante',
    colorTheme: 'plum',
    comprend: [
      'Limpieza profunda',
      'Corte y limado de uñas',
      'Eliminación de asperezas y callosidades',
      'Exfoliación renovadora',
      'Hidratación nutritiva intensiva',
      'Mascarilla regeneradora',
      'Masaje de pies de 10 min con técnica tradicional japonesa'
    ]
  },
  {
    id: 'modelage-en-chaise',
    category: 'corps',
    group: 'pieds-corps',
    title: 'Masaje en silla ergonómica',
    tagline: 'Masaje sentado ergonómico: hombros, cuello y brazos',
    description: 'Masaje descontracturante en silla ergonómica profesional en la comodidad de tu casa para liberar la tensión en hombros, cuello y espalda, sin necesidad de desvestirte.',
    duration: '20 min',
    durationMinutes: 20,
    price: 30,
    badge: 'Relajación Exprés',
    colorTheme: 'plum',
    comprend: [
      'Masaje relajante en hombros, cuello y brazos',
      'Alivio y descanso muscular',
      'Liberación de tensiones acumuladas',
      'Sensación inmediata de bienestar y ligereza'
    ]
  },

  // --- PARTE 2 : ROSTRO Y MIRADA ---
  {
    id: 'rehaussement-teinte-cils',
    category: 'regard',
    group: 'visage-regard',
    title: 'Lifting + Tinte de Pestañas',
    tagline: 'Mirada abierta, curvatura natural y tinte de larga duración',
    description: 'Lifting delicado de pestañas naturales pestaña por pestaña desde la raíz, combinado con un tinte negro o castaño intenso para abrir tu mirada sin necesidad de rímel durante 6 a 8 semanas.',
    duration: '60 min',
    durationMinutes: 60,
    price: 45,
    badge: 'Realce de Mirada',
    colorTheme: 'pink',
    protocolSteps: [
      'Diagnóstico personalizado y elección de la curvatura ideal para tus ojos',
      'Limpieza y colocación suave de parches de hidrogel protectores',
      'Fijación de la curvatura pestaña por pestaña sobre moldes ergonómicos de silicona',
      'Aplicación de tinte suave para una mirada intensa y definida sin rímel',
      'Tratamiento nutritivo fortalecedor y peinado cuidadoso'
    ]
  },
  {
    id: 'soin-visage-purete-absolue',
    category: 'visage',
    group: 'visage-regard',
    title: 'Tratamiento Facial Pureza Absoluta',
    tagline: 'Limpieza profunda, desincrustación y luminosidad pura',
    description: 'Facial limpiador, desincrustante y reequilibrante exprés para afinar la textura de la piel, eliminar impurezas y cerrar los poros.',
    duration: '30 min',
    durationMinutes: 30,
    price: 45,
    colorTheme: 'cyan',
    protocolSteps: [
      'Doble limpieza suave adaptada a tu tipo de piel',
      'Exfoliación enzimática dermo-purificante',
      'Desincrustación suave y extracción selectiva de impurezas',
      'Mascarilla purificante y reequilibrante',
      'Aplicación de crema hidratante matificante y protectora'
    ]
  },
  {
    id: 'soin-visage-douceur-gelee',
    category: 'visage',
    group: 'visage-regard',
    title: 'Tratamiento Facial Suavidad Gelée',
    tagline: 'Baño de frescura calmante con mascarilla hidro-gelée sensorial',
    description: 'Facial reconfortante y ultra fresco diseñado para hidratar a profundidad, calmar rojeces y redensificar tu piel gracias a la textura sensorial de la mascarilla gelée.',
    duration: '45 min',
    durationMinutes: 45,
    price: 55,
    badge: 'Shot de Frescura',
    colorTheme: 'cyan',
    protocolSteps: [
      'Limpieza desmaquillante aterciopelada con extractos botánicos',
      'Exfoliación suave para preparar la piel para la asimilación de activos',
      'Masaje relajante descongestionante de rostro, cuello y trapecios',
      'Aplicación de la mascarilla hidro-gelée ultra fresca con pétalos activos',
      'Crema final sedosa y regeneradora'
    ]
  },
  {
    id: 'soin-visage-detox',
    category: 'visage',
    group: 'visage-regard',
    title: 'Tratamiento Facial Detox',
    tagline: 'Oxigenación cutánea, dermo-purificación y luminosidad renovada',
    description: 'Facial desintoxicante con espátula ultrasónica para eliminar impurezas a profundidad, oxigenar los tejidos y devolver el glow y la frescura a tu piel.',
    duration: '45 min',
    durationMinutes: 45,
    price: 55,
    colorTheme: 'pink',
    protocolSteps: [
      'Preparación desintoxicante y bruma tonificante',
      'Paso suave de la espátula ultrasónica desincrustante',
      'Drenaje manual tensor para facilitar la eliminación de toxinas',
      'Mascarilla oxigenante de luminosidad inmediata',
      'Sérum protector antioxidante y crema hidratante aterciopelada'
    ]
  }
];

export const getServices = (lang: Language): ServiceItem[] => {
  return lang === 'es' ? SERVICES_ES : SERVICES_FR;
};

// Default export for backward compatibility
export const SERVICES: ServiceItem[] = SERVICES_FR;

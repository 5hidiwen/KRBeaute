import { Language } from '../i18n/types';

export interface ServiceItem {
  id: string;
  category: 'visage' | 'regard' | 'pieds' | 'corps';
  group: 'visage-regard' | 'pieds-corps';
  title: string;
  tagline: string;
  description: string;
  idealFor: string;
  benefits: string[];
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
    idealFor: 'Vous souhaitez retrouver des pieds doux, nets et légers en 45 minutes.',
    benefits: ['✨ Ongles soignés', '💧 Peau adoucie', '🪶 Légèreté'],
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
    description: 'Le rituel complet pour une rénovation soignée des pieds et un délassement profond.',
    idealFor: 'Vos pieds sont fatigués ou secs et réclament une régénération profonde avec massage.',
    benefits: ['🌸 Nutrition intense', '💆‍♀️ Massage japonais', '🪶 Délassement'],
    duration: '1 h',
    durationMinutes: 60,
    price: 55,
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
    tagline: 'Massage assis ergonomique : dos haut et bas, épaules, bras, nuque & cuir chevelu',
    description: 'Massage décontractant sur chaise ergonomique professionnelle apportée chez vous pour dénouer immédiatement le haut du corps sans déshabillage.',
    idealFor: 'Vous ressentez des tensions dans la nuque, les épaules ou le dos et cherchez un lâcher-prise express.',
    benefits: ['💆‍♀️ Dos & nuque', '⚡ Détente immédiate', '🪑 Sans déshabillage'],
    duration: '20 min',
    durationMinutes: 20,
    price: 35,
    badge: 'Détente Express',
    colorTheme: 'plum',
    comprend: [
      'Massage dos haut et bas, épaules, bras, nuque et cuir chevelu',
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
    description: 'Rehaussement délicat des cils naturels cil à cil dès la racine combiné à une teinture noire/brune intense pour ouvrir le regard sans mascara pendant 4 à 6 semaines selon le diagnostic réalisé au début de la séance.',
    idealFor: 'Vous rêvez d’un regard ouvert, courbe et intensifié dès le réveil sans toucher au mascara.',
    benefits: ['👁️ Regard ouvert', '⏳ Tenue 4 à 6 sem.', '✨ Sans mascara'],
    duration: '1 h',
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
    idealFor: 'Votre peau a besoin de respirer, de resserrer ses pores et de retrouver un grain net en 30 minutes.',
    benefits: ['🌿 Pores purifiés', '✨ Grain affiné', '⚡ Express 30 min'],
    duration: '30 min',
    durationMinutes: 30,
    price: 45,
    colorTheme: 'cyan',
    protocolSteps: [
      'Double nettoyage doux adapté à votre typologie cutanée',
      'Gommage à double action',
      'Masque purifiant et rééquilibrant',
      'Application d’un soin adapté'
    ]
  },
  {
    id: 'soin-visage-douceur-gelee',
    category: 'visage',
    group: 'visage-regard',
    title: 'Soin du Visage Douceur Gelée',
    tagline: 'Bain de fraîcheur apaisant au masque hydro-gelée sensoriel',
    description: 'Soin cocon ultra-frais et réconfortant formulé pour désaltérer, apaiser les rougeurs et repulper l’épiderme grâce à la texture enveloppante du masque gelée.',
    idealFor: 'Votre peau tiraille, rougit facilement ou manque d’eau et cherche un bain de douceur apaisant.',
    benefits: ['💧 Hydratation', '🌸 Anti-rougeurs', '✨ Peau repulpée'],
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
    idealFor: 'Votre teint paraît terne ou brouillé par la fatigue et la pollution, et manque d’oxygénation.',
    benefits: ['🫧 Détox profonde', '💎 Spatule ultrasons', '🌟 Éclat ravivé'],
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
    idealFor: 'Deseas lucir unos pies suaves, impecables y ligeros en poco tiempo.',
    benefits: ['✨ Uñas impecables', '💧 Piel suave', '🪶 Ligereza'],
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
    idealFor: 'Tus pies están cansados o secos y buscas una renovación completa y relajante.',
    benefits: ['🌸 Nutrición intensa', '💆‍♀️ Masaje japonés', '🪶 Descanso total'],
    duration: '1 h',
    durationMinutes: 60,
    price: 55,
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
    tagline: 'Masaje sentado ergonómico: espalda alta y baja, hombros, brazos, cuello y cuero cabelludo',
    description: 'Masaje descontracturante en silla ergonómica profesional en la comodidad de tu casa para liberar la tensión en hombros, cuello y espalda, sin necesidad de desvestirte.',
    idealFor: 'Sientes tensión en hombros, cuello o espalda y quieres relajarte sin desvestirte.',
    benefits: ['💆‍♀️ Espalda y nuca', '⚡ Alivio inmediato', '🪑 Sin desvestirse'],
    duration: '20 min',
    durationMinutes: 20,
    price: 35,
    badge: 'Relajación Exprés',
    colorTheme: 'plum',
    comprend: [
      'Masaje en espalda alta y baja, hombros, brazos, cuello y cuero cabelludo',
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
    description: 'Lifting delicado de pestañas naturales pestaña por pestaña desde la raíz, combinado con un tinte negro o castaño intenso para abrir tu mirada sin necesidad de rímel durante 4 a 6 semanas dependiendo del diagnóstico realizado al inicio de la sesión.',
    idealFor: 'Quieres despertar cada mañana con una mirada abierta y luminosa sin usar rímel.',
    benefits: ['👁️ Mirada abierta', '⏳ 4 a 6 semanas', '✨ Cero rímel'],
    duration: '1 h',
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
    idealFor: 'Tu piel necesita respirar, afinar los poros y recuperar su frescura en 30 minutos.',
    benefits: ['🌿 Poros limpios', '✨ Textura afinada', '⚡ Exprés 30 min'],
    duration: '30 min',
    durationMinutes: 30,
    price: 45,
    colorTheme: 'cyan',
    protocolSteps: [
      'Doble limpieza suave adaptada a tu tipo de piel',
      'Exfoliación suave de doble acción',
      'Mascarilla purificante y reequilibrante',
      'Aplicación de un tratamiento adaptado'
    ]
  },
  {
    id: 'soin-visage-douceur-gelee',
    category: 'visage',
    group: 'visage-regard',
    title: 'Tratamiento Facial Suavidad Gelée',
    tagline: 'Baño de frescura calmante con mascarilla hidro-gelée sensorial',
    description: 'Facial reconfortante y ultra fresco diseñado para hidratar a profundidad, calmar rojeces y redensificar tu piel gracias a la textura sensorial de la mascarilla gelée.',
    idealFor: 'Tu piel se siente tirante, sensible o fatigada y necesita un baño de hidratación calmante.',
    benefits: ['💧 Hidratación', '🌸 Calma rojeces', '✨ Efecto relleno'],
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
    idealFor: 'Notas el rostro apagado por el estrés o la contaminación y buscas luminosidad inmediata.',
    benefits: ['🫧 Dermo-oxigenación', '💎 Ultrasonidos', '🌟 Luminosidad'],
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

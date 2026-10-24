export type Language = 'fr' | 'es';

export interface NavTranslations {
  brandRole: string;
  tabs: {
    accueil: string;
    soins: string;
    secteur: string;
    secteurShort: string;
    marques: string;
    marquesShort: string;
    aPropos: string;
    aProposShort: string;
    faq: string;
    contact: string;
  };
  call: string;
  callAria: string;
  whatsapp: string;
  whatsappAria: string;
  bookWhatsApp: string;
}

export interface HeroTranslations {
  certifiedKicker: string;
  googleReviewsBadge: string;
  title: string;
  description: string;
  quickAccess: string;
  hours: string;
  bookWhatsApp: string;
  callNumber: string;
  viewServices: string;
  bookAppointment: string;
  exploreMenu: string;
  advantages: {
    freeTravel: string;
    freeTravelBold: string;
    massageChair: string;
    massageChairBold: string;
    certifiedCare: string;
    certifiedCareBold: string;
  };
  showcase: {
    tag: string;
    city: string;
    serenityTitle: string;
    serenityDesc: string;
    authorRole: string;
    quote: string;
  };
}

export interface ServicesTranslations {
  kicker: string;
  title: string;
  subtitle: string;
  filters: {
    all: string;
    visageRegard: string;
    piedsCorps: string;
  };
  categories: {
    regard: string;
    visage: string;
    pieds: string;
    corps: string;
  };
  sectionVisage: string;
  sectionVisageCount: string;
  sectionPieds: string;
  sectionPiedsCount: string;
  viewProtocol: string;
  hideProtocol: string;
  viewIncluded: string;
  hideIncluded: string;
  protocolTitle: string;
  includedTitle: string;
  reserveBtn: string;
  comboTitle: string;
  comboDesc: string;
  comboBtn: string;
}

export interface BrandsTranslations {
  kicker: string;
  title: string;
  subtitle: string;
  farmasiShop: string;
  brands: {
    nuSkin: {
      badge: string;
      category: string;
      desc: string;
      footer: string;
    };
    drRenaud: {
      badge: string;
      category: string;
      desc: string;
      footer: string;
    };
    farmasi: {
      badge: string;
      category: string;
      desc: string;
      footer: string;
      shopBtn: string;
    };
    houseOfPeau: {
      badge: string;
      category: string;
      desc: string;
      footer: string;
    };
  };
  tech: {
    microcurrent: {
      tag: string;
      note: string;
      title: string;
      desc: string;
    };
    led: {
      tag: string;
      note: string;
      title: string;
      desc: string;
    };
  };
}

export interface AboutTranslations {
  photoAlt: string;
  badgeCap: string;
  roleSubtitle: string;
  certTitle: string;
  certSub: string;
  verified: string;
  kicker: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  pillars: {
    kindnessTitle: string;
    kindnessDesc: string;
    hygieneTitle: string;
    hygieneDesc: string;
    privacyTitle: string;
    privacyDesc: string;
  };
}

export interface LogisticsTranslations {
  kicker: string;
  title: string;
  subtitle: string;
  badge: {
    free: string;
    from5: string;
  };
  zones: {
    zone1Title: string;
    zone1Sub: string;
    zone1Tag: string;
    zone2Title: string;
    zone2Sub: string;
    zone2Tag: string;
    zone3Title: string;
    zone3Sub: string;
    zone3Tag: string;
  };
  searchPrompt: string;
  searchPlaceholder: string;
  distanceLabel: string;
  feeLabel: string;
  feeFree: string;
  infoHours: string;
  infoHoursBold: string;
  infoSpace: string;
  infoSpaceBold: string;
  perTripNote: string;
}

export interface FAQItemTranslation {
  id: string;
  question: string;
  answer: string;
}

export interface FAQTranslations {
  kicker: string;
  title: string;
  subtitle: string;
  askBtn: string;
  items: FAQItemTranslation[];
  callout: string;
}

export interface ContactTranslations {
  leftCard: {
    kicker: string;
    title: string;
    sub: string;
    intro: string;
    points: Array<{
      num: number;
      title: string;
      text: string;
    }>;
    callout: string;
    freeZone: string;
  };
  rightCard: {
    fastest: string;
    whatsappBanner: string;
    whatsappClick: string;
    callTitle: string;
    formTitle: string;
    formSub: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    communeLabel: string;
    freeOffered: string;
    serviceLabel: string;
    dateLabel: string;
    slotLabel: string;
    slots: {
      morning: string;
      noon: string;
      afternoon: string;
      evening: string;
    };
    msgLabel: string;
    msgPlaceholder: string;
    termsLabel: string;
    termsBold: string;
    submitBtn: string;
    submittingBtn: string;
    errorTitle: string;
    errorGeneric: string;
    whatsappBtn: string;
    success: {
      thanks: string;
      body: string;
      confirmWhatsApp: string;
      newRequest: string;
    };
  };
  whatsappTemplate: {
    greeting: string;
    intro: string;
    service: string;
    location: string;
    slot: string;
    toAgree: string;
    name: string;
    clientDefault: string;
    precision: string;
    closing: string;
  };
}

export interface FooterTranslations {
  appointmentOnly: string;
  mentions: string;
  cgv: string;
  rgpd: string;
  farmasiShop: string;
  copyrightDiploma: string;
  languageSelect: string;
}

export interface LegalTranslations {
  modalTitle: string;
  modalSub: string;
  tabs: {
    mentions: string;
    cgv: string;
    rgpd: string;
  };
  closeBtn: string;
  lastUpdate: string;
  mentions: {
    editorTitle: string;
    editorContent: {
      intro: string;
      name: string;
      statusLabel: string;
      statusVal: string;
      seatLabel: string;
      seatVal: string;
      siretLabel: string;
      siretVal: string;
      apeLabel: string;
      apeVal: string;
      vatLabel: string;
      vatVal: string;
      emailLabel: string;
      phoneLabel: string;
    };
    qualificationsTitle: string;
    qualificationsDiplomaLabel: string;
    qualificationsDiplomaVal: string;
    qualificationsInsurLabel: string;
    qualificationsInsurVal: string;
    hostingTitle: string;
    hostingVal: string;
    ipTitle: string;
    ipVal: string;
  };
  cgv: {
    art1Title: string;
    art1Val: string;
    art2Title: string;
    art2Val: string;
    art3Title: string;
    art3Intro: string;
    art3Items: string[];
    art4Title: string;
    art4Items: Array<{ bold: string; text: string }>;
    art5Title: string;
    art5Val: string;
    art6Title: string;
    art6Val: string;
    art7Title: string;
    art7Val: string;
  };
  rgpd: {
    sec1Title: string;
    sec1Val: string;
    sec2Title: string;
    sec2Val: string;
    sec3Title: string;
    sec3Intro: string;
    sec3Items: Array<{ bold: string; text: string }>;
    sec3LegalBasis: string;
    sec4Title: string;
    sec4Val: string;
    sec5Title: string;
    sec5Val: string;
    sec6Title: string;
    sec6Val: string;
  };
}

export interface HomeTranslations {
  experience: {
    kicker: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    googleRatingText: string;
    googleRatingSub: string;
    transparencyNotice: string;
    openGoogleBtn: string;
    leaveReviewBtn: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  ctaBanner: {
    title: string;
    subtitle: string;
    hours: string;
    whatsappBtn: string;
    callBtn: string;
  };
}

export interface SiteTranslations {
  htmlLang: string;
  metaTitle: string;
  metaDescription: string;
  nav: NavTranslations;
  hero: HeroTranslations;
  home: HomeTranslations;
  services: ServicesTranslations;
  brands: BrandsTranslations;
  about: AboutTranslations;
  logistics: LogisticsTranslations;
  faq: FAQTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
  legal: LegalTranslations;
}

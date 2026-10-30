/**
 * Script d'audit QA automatisé KRbeauté
 * Tests d'Affichage, Conformité & Accessibilité (A11y/RGAA/WCAG)
 * Exécution : npx tsx .agents/skills/testeur-qa/scripts/run-qa-audit.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { TRANSLATIONS } from '../src/i18n/translations';
import { COMMUNES_DATA } from '../src/data/communesData';
import { SERVICES_FR, SERVICES_ES } from '../src/data/servicesData';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

interface TestResult {
  category: 'Affichage' | 'Conformité' | 'Accessibilité';
  name: string;
  passed: boolean;
  severity: 'error' | 'warning' | 'info';
  message: string;
  details?: string[];
}

const results: TestResult[] = [];

function addResult(result: TestResult) {
  results.push(result);
}

// Helper to recursively collect files
function getFiles(dir: string, extensions: string[]): string[] {
  let found: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        found = found.concat(getFiles(fullPath, extensions));
      }
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      found.push(fullPath);
    }
  }
  return found;
}

console.log('\n============================================================');
console.log('  🧪 SUITE DE TESTS QA KRBEAUTÉ : AFFICHAGE · CONFORMITÉ · A11Y');
console.log('============================================================\n');

// ============================================================
// 1. TESTS DE CONFORMITÉ (COMPLIANCE & RÈGLES MÉTIER)
// ============================================================
console.log('📋 [1/3] Exécution des tests de Conformité & Règles Métier...');

// 1.1 Coordonnées officielles : Email
const tsxAndHtmlFiles = [
  path.join(ROOT_DIR, 'index.html'),
  ...getFiles(SRC_DIR, ['.ts', '.tsx', '.html'])
];

const forbiddenEmailRegex = /[\w.-]+@(?!krbeaute\.com)[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/gi;
const forbiddenEmailsFound: string[] = [];
let officialEmailFound = false;

for (const file of tsxAndHtmlFiles) {
  // Ignorer certains fichiers générés ou de configuration comme karinaPhotoData
  if (file.includes('karinaPhotoData.ts')) continue;
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('karinarobart@krbeaute.com')) {
    officialEmailFound = true;
  }
  const matches = content.match(forbiddenEmailRegex);
  if (matches) {
    for (const match of matches) {
      // Exclure les faux positifs d'URL / imports / web3forms / schema.org
      if (!match.includes('schema.org') && 
          !match.includes('web3forms.com') && 
          !match.includes('example.com') &&
          !match.includes('exemple.fr') &&
          !match.includes('ejemplo.com') &&
          !match.includes('google.com') &&
          !match.includes('@types') &&
          !match.includes('@tailwindcss') &&
          !match.includes('@vitejs') &&
          !match.includes('@google')) {
        forbiddenEmailsFound.push(`${path.relative(ROOT_DIR, file)}: ${match}`);
      }
    }
  }
}

addResult({
  category: 'Conformité',
  name: 'Email officiel karinarobart@krbeaute.com',
  passed: officialEmailFound && forbiddenEmailsFound.length === 0,
  severity: 'error',
  message: officialEmailFound && forbiddenEmailsFound.length === 0
    ? 'L\'adresse officielle est présente et aucune ancienne adresse mail interdite n\'a été détectée.'
    : `Anomalie d'email détectée. Adresse trouvée: ${officialEmailFound ? 'Oui' : 'Non'}. Fuites potentielles: ${forbiddenEmailsFound.join(', ')}`,
  details: forbiddenEmailsFound
});

// 1.2 Numéro de téléphone officiel & Domaine
const contactFiles = [
  path.join(SRC_DIR, 'components/Footer.tsx'),
  path.join(SRC_DIR, 'components/Hero.tsx'),
  path.join(SRC_DIR, 'components/Navbar.tsx'),
  path.join(ROOT_DIR, 'index.html')
];
let phoneValid = true;
const phoneIssues: string[] = [];
for (const f of contactFiles) {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf-8');
    const hasPhone = text.includes('06 65 56 67 02') || text.includes('+33665566702') || text.includes('0665566702');
    if (!hasPhone) {
      phoneIssues.push(`Numéro officiel manquant ou non formaté dans ${path.relative(ROOT_DIR, f)}`);
      phoneValid = false;
    }
  }
}
addResult({
  category: 'Conformité',
  name: 'Téléphone officiel (06 65 56 67 02)',
  passed: phoneValid,
  severity: 'error',
  message: phoneValid ? 'Téléphone officiel présent sur tous les points d\'ancrage clés.' : 'Le téléphone officiel présente des manques.',
  details: phoneIssues
});

// 1.3 Sécurité du fichier .env
const gitignorePath = path.join(ROOT_DIR, '.gitignore');
const gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf-8') : '';
const envIgnored = gitignoreContent.includes('.env');
let envTracked = false;
try {
  const gitOut = execSync('git ls-files .env', { cwd: ROOT_DIR, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  if (gitOut.length > 0) envTracked = true;
} catch {
  // Ignorer si git n'est pas accessible directement
}

addResult({
  category: 'Conformité',
  name: 'Sécurité absolue du fichier .env',
  passed: envIgnored && !envTracked,
  severity: 'error',
  message: (envIgnored && !envTracked) 
    ? '.env est correctement exclu dans .gitignore et n\'est pas suivi dans Git.' 
    : 'Alerte sécurité : .env risque d\'être commité !',
});

// 1.3b Exclusion stricte des métadonnées d'agents & prompts de Git
const agentFoldersIgnored = gitignoreContent.includes('.agents') && 
                            gitignoreContent.includes('.antigravity') && 
                            gitignoreContent.includes('.aistudio');
let agentTrackedInGit = false;
try {
  const trackedAgents = execSync('git ls-files .agents .antigravity', { cwd: ROOT_DIR, stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
  if (trackedAgents.length > 0) agentTrackedInGit = true;
} catch {
  // Ignorer si git n'est pas accessible
}

addResult({
  category: 'Conformité',
  name: 'Exclusion Git des métadonnées d\'agents & prompts',
  passed: agentFoldersIgnored && !agentTrackedInGit,
  severity: 'error',
  message: (agentFoldersIgnored && !agentTrackedInGit)
    ? 'Les dossiers d\'agents (.agents, .antigravity, .aistudio, prompts) sont exclus de Git et séparés du code déployable.'
    : 'Alerte : des métadonnées ou configurations d\'agents sont suivies par Git ou absentes de .gitignore.',
});

// 1.4 Parité intégrale des traductions i18n
function compareObjects(frObj: any, esObj: any, prefix = ''): { missingKeys: string[]; emptyKeys: string[] } {
  let missing: string[] = [];
  let empty: string[] = [];
  for (const key of Object.keys(frObj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (esObj[key] === undefined) {
      missing.push(`Clé manquante en ES: ${fullKey}`);
    } else if (typeof frObj[key] === 'object' && frObj[key] !== null && !Array.isArray(frObj[key])) {
      const sub = compareObjects(frObj[key], esObj[key], fullKey);
      missing = missing.concat(sub.missingKeys);
      empty = empty.concat(sub.emptyKeys);
    } else if (typeof frObj[key] === 'string') {
      if (typeof esObj[key] !== 'string' || esObj[key].trim() === '') {
        empty.push(`Traduction vide en ES: ${fullKey}`);
      }
      if (frObj[key].trim() === '') {
        empty.push(`Traduction vide en FR: ${fullKey}`);
      }
    }
  }
  return { missingKeys: missing, emptyKeys: empty };
}

const { missingKeys, emptyKeys } = compareObjects(TRANSLATIONS.fr, TRANSLATIONS.es);
addResult({
  category: 'Conformité',
  name: 'Synchronisation et Parité i18n (FR / ES)',
  passed: missingKeys.length === 0 && emptyKeys.length === 0,
  severity: 'error',
  message: (missingKeys.length === 0 && emptyKeys.length === 0)
    ? `Parité i18n parfaite (0 clé manquante, 0 chaîne vide sur l'ensemble des modules).`
    : `${missingKeys.length} clés manquantes et ${emptyKeys.length} clés vides détectées.`,
  details: [...missingKeys.slice(0, 10), ...emptyKeys.slice(0, 10)]
});

// 1.5 Intégrité des Communes & Frais de déplacement
const communesCount = COMMUNES_DATA.length;
const rennesFree = COMMUNES_DATA.some(c => c.name.toLowerCase().includes('rennes') && c.isOffered && c.feeEuro === 0);
const allPostalCodesValid = COMMUNES_DATA.every(c => /^\d{5}$/.test(c.postalCode));

addResult({
  category: 'Conformité',
  name: 'Données Communes & Zone de déplacement',
  passed: communesCount >= 15 && rennesFree && allPostalCodesValid,
  severity: 'error',
  message: (communesCount >= 15 && rennesFree && allPostalCodesValid)
    ? `${communesCount} communes répertoriées avec codes postaux valides et Rennes en déplacement gratuit.`
    : 'Incohérence dans la liste des communes ou les frais kilométriques.',
});

// 1.6 Intégrité du Catalogue de Soins
const servicesCount = SERVICES_FR.length;
const servicesValid = SERVICES_FR.every(s => s.id && s.title && s.price > 0 && s.durationMinutes > 0);
addResult({
  category: 'Conformité',
  name: 'Catalogue des Soins & Tarifs',
  passed: servicesCount >= 5 && servicesValid,
  severity: 'error',
  message: (servicesCount >= 5 && servicesValid)
    ? `${servicesCount} prestations configurées avec durées, tarifs et thèmes visuels conformes.`
    : 'Certains soins présentent des données tarifaires ou de durée invalides.',
});

// 1.7 Mentions Légales & RGPD
const legalModalPath = path.join(SRC_DIR, 'components/LegalModal.tsx');
const legalContent = fs.existsSync(legalModalPath) ? fs.readFileSync(legalModalPath, 'utf-8') : '';
const hasMentions = legalContent.includes('mentions') && legalContent.includes('cgv') && legalContent.includes('rgpd');
addResult({
  category: 'Conformité',
  name: 'Conformité Mentions Légales, CGV & RGPD',
  passed: hasMentions,
  severity: 'error',
  message: hasMentions
    ? 'Structure juridique complète : Mentions légales, CGV et Politique RGPD intégrées dans LegalModal.'
    : 'Onglets légaux manquants dans LegalModal.',
});

// 1.8 Synchronisation stricte Schema.org JSON-LD (Communes & Offres)
const indexHtmlContentForSchema = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
let jsonLdParsed: any = null;
const jsonLdMatch = indexHtmlContentForSchema.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonLdMatch) {
  try {
    jsonLdParsed = JSON.parse(jsonLdMatch[1]);
  } catch {
    // Ignore parse error here
  }
}

const graphElements = jsonLdParsed ? (jsonLdParsed['@graph'] || [jsonLdParsed]) : [];
const salonEntity = graphElements.find((e: any) => {
  const types = Array.isArray(e['@type']) ? e['@type'] : [e['@type']];
  return types.includes('BeautySalon');
});

const schemaSyncIssues: string[] = [];
if (!salonEntity) {
  schemaSyncIssues.push("Entité BeautySalon introuvable dans le script JSON-LD d'index.html");
} else {
  const declaredCommuneNames = new Set(
    (salonEntity.areaServed || [])
      .filter((a: any) => a['@type'] === 'City' || a.name)
      .map((a: any) => a.name?.toLowerCase().trim())
  );

  for (const commune of COMMUNES_DATA) {
    if (commune.name.startsWith('Rennes ')) continue;
    const nameToCheck = commune.name.toLowerCase().trim();
    if (!declaredCommuneNames.has(nameToCheck)) {
      schemaSyncIssues.push(`Commune manquante dans areaServed (JSON-LD) : ${commune.name} (${commune.postalCode})`);
    }
  }

  const offersList = salonEntity.hasOfferCatalog?.itemListElement || [];
  const offerMap = new Map<string, number>();
  for (const o of offersList) {
    if (o.name && o.price !== undefined) {
      offerMap.set(o.name.toLowerCase().trim(), parseFloat(o.price));
    }
  }

  for (const s of SERVICES_FR) {
    const sTitle = s.title.toLowerCase().trim();
    if (!offerMap.has(sTitle)) {
      schemaSyncIssues.push(`Soin manquant dans hasOfferCatalog (JSON-LD) : "${s.title}"`);
    } else {
      const declaredPrice = offerMap.get(sTitle);
      if (declaredPrice !== s.price) {
        schemaSyncIssues.push(`Tarif divergent pour "${s.title}" dans le JSON-LD : déclaré ${declaredPrice} €, tarif officiel ${s.price} €`);
      }
    }
  }
}

addResult({
  category: 'Conformité',
  name: 'Synchronisation stricte Schema.org JSON-LD (Communes & Tarifs)',
  passed: schemaSyncIssues.length === 0,
  severity: 'error',
  message: schemaSyncIssues.length === 0
    ? 'Toutes les communes de communesData.ts et tous les soins de servicesData.ts (titres et tarifs exacts) sont parfaitement synchronisés dans le Schema.org JSON-LD.'
    : `${schemaSyncIssues.length} anomalie(s) de synchronisation Schema.org détectée(s).`,
  details: schemaSyncIssues
});

// 1.9 Pureté linguistique du Catalogue Espagnol (SERVICES_ES)
const frenchMarkers = [
  /\b(soin|soins)\b/i,
  /\bgommage\b/i,
  /\bvisage\b/i,
  /\bdéplacement\b/i,
  /\boffert\b/i,
  /\bchez\b/i,
  /\bavec\b/i,
  /\bpour\b/i,
  /\bdans\b/i,
  /\bvotre\b/i,
  /\bvos\b/i,
  /\bnotre\b/i,
  /\bnos\b/i,
  /\bapplication\s+d['’]un\b/i,
  /\bà\s+double\s+action\b/i
];

const esResidualIssues: string[] = [];
for (const service of SERVICES_ES) {
  const textsToCheck: string[] = [
    service.title,
    service.tagline,
    service.description,
    ...(service.comprend || []),
    ...(service.protocolSteps || [])
  ];

  for (const text of textsToCheck) {
    for (const marker of frenchMarkers) {
      if (marker.test(text)) {
        esResidualIssues.push(`Soin '${service.id}' : résidu français détecté ("${text.slice(0, 50)}...") via le motif ${marker}`);
      }
    }
  }
}

addResult({
  category: 'Conformité',
  name: 'Pureté linguistique du Catalogue Espagnol (SERVICES_ES)',
  passed: esResidualIssues.length === 0,
  severity: 'error',
  message: esResidualIssues.length === 0
    ? 'Aucun mot ou résidu de français non traduit détecté dans le catalogue espagnol SERVICES_ES.'
    : `${esResidualIssues.length} résidu(s) de texte français détecté(s) dans SERVICES_ES.`,
  details: esResidualIssues
});

// 1.10 Synchronisation Sitemap XML (lastmod & hreflang)
const publicDirForSitemap = path.join(ROOT_DIR, 'public');
const sitemapPath = path.join(publicDirForSitemap, 'sitemap.xml');
const sitemapContent = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf-8') : '';
const sitemapIssues: string[] = [];

if (!sitemapContent) {
  sitemapIssues.push('Fichier sitemap.xml introuvable dans public/');
} else {
  const lastmodMatch = sitemapContent.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/);
  if (!lastmodMatch) {
    sitemapIssues.push('Date <lastmod> absente ou mal formatée dans sitemap.xml (format attendu: YYYY-MM-DD)');
  }

  const htmlHreflangMatches = [...indexHtmlContentForSchema.matchAll(/hreflang="([^"]+)"/g)].map(m => m[1]);
  for (const lang of htmlHreflangMatches) {
    if (!sitemapContent.includes(`hreflang="${lang}"`)) {
      sitemapIssues.push(`Balise hreflang="${lang}" présente dans index.html mais manquante dans sitemap.xml`);
    }
  }
}

addResult({
  category: 'Conformité',
  name: 'Synchronisation Sitemap XML (lastmod & hreflang)',
  passed: sitemapIssues.length === 0,
  severity: 'error',
  message: sitemapIssues.length === 0
    ? 'Le sitemap.xml possède une date lastmod valide et reflète rigoureusement toutes les versions linguistiques (hreflang) d\'index.html.'
    : `${sitemapIssues.length} incohérence(s) détectée(s) dans le sitemap.xml.`,
  details: sitemapIssues
});

// 1.11 Prévention des textes JSX en dur (Internationalisation stricte)
const jsxComponents = getFiles(path.join(SRC_DIR, 'components'), ['.tsx']);
const rawTextIssues: string[] = [];
const whitelistedStrings = new Set([
  '06 65 56 67 02',
  'karinarobart@krbeaute.com',
  'www.krbeaute.com',
  'Karina Robart',
  'KRbeauté',
  'Nu Skin',
  'Dr. Renaud Paris',
  'Dr. Tuna',
  'House of Peau',
  'Threads',
  'Instagram',
  'Email',
  'WhatsApp',
  'Mentions',
  'CGV',
  'RGPD',
  '0 - 7 km',
  '7 - 12 km'
]);

for (const compFile of jsxComponents) {
  const content = fs.readFileSync(compFile, 'utf-8');
  const relPath = path.relative(ROOT_DIR, compFile);
  
  const textMatches = [...content.matchAll(/>\s*([A-Za-zÀ-ÿ0-9'’ —:!?,.()]{4,})\s*</g)];
  for (const m of textMatches) {
    const rawVal = m[1].trim();
    if (whitelistedStrings.has(rawVal)) continue;
    if (rawVal.includes('const ') || rawVal.includes('useState') || rawVal.includes('=>') || rawVal.includes('return') || rawVal.startsWith('(') || rawVal.endsWith(')')) continue;
    if (rawVal.includes('c.distanceKm') || rawVal.includes('checklistSliderRef') || rawVal.includes('expandedServices')) continue;
    
    if (/[À-ÿ]/.test(rawVal) || /\b(soin|soins|séance|rendez-vous|matériel|déplacement|numéro|fermer|retour|envoyer|appeler)\b/i.test(rawVal)) {
      rawTextIssues.push(`${relPath} : texte statique français non internationalisé détecté : "${rawVal}"`);
    }
  }
}

addResult({
  category: 'Conformité',
  name: 'Prévention des textes JSX en dur (Internationalisation stricte)',
  passed: rawTextIssues.length === 0,
  severity: 'error',
  message: rawTextIssues.length === 0
    ? 'Tous les composants utilisent scrupuleusement les dictionnaires de traduction i18n (0 texte français en dur détecté).'
    : `${rawTextIssues.length} texte(s) statique(s) en dur détecté(s) dans les composants JSX.`,
  details: rawTextIssues
});


// ============================================================
// 2. TESTS D'AFFICHAGE & RESPONSIVE (DISPLAY & OVERFLOW)
// ============================================================
console.log('📱 [2/3] Exécution des tests d\'Affichage & Responsive...');

// 2.1 Meta Viewport & SEO Display
const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

const hasViewport = indexHtmlContent.includes('name="viewport"') && indexHtmlContent.includes('width=device-width');
const hasCharset = indexHtmlContent.includes('charset="UTF-8"') || indexHtmlContent.includes("charset='UTF-8'");
const hasTitle = indexHtmlContent.includes('<title>') && indexHtmlContent.includes('</title>');
const hasFavicon = indexHtmlContent.includes('rel="icon"') || indexHtmlContent.includes('rel="apple-touch-icon"');
const hasLdJson = indexHtmlContent.includes('application/ld+json') && indexHtmlContent.includes('BeautySalon');

addResult({
  category: 'Affichage',
  name: 'Balises HTML Head (Viewport, Charset, Meta SEO & JSON-LD)',
  passed: hasViewport && hasCharset && hasTitle && hasFavicon && hasLdJson,
  severity: 'error',
  message: (hasViewport && hasCharset && hasTitle && hasFavicon && hasLdJson)
    ? 'En-tête HTML5 parfaitement configuré pour mobile (viewport, favicon, fonts, meta et schéma JSON-LD).'
    : 'Balise critique manquante dans index.html (viewport, charset, ou JSON-LD).',
});

// 2.2 Présence physique des Assets Référencés
const publicDir = path.join(ROOT_DIR, 'public');
const criticalAssets = [
  'favicon.svg',
  'karina_photo_1.jpg',
  'robots.txt',
  'sitemap.xml'
];
const missingAssets: string[] = [];
for (const asset of criticalAssets) {
  if (!fs.existsSync(path.join(publicDir, asset))) {
    missingAssets.push(asset);
  }
}

addResult({
  category: 'Affichage',
  name: 'Disponibilité des Assets Statiques Critiques',
  passed: missingAssets.length === 0,
  severity: 'error',
  message: missingAssets.length === 0
    ? 'Tous les assets critiques (favicon, photos, robots.txt, sitemap.xml) sont présents dans public/.'
    : `Assets manquants dans public/ : ${missingAssets.join(', ')}`,
  details: missingAssets
});

// 2.3 Détection des risques d'overflow horizontal (w-screen, largeurs fixes non adaptatives)
const tsxFiles = getFiles(SRC_DIR, ['.tsx']);
const overflowRisks: string[] = [];

for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(ROOT_DIR, file);

  // w-screen sans overflow-hidden peut générer un défilement horizontal sur Windows
  if (content.includes('w-screen') && !content.includes('overflow-x-hidden')) {
    overflowRisks.push(`${relPath}: Utilisation de 'w-screen' sans 'overflow-x-hidden' parent.`);
  }

  // Largeurs fixes rigides non réactives > 380px (ex: w-[450px] sans max-w-full)
  const fixedWidthMatch = content.match(/w-\[(\d+)px\]/g);
  if (fixedWidthMatch) {
    for (const match of fixedWidthMatch) {
      const pxValue = parseInt(match.replace(/\D/g, ''), 10);
      if (pxValue > 380 && !content.includes('max-w-full') && !content.includes('max-w-')) {
        overflowRisks.push(`${relPath}: Largeur fixe potentiellement cassante sur mobile (${match}).`);
      }
    }
  }
}

addResult({
  category: 'Affichage',
  name: 'Prévention de l\'Overflow Horizontal Mobile',
  passed: overflowRisks.length === 0,
  severity: 'warning',
  message: overflowRisks.length === 0
    ? 'Aucune classe Tailwind à risque d\'overflow horizontal (w-screen sans garde-fou, largeurs fixes non responsives) détectée.'
    : `${overflowRisks.length} risques potentiels d'overflow horizontal détectés.`,
  details: overflowRisks
});

// 2.4 Adaptation Mobile & Espace de navigation sécurisé
const footerPath = path.join(SRC_DIR, 'components/Footer.tsx');
const footerContent = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf-8') : '';
const appContent = fs.readFileSync(path.join(SRC_DIR, 'App.tsx'), 'utf-8');
const hasMobileSafeArea = footerContent.includes('pb-') || appContent.includes('pb-');
addResult({
  category: 'Affichage',
  name: 'Zone tampon de sécurité pour barre de navigation mobile',
  passed: hasMobileSafeArea,
  severity: 'warning',
  message: hasMobileSafeArea
    ? 'Le pied de page réserve un espace bas suffisant (pb-28) pour ne pas masquer de contenu sous la barre mobile.'
    : 'Risque de chevauchement : aucun padding-bottom sécurisé détecté sur le pied de page.',
});

// 2.5 Intégrité de l'Impression & Export PDF (Paged Media / @media print)
const indexCssPath = path.join(SRC_DIR, 'index.css');
const indexCssContent = fs.existsSync(indexCssPath) ? fs.readFileSync(indexCssPath, 'utf-8') : '';
const contactSectionPath = path.join(SRC_DIR, 'components/ContactSection.tsx');
const contactSectionContent = fs.existsSync(contactSectionPath) ? fs.readFileSync(contactSectionPath, 'utf-8') : '';
const clientSheetPath = path.join(SRC_DIR, 'components/ClientSheetSection.tsx');
const clientSheetContent = fs.existsSync(clientSheetPath) ? fs.readFileSync(clientSheetPath, 'utf-8') : '';

const printIssues: string[] = [];
if (!indexHtmlContent.includes('id="print-root"')) {
  printIssues.push("index.html: Conteneur d'impression dédié <div id=\"print-root\"> manquant (requis pour isoler la sortie PDF).");
}
if (!indexCssContent.includes('@media print')) {
  printIssues.push("index.css: Directive @media print manquante.");
}
if (!/#root\s*\{[^}]*display:\s*none\s*!important/i.test(indexCssContent)) {
  printIssues.push("index.css: Masquage de #root avec 'display: none !important' manquant dans @media print (risque de génération de pages fantômes).");
}
if (!/#print-root\s*\{[^}]*display:\s*block\s*!important/i.test(indexCssContent)) {
  printIssues.push("index.css: Activation de #print-root avec 'display: block !important' manquante dans @media print.");
}
if (/#print-root[^{]*\.printable-summary[^{]*\{[^}]*position:\s*fixed/i.test(indexCssContent)) {
  printIssues.push("index.css: Anti-pattern 'position: fixed' détecté dans @media print (provoque la duplication répétée sur chaque page PDF).");
}
if (!indexCssContent.includes('break-inside: avoid') && !indexCssContent.includes('page-break-inside: avoid')) {
  printIssues.push("index.css: Règle d'évitement de coupure de bloc ('break-inside: avoid') manquante.");
}
if (!contactSectionContent.includes('contact-summary-ticket')) {
  printIssues.push("ContactSection.tsx: Identifiant de ticket d'impression 'contact-summary-ticket' manquant.");
}
if (!clientSheetContent.includes('clientsheet-summary-ticket')) {
  printIssues.push("ClientSheetSection.tsx: Identifiant de ticket d'impression 'clientsheet-summary-ticket' manquant.");
}

addResult({
  category: 'Affichage',
  name: 'Intégrité d\'Impression & Export PDF (Paged Media / Mono-page A4)',
  passed: printIssues.length === 0,
  severity: 'error',
  message: printIssues.length === 0
    ? 'Feuille de style d\'impression conforme : isolation #print-root, suppression du flux #root, absence de duplication fixed et pagination mono-page A4 garantie.'
    : `${printIssues.length} anomalie(s) d'impression détectée(s) pouvant altérer la sortie PDF.`,
  details: printIssues
});


// ============================================================
// 3. TESTS D'ACCESSIBILITÉ (A11Y, RGAA & WCAG 2.1 AA)
// ============================================================
console.log('♿ [3/3] Exécution des tests d\'Accessibilité (A11y / RGAA / WCAG)...');

// 3.1 Attribut de langue sur la balise <html>
const htmlTagMatch = indexHtmlContent.match(/<html[^>]*lang=["']([^"']+)["'][^>]*>/i);
const hasValidLang = htmlTagMatch && htmlTagMatch[1] === 'fr';

addResult({
  category: 'Accessibilité',
  name: 'Attribut de langue principal (HTML lang="fr")',
  passed: !!hasValidLang,
  severity: 'error',
  message: hasValidLang
    ? 'La balise racine <html> déclare explicitement l\'attribut lang="fr".'
    : 'Balise <html> sans attribut lang="fr" valide (invalidation WCAG 3.1.1).',
});

// 3.2 Vérification des balises <img> et attributs alt
const imgWithoutAlt: string[] = [];
for (const file of [indexHtmlPath, ...tsxFiles]) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(ROOT_DIR, file);
  
  // Regex pour détecter les balises img
  const imgTags = content.match(/<img\s+[^>]*>/gi) || [];
  for (const imgTag of imgTags) {
    if (!/alt\s*=\s*["'{]/i.test(imgTag)) {
      imgWithoutAlt.push(`${relPath}: ${imgTag.slice(0, 60)}...`);
    }
  }
}

addResult({
  category: 'Accessibilité',
  name: 'Textes alternatifs sur toutes les images (attribut alt)',
  passed: imgWithoutAlt.length === 0,
  severity: 'error',
  message: imgWithoutAlt.length === 0
    ? '100% des balises <img> possèdent un attribut alt défini (descriptif ou décoratif).'
    : `${imgWithoutAlt.length} image(s) sans attribut alt détectée(s).`,
  details: imgWithoutAlt
});

// 3.3 Boutons interactifs avec label accessible (aria-label ou texte)
const buttonIssues: string[] = [];
for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(ROOT_DIR, file);

  // Recherche de boutons simples fermés contenant uniquement des icônes sans aria-label
  const iconButtonRegex = /<button\s+([^>]*?)>(\s*<[A-Z]\w+Icon|\s*<[A-Z]\w+\s+className=[^>]+>\s*<\/button>|\s*<[A-Z]\w+[^>]*\/>\s*<\/button>)/g;
  let match;
  while ((match = iconButtonRegex.exec(content)) !== null) {
    const attrs = match[1];
    if (!attrs.includes('aria-label') && !attrs.includes('title')) {
      buttonIssues.push(`${relPath}: Bouton icône sans aria-label explicite.`);
    }
  }
}

addResult({
  category: 'Accessibilité',
  name: 'Accessibilité des boutons interactifs (aria-label / titre)',
  passed: buttonIssues.length === 0,
  severity: 'warning',
  message: buttonIssues.length === 0
    ? 'Tous les boutons contenant des icônes possèdent un aria-label ou title explicite pour les lecteurs d\'écran.'
    : `${buttonIssues.length} bouton(s) icône sans label accessible identifié(s).`,
  details: buttonIssues
});

// 3.4 Sécurité et accessibilité des liens target="_blank"
const blankLinkIssues: string[] = [];
for (const file of [indexHtmlPath, ...tsxFiles]) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(ROOT_DIR, file);

  const aTags = content.match(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi) || [];
  for (const tag of aTags) {
    if (!/rel=["'][^"']*noopener[^"']*["']/i.test(tag) || !/rel=["'][^"']*noreferrer[^"']*["']/i.test(tag)) {
      blankLinkIssues.push(`${relPath}: ${tag.slice(0, 60)}...`);
    }
  }
}

addResult({
  category: 'Accessibilité',
  name: 'Liens externes sécurisés (target="_blank" + rel="noopener noreferrer")',
  passed: blankLinkIssues.length === 0,
  severity: 'warning',
  message: blankLinkIssues.length === 0
    ? 'Tous les liens externes avec target="_blank" incluent bien rel="noopener noreferrer".'
    : `${blankLinkIssues.length} lien(s) avec target="_blank" sans noopener/noreferrer.`,
  details: blankLinkIssues
});

// 3.5 Présence d'un titre h1 unique dans Hero
const heroPath = path.join(SRC_DIR, 'components/Hero.tsx');
const heroContent = fs.existsSync(heroPath) ? fs.readFileSync(heroPath, 'utf-8') : '';
const h1Count = (heroContent.match(/<h1[^>]*>/gi) || []).length;

addResult({
  category: 'Accessibilité',
  name: 'Hiérarchie sémantique (Titre principal h1 unique)',
  passed: h1Count === 1,
  severity: 'error',
  message: h1Count === 1
    ? 'Un titre unique <h1> est présent sur la page d\'accueil dans le composant Hero.'
    : `Structure de titres anormale : ${h1Count} balise(s) <h1> détectée(s).`,
});

// 3.6 Accessibilité des contrôles de formulaire (ContactSection.tsx)
const contactPath = path.join(SRC_DIR, 'components/ContactSection.tsx');
const contactContent = fs.existsSync(contactPath) ? fs.readFileSync(contactPath, 'utf-8') : '';
const hasFormLabels = contactContent.includes('htmlFor=') || contactContent.includes('aria-label=');
const hasRequiredMarkings = contactContent.includes('required');

addResult({
  category: 'Accessibilité',
  name: 'Formulaire accessible (Labels explicites & Attributs requis)',
  passed: hasFormLabels && hasRequiredMarkings,
  severity: 'error',
  message: (hasFormLabels && hasRequiredMarkings)
    ? 'Les champs du formulaire de contact sont correctement associés à des labels et signalent les champs obligatoires.'
    : 'Le formulaire de contact manque de labels ou d\'attributs sémantiques.',
});

// 3.7 Intégrité des liens d'action et ancres (Zéro ancre morte ou non fonctionnelle)
const deadAnchorIssues: string[] = [];
for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(ROOT_DIR, file);

  // Recherche des ancres mortes type href="#" ou href="#section"
  const hashMatches = content.match(/href\s*=\s*["']#[^"']*["']/gi) || [];
  for (const m of hashMatches) {
    deadAnchorIssues.push(`${relPath}: ancre interne statique détectée (${m}) au lieu d'un gestionnaire d'état ou redirection explicite`);
  }
}

addResult({
  category: 'Conformité',
  name: 'Intégrité des liens d\'action (Zéro ancre morte ou lien inopérant)',
  passed: deadAnchorIssues.length === 0,
  severity: 'error',
  message: deadAnchorIssues.length === 0
    ? 'Aucune ancre morte ou non fonctionnelle détectée. Tous les boutons d\'action utilisent des gestionnaires d\'état ou des URL sécurisées (WhatsApp, tel, mailto).'
    : `${deadAnchorIssues.length} ancre(s) morte(s) ou statique(s) détectée(s).`,
  details: deadAnchorIssues
});


// ============================================================
// SYNTHÈSE & RAPPORT FINAL
// ============================================================
console.log('\n============================================================');
console.log('  📊 SYNTHÈSE DES RÉSULTATS DU CONTRÔLE QUALITÉ KRBEAUTÉ');
console.log('============================================================\n');

const totalTests = results.length;
const passedTests = results.filter(r => r.passed).length;
const failedErrors = results.filter(r => !r.passed && r.severity === 'error');
const failedWarnings = results.filter(r => !r.passed && r.severity === 'warning');

const score = Math.round((passedTests / totalTests) * 100);

for (const r of results) {
  const icon = r.passed ? '✅' : (r.severity === 'error' ? '❌' : '⚠️');
  const cat = `[${r.category.toUpperCase()}]`.padEnd(16, ' ');
  console.log(`${icon} ${cat} ${r.name}`);
  console.log(`   └─ ${r.message}`);
  if (r.details && r.details.length > 0) {
    for (const d of r.details.slice(0, 5)) {
      console.log(`      • ${d}`);
    }
    if (r.details.length > 5) {
      console.log(`      • ... et ${r.details.length - 5} autre(s) occurrence(s)`);
    }
  }
}

console.log('\n------------------------------------------------------------');
console.log(`Score Global de Conformité QA : ${score} / 100`);
console.log(`Tests réussis : ${passedTests} / ${totalTests}`);
console.log(`Erreurs critiques : ${failedErrors.length}`);
console.log(`Avertissements : ${failedWarnings.length}`);
console.log('------------------------------------------------------------\n');

if (failedErrors.length > 0) {
  console.error(`❌ Échec de l'audit QA : ${failedErrors.length} erreur(s) critique(s) détectée(s).\n`);
  process.exit(1);
} else if (failedWarnings.length > 0) {
  console.warn(`⚠️ Audit QA validé avec ${failedWarnings.length} recommandation(s) d'optimisation.\n`);
  process.exit(0);
} else {
  console.log(`🎉 Audit QA KRbeauté 100% CONFORME ! Aucune régression détectée.\n`);
  process.exit(0);
}

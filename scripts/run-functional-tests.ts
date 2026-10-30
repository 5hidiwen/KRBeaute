/**
 * Suite de Tests Fonctionnels Automatisés KRbeauté
 * Vérifie les scénarios opérationnels, la logique métier, la logistique,
 * la prise de rendez-vous WhatsApp et le multilinguisme.
 *
 * Exécution : npx tsx .agents/skills/testeur-qa/scripts/run-functional-tests.ts
 */

import { COMMUNES_DATA, getFeeForDistance } from '../src/data/communesData';
import { SERVICES_FR, SERVICES_ES, getServices } from '../src/data/servicesData';
import { TRANSLATIONS } from '../src/i18n/translations';
import { filterCommunes } from '../src/utils/logisticsUtils';
import { buildWhatsAppBookingUrl, getSlotLabel } from '../src/utils/bookingUtils';
import { updateContraindications, ContraindicationKey } from '../src/utils/clientSheetUtils';
import { validateContactSubmission } from '../src/utils/formValidation';

interface FunctionalTestResult {
  module: string;
  scenario: string;
  passed: boolean;
  message: string;
  details?: string[];
}

const results: FunctionalTestResult[] = [];

function assert(
  module: string,
  scenario: string,
  condition: boolean,
  successMessage: string,
  errorMessage: string,
  details?: string[]
) {
  results.push({
    module,
    scenario,
    passed: condition,
    message: condition ? successMessage : errorMessage,
    details: condition ? undefined : details
  });
}

console.log('\n============================================================');
console.log('  🧪 SUITE DE TESTS FONCTIONNELS KRBEAUTÉ : SCÉNARIOS MÉTIER');
console.log('============================================================\n');

// ============================================================
// MODULE 1 : CALCULATEUR LOGISTIQUE & COMMILOMETRAGE
// ============================================================
console.log('🚗 [1/5] Scénarios Logistique & Déplacements...');

// 1.1 Zone 1 : Rennes & communes intra-couronne (<= 7 km) gratuites
const zone1Communes = COMMUNES_DATA.filter((c) => c.distanceKm <= 7);
const allZone1Free = zone1Communes.every((c) => c.feeEuro === 0 && c.isOffered);
const feeAt0Km = getFeeForDistance(0, 'fr');
const feeAt7Km = getFeeForDistance(7, 'fr');

assert(
  'Logistique',
  'Zone 1 (≤ 7 km) : Déplacement 100% offert',
  allZone1Free && feeAt0Km.fee === 0 && feeAt0Km.isOffered && feeAt7Km.fee === 0 && feeAt7Km.isOffered,
  `Les ${zone1Communes.length} communes de la zone 1 (Rennes et jusqu'à 7 km) sont configurées à 0 € avec déplacement offert.`,
  'Certaines communes en zone 1 présentent des frais anormaux.'
);

// 1.2 Zone 2 : Couronne 7 à 12 km (Forfait fixe 8,50 €)
const zone2Communes = COMMUNES_DATA.filter((c) => c.distanceKm > 7 && c.distanceKm <= 12);
const allZone2Exact = zone2Communes.every((c) => c.feeEuro === 8.5 && !c.isOffered);
const feeAt8Km = getFeeForDistance(8, 'fr');
const feeAt12Km = getFeeForDistance(12, 'fr');

assert(
  'Logistique',
  'Zone 2 (7-12 km) : Forfait kilométrique exact 8,50 €',
  allZone2Exact && feeAt8Km.fee === 8.5 && !feeAt8Km.isOffered && feeAt12Km.fee === 8.5 && !feeAt12Km.isOffered,
  `Les ${zone2Communes.length} communes de la zone 2 appliquent scrupuleusement le forfait de 8,50 €.`,
  'Incohérence dans le barème forfaitaire de la zone 2.'
);

// 1.3 Zone Hors Périmètre (> 12 km)
const feeAt15Km = getFeeForDistance(15, 'fr');
assert(
  'Logistique',
  'Zone Hors Périmètre (> 12 km) : Notification explicite',
  feeAt15Km.fee === 0 && !feeAt15Km.isOffered && feeAt15Km.label.includes('Non desservi'),
  'Les distances supérieures à 12 km affichent bien le statut hors zone desservie.',
  'Échec de la gestion des distances supérieures à 12 km.'
);

// 1.4 Recherche par code postal
const searchRennes = filterCommunes('35000');
const searchStGregoire = filterCommunes('35760');
assert(
  'Logistique',
  'Recherche de commune par code postal',
  searchRennes.some((c) => c.name.includes('Rennes')) &&
    searchStGregoire.some((c) => c.name.includes('Saint-Grégoire')),
  'Recherche fluide et exacte par codes postaux (35000, 35760).',
  'Erreur de filtrage lors de la recherche par code postal.'
);

// 1.5 Recherche insensible à la casse & partielle
const searchCesson = filterCommunes('ceSSon');
const searchSaint = filterCommunes('saint');
assert(
  'Logistique',
  'Recherche insensible à la casse et partielle',
  searchCesson.length === 1 && searchCesson[0].name === 'Cesson-Sévigné' && searchSaint.length >= 3,
  'Filtrage textuel insensible à la casse et tolérant aux préfixes partiels.',
  'La recherche textuelle ne gère pas convenablement la casse.'
);

// 1.6 Recherche sans résultat
const searchInvalid = filterCommunes('99999');
assert(
  'Logistique',
  'Recherche infructueuse sans crash',
  Array.isArray(searchInvalid) && searchInvalid.length === 0,
  'Une recherche sans correspondance renvoie un tableau vide de manière sécurisée.',
  'La recherche sans résultat a levé une anomalie.'
);

// 1.7 Internationalisation du barème logistique (ES)
const feeEsZone1 = getFeeForDistance(5, 'es');
const feeEsZone2 = getFeeForDistance(10, 'es');
assert(
  'Logistique',
  'Support multilingue du barème logistique (ES)',
  feeEsZone1.label.includes('Traslado sin costo') && feeEsZone2.label.includes('Tarifa fija'),
  'Les libellés logistiques s\'affichent fidèlement en espagnol.',
  'Les libellés espagnols du calculateur logistique sont erronés.'
);

// ============================================================
// MODULE 2 : PRise DE RDV WHATSAPP & GÉNÉRATEUR D'URL
// ============================================================
console.log('💬 [2/5] Scénarios Réservation & Prise de RDV WhatsApp...');

const sampleBookingFr = {
  name: 'Marie Dupont',
  phone: '06 12 34 56 78',
  email: 'marie.dupont@example.com',
  commune: 'Saint-Grégoire',
  serviceTitle: 'Tratamiento Facial Pureza Absoluta',
  preferredDate: '2026-11-15',
  preferredTimeSlot: 'morning',
  message: 'Porte d\'entrée code 1234'
};

const waUrlFr = buildWhatsAppBookingUrl(sampleBookingFr, TRANSLATIONS.fr);

// 2.1 Cible officielle du lien WhatsApp
assert(
  'WhatsApp',
  'Cible officielle du numéro WhatsApp',
  waUrlFr.startsWith('https://wa.me/33665566702?text='),
  'Lien correctement routé vers le numéro officiel de Karina Robart (+33 6 65 56 67 02).',
  `Numéro cible WhatsApp invalide : ${waUrlFr}`
);

// 2.2 Données encodées dans le message WhatsApp FR
const decodedFr = decodeURIComponent(waUrlFr.replace('https://wa.me/33665566702?text=', ''));
assert(
  'WhatsApp',
  'Complétude du message de réservation (FR)',
  decodedFr.includes('Marie Dupont') &&
    decodedFr.includes('Saint-Grégoire') &&
    decodedFr.includes('2026-11-15') &&
    decodedFr.includes('Matin') &&
    decodedFr.includes('Porte d\'entrée code 1234'),
  'Toutes les coordonnées (nom, soin, créneau, commune, note) sont incluses dans le payload WhatsApp.',
  'Certaines variables utilisateur sont absentes du message WhatsApp généré.'
);

// 2.3 Réservation en Espagnol (ES)
const sampleBookingEs = {
  name: 'Elena Garcia',
  commune: 'Rennes Centre',
  serviceTitle: 'Tratamiento Facial Detox',
  preferredDate: '2026-12-01',
  preferredTimeSlot: 'afternoon',
  message: 'Piel reactiva'
};
const waUrlEs = buildWhatsAppBookingUrl(sampleBookingEs, TRANSLATIONS.es);
const decodedEs = decodeURIComponent(waUrlEs.replace('https://wa.me/33665566702?text=', ''));

assert(
  'WhatsApp',
  'Template de réservation en espagnol (ES)',
  decodedEs.includes('Elena Garcia') &&
    decodedEs.includes('Tratamiento Facial Detox') &&
    decodedEs.includes('Tarde') &&
    decodedEs.includes('¡Hola Karina!'),
  'Le message WhatsApp s\'adapte rigoureusement à la langue espagnole.',
  'Échec de la génération WhatsApp en langue espagnole.'
);

// 2.4 Repli automatique en cas de champs optionnels omis
const minimalBooking = {
  name: '',
  commune: 'Rennes',
  serviceTitle: 'Beauté des pieds',
  preferredDate: '',
  preferredTimeSlot: 'noon',
  message: ''
};
const waUrlMinimal = buildWhatsAppBookingUrl(minimalBooking, TRANSLATIONS.fr);
const decodedMinimal = decodeURIComponent(waUrlMinimal.replace('https://wa.me/33665566702?text=', ''));

assert(
  'WhatsApp',
  'Valeurs par défaut bienveillantes (Nom & Date)',
  decodedMinimal.includes(TRANSLATIONS.fr.contact.whatsappTemplate.clientDefault) &&
    decodedMinimal.includes(TRANSLATIONS.fr.contact.whatsappTemplate.toAgree),
  'Les champs vides sont remplacés avec élégance par les libellés de repli ("Client(e)", "À convenir").',
  'Les champs vides génèrent des chaînes nulles ou indésirables.'
);

// 2.5 Sécurité et encodage des caractères spéciaux
const specialCharsBooking = {
  name: 'Anaïs & Chloé',
  commune: 'Rennes (Quartier Thabor)',
  serviceTitle: 'Soin des pieds & Détente',
  preferredDate: '2026-10-31',
  preferredTimeSlot: 'evening',
  message: 'Sonner à l\'interphone "Chloé & Co" 🌿 #Relax'
};
const waUrlSpecial = buildWhatsAppBookingUrl(specialCharsBooking, TRANSLATIONS.fr);
assert(
  'WhatsApp',
  'Encodage URI robuste (caractères accentués, emojis, esperluette)',
  !waUrlSpecial.includes(' ') && !waUrlSpecial.includes('"') && waUrlSpecial.includes('%26'),
  'Tous les caractères spéciaux et emojis sont encodés sans risque d\'altération d\'URL.',
  'Caractères spéciaux mal encodés dans l\'URL WhatsApp.'
);

// ============================================================
// MODULE 3 : FICHE DIAGNOSTIC & CONTRE-INDICATIONS
// ============================================================
console.log('📋 [3/5] Scénarios Fiche Diagnostic Client...');

// 3.1 Initialisation
let contraindications: ContraindicationKey[] = ['aucune'];

// 3.2 Ajout d'une contre-indication -> 'aucune' doit disparaître
contraindications = updateContraindications(contraindications, 'grossesse');
assert(
  'Fiche Diagnostic',
  'Exclusion mutuelle : "aucune" s\'efface si une contre-indication est cochée',
  contraindications.length === 1 && contraindications[0] === 'grossesse',
  'La sélection d\'une contre-indication efface automatiquement la mention "aucune".',
  'La mention "aucune" persiste anormalement aux côtés de vraies contre-indications.'
);

// 3.3 Sélection multiple
contraindications = updateContraindications(contraindications, 'allergies');
assert(
  'Fiche Diagnostic',
  'Cumul de plusieurs contre-indications',
  contraindications.length === 2 &&
    contraindications.includes('grossesse') &&
    contraindications.includes('allergies'),
  'Possibilité de déclarer plusieurs antécédents médicaux / contre-indications en simultané.',
  'La sélection multiple de contre-indications a échoué.'
);

// 3.4 Décochage partiel puis total -> retour à 'aucune'
contraindications = updateContraindications(contraindications, 'grossesse');
contraindications = updateContraindications(contraindications, 'allergies');
assert(
  'Fiche Diagnostic',
  'Retour automatique à "aucune" lorsque tout est décoché',
  contraindications.length === 1 && contraindications[0] === 'aucune',
  'La désélection complète rétablit immédiatement la position de repli sécurisée ["aucune"].',
  'État orphelin : liste de contre-indications vide sans réinitialisation.'
);

// 3.5 Re-sélection explicite de 'aucune'
let multipleList: ContraindicationKey[] = ['pacemaker', 'traitement', 'soleil'];
multipleList = updateContraindications(multipleList, 'aucune');
assert(
  'Fiche Diagnostic',
  'Bouton "aucune" réinitialisant la liste complète',
  multipleList.length === 1 && multipleList[0] === 'aucune',
  'Le clic sur "aucune" purge immédiatement toutes les autres options sélectionnées.',
  'Le bouton "aucune" ne purge pas correctement la liste.'
);

// ============================================================
// MODULE 4 : CATALOGUE DES SOINS & PARITÉ TARIFAIRE
// ============================================================
console.log('✨ [4/5] Scénarios Prestations & Cohérence Trans-Linguistique...');

// 4.1 Nombre de soins identique
assert(
  'Prestations',
  'Parité numérique FR / ES',
  SERVICES_FR.length === SERVICES_ES.length && SERVICES_FR.length >= 7,
  `Les catalogues français et espagnol disposent du même nombre de soins (${SERVICES_FR.length} prestations).`,
  `Divergence de catalogue : ${SERVICES_FR.length} en FR vs ${SERVICES_ES.length} en ES.`
);

// 4.2 Concordance des IDs
const frIds = SERVICES_FR.map((s) => s.id);
const esIds = SERVICES_ES.map((s) => s.id);
const allIdsMatch = frIds.every((id, idx) => id === esIds[idx]);
assert(
  'Prestations',
  'Concordance exacte des identifiants (IDs)',
  allIdsMatch,
  'Tous les IDs de prestations correspondent à 100% entre les langues.',
  'Désalignement détecté entre les identifiants français et espagnols.'
);

// 4.3 Stricte parité tarifaire
const priceMismatches: string[] = [];
for (let i = 0; i < SERVICES_FR.length; i++) {
  if (SERVICES_FR[i].price !== SERVICES_ES[i].price) {
    priceMismatches.push(`${SERVICES_FR[i].id}: FR=${SERVICES_FR[i].price}€ vs ES=${SERVICES_ES[i].price}€`);
  }
}
assert(
  'Prestations',
  'Stricte parité tarifaire trans-frontière',
  priceMismatches.length === 0,
  'Aucune divergence de prix constatée entre les deux langues.',
  `Divergences de prix détectées : ${priceMismatches.join(', ')}`
);

// 4.4 Stricte parité des durées
const durationMismatches: string[] = [];
for (let i = 0; i < SERVICES_FR.length; i++) {
  if (SERVICES_FR[i].durationMinutes !== SERVICES_ES[i].durationMinutes) {
    durationMismatches.push(
      `${SERVICES_FR[i].id}: FR=${SERVICES_FR[i].durationMinutes}min vs ES=${SERVICES_ES[i].durationMinutes}min`
    );
  }
}
assert(
  'Prestations',
  'Stricte parité des durées de soin en minutes',
  durationMismatches.length === 0,
  'Toutes les durées de soin en minutes sont rigoureusement identiques (planning sécurisé).',
  `Divergences de durées détectées : ${durationMismatches.join(', ')}`
);

// 4.5 Fonction sélectrice getServices
const servicesFetchedFr = getServices('fr');
const servicesFetchedEs = getServices('es');
assert(
  'Prestations',
  'Sélecteur de catalogue getServices(lang)',
  servicesFetchedFr === SERVICES_FR && servicesFetchedEs === SERVICES_ES,
  'La fonction getServices bascule instantanément sur le catalogue requis.',
  'La fonction getServices renvoie un catalogue inattendu.'
);

// ============================================================
// MODULE 5 : FORMULAIRE DE CONTACT & SÉCURITÉ ANTI-SPAM
// ============================================================
console.log('🛡️ [5/5] Scénarios Formulaire & Sécurité Anti-Spam...');

// 5.1 Soumission valide
const validSubmission = validateContactSubmission({
  name: 'Sophie Martin',
  phone: '06 99 88 77 66',
  commune: 'Rennes Centre',
  termsAccepted: true
});
assert(
  'Formulaire',
  'Soumission valide acceptée',
  validSubmission.isValid && Object.keys(validSubmission.errors).length === 0,
  'Une soumission complète avec conditions acceptées est déclarée valide.',
  'La soumission valide a été rejetée à tort.'
);

// 5.2 Rejet en cas de nom manquant
const missingNameSubmission = validateContactSubmission({
  name: '',
  phone: '06 99 88 77 66',
  commune: 'Rennes Centre',
  termsAccepted: true
});
assert(
  'Formulaire',
  'Rejet préventif si le nom est manquant',
  !missingNameSubmission.isValid && !!missingNameSubmission.errors.name,
  'Le système bloque la soumission et identifie le champ nom manquant.',
  'Le système a laissé passer une soumission sans nom.'
);

// 5.3 Rejet en cas de téléphone manquant
const missingPhoneSubmission = validateContactSubmission({
  name: 'Sophie Martin',
  phone: '   ',
  commune: 'Rennes Centre',
  termsAccepted: true
});
assert(
  'Formulaire',
  'Rejet préventif si le téléphone est manquant',
  !missingPhoneSubmission.isValid && !!missingPhoneSubmission.errors.phone,
  'Le système bloque la soumission et exige un numéro de contact.',
  'Le système a laissé passer une soumission sans téléphone.'
);

// 5.4 Rejet si consentement RGPD / CGV non coché
const unacceptedTerms = validateContactSubmission({
  name: 'Sophie Martin',
  phone: '06 99 88 77 66',
  commune: 'Rennes Centre',
  termsAccepted: false
});
assert(
  'Formulaire',
  'Blocage strict en l\'absence de consentement RGPD/CGV',
  !unacceptedTerms.isValid && !!unacceptedTerms.errors.terms,
  'Conformité RGPD garantie : le consentement doit être positivement coché.',
  'Le formulaire autorise la soumission sans accord préalable RGPD.'
);

// 5.5 Pot-de-miel (Honeypot) anti-bot
const botSubmission = validateContactSubmission({
  name: 'Robot Spammeur',
  phone: '06 00 00 00 00',
  commune: 'Rennes',
  termsAccepted: true,
  botcheck: 'http://spam-link.example.com'
});
assert(
  'Formulaire',
  'Neutralisation immédiate des soumissions automatisées de robots',
  !botSubmission.isValid && !!botSubmission.errors.bot,
  'Le piège honeypot intercepte avec succès les bots qui remplissent le champ masqué.',
  'Le piège honeypot n\'a pas bloqué le bot.'
);

// ============================================================
// SYNTHÈSE DES RÉSULTATS FONCTIONNELS
// ============================================================
console.log('\n============================================================');
console.log('  📊 SYNTHÈSE DES TESTS FONCTIONNELS KRBEAUTÉ');
console.log('============================================================\n');

const totalTests = results.length;
const passedTests = results.filter((r) => r.passed).length;
const failedTests = results.filter((r) => !r.passed);
const score = Math.round((passedTests / totalTests) * 100);

for (const r of results) {
  const icon = r.passed ? '✅' : '❌';
  const mod = `[${r.module.toUpperCase()}]`.padEnd(18, ' ');
  console.log(`${icon} ${mod} ${r.scenario}`);
  console.log(`   └─ ${r.message}`);
  if (r.details && r.details.length > 0) {
    for (const d of r.details) {
      console.log(`      • ${d}`);
    }
  }
}

console.log('\n------------------------------------------------------------');
console.log(`Score Fonctionnel Global : ${score} / 100`);
console.log(`Scénarios réussis : ${passedTests} / ${totalTests}`);
console.log(`Scénarios échoués : ${failedTests.length}`);
console.log('------------------------------------------------------------\n');

if (failedTests.length > 0) {
  console.error(`❌ Échec de la suite fonctionnelle : ${failedTests.length} anomalie(s) détectée(s).\n`);
  process.exit(1);
} else {
  console.log(`🎉 100% DES SCÉNARIOS FONCTIONNELS VALIdÉS AVEC SUCCÈS !\n`);
  process.exit(0);
}

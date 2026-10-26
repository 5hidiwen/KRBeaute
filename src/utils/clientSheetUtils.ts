export type ContraindicationKey =
  | 'aucune'
  | 'grossesse'
  | 'pacemaker'
  | 'allergies'
  | 'traitement'
  | 'soleil';

/**
 * Gère la sélection exclusive et multiple des contre-indications
 * - Si 'aucune' est sélectionnée, réinitialise la liste à ['aucune']
 * - Si une contre-indication spécifique est cochée, 'aucune' est retirée
 * - Si toutes les contre-indications sont décochées, revient automatiquement à ['aucune']
 */
export function updateContraindications(
  prev: ContraindicationKey[],
  key: ContraindicationKey
): ContraindicationKey[] {
  if (key === 'aucune') {
    return ['aucune'];
  }
  const withoutAucune = prev.filter((k) => k !== 'aucune');
  if (withoutAucune.includes(key)) {
    const next = withoutAucune.filter((k) => k !== key);
    return next.length === 0 ? ['aucune'] : next;
  }
  return [...withoutAucune, key];
}

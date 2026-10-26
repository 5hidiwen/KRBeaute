import { COMMUNES_DATA, CommuneItem } from '../data/communesData';

/**
 * Filtre les communes par nom ou code postal (recherche insensible à la casse et partielle)
 */
export function filterCommunes(
  query: string,
  communes: CommuneItem[] = COMMUNES_DATA
): CommuneItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];
  return communes.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.postalCode.includes(cleanQuery)
  );
}

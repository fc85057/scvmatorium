import { scvmatorium } from 'rng/attributions';
import { TableEntry } from 'types/character';

const entry = (input: string): TableEntry => ({
  id: `scvmatorium-${input}`,
  tags: ['makedatanotlore', 'scvmatorium', 'name'],
  attribution: scvmatorium,
  content: {
    title: {
      id: 'character.stats.titles.name',
      values: {},
    },
    description: {
      id: 'character.stats.standard.name',
      values: { name: input },
    },
  },
});

export const names = [
  'Gorma',
  'Reda',
  'Leta',
  'Peta',
  'Handsel',
  'Rabatt',
  'Moll',
  'Balsam',
  'Mads',
  'Friedrech',
  'Lansem',
  'Knarp',
  'Skutz',
  'Thera-Mor',
  'Tripoli',
  'Schlars',
  'Galgenfrid',
  'Luspank',
  'Mök',
  'Ljustem',
  'Ledsam',
  'Kordar',
  'Rumba',
  'Balmfrid',
  'Bjord',
  'Perum',
  'Waldur',
  'Brogvar',
  'Redig',
  'Melanim',
  'Ampeli',
  'Rusk',
  'Regnar',
  'Kurl',
  'Vedem',
  'Vedun',
  'Fnuss',
  'Anbol',
  'Risko',
  'Tygla',
  'Katskul',
  'Amuk',
  'Gerkun',
  'Revel',
].map((name) => entry(name));

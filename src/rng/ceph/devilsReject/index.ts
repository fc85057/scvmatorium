import { sampleSize, sample } from 'lodash/fp';
import { devilsReject as attribution } from 'rng/attributions';
import { formatAbilities, rollAbilities } from 'rng/shared/abilities';
import { formatBody } from 'rng/shared/bodies';
import { formatClass } from 'rng/shared/class';
import { formatHabit } from 'rng/shared/habits';
import { formatTrait } from 'rng/shared/traits';
import { blurb, formatTableEntry, formatTitledEntry, tableEntry, titledEntry} from 'rng/shared/entries';
import {
  formatEquipmentList,
  hasScroll,
  rollArmor,
  rollFoodAndWater,
  rollSilver,
  rollStandardEquipment,
  rollWeapon,
} from '../../shared/equipment';
import { rollHp, formatHp } from 'rng/shared/hp';
import { formatName } from 'rng/shared/names';
import { rollOmens, formatOmens } from 'rng/shared/omens';
import tables from 'rng/tables';
import { Character } from 'types/character';

export const devilsReject = (): Character => {
  const abilities = rollAbilities(-1, -1, -1, 3);
  const hp = rollHp(1, 4, abilities.toughness.score);
  const maxOmens = 4;
  const omens = rollOmens(1, maxOmens);

  const generalEquipment = rollStandardEquipment(true); 
  const weapon = rollWeapon(10);
  const armor = rollArmor(4, hasScroll(generalEquipment));
  const silver = rollSilver();
  const silverRange = {min: 10, max: 60};
  const foodAndWater = rollFoodAndWater();
  const equipment = [foodAndWater, weapon, armor, ...generalEquipment, silver];

  const origins = [
    'traitor',
    'cannibal',
    'sacrificer',
    'witchhunter',
    'misery',
    'lurer'
  ].map((x) => tableEntry(attribution, x));
  const blacksmithBoons = [
    'serpentsTongue',
    'allForOne',
    'toHellWithYall',
    'batOutOfHell',
    'youKnowNothingOfHell',
    'seeYouInHell',
  ].map((x) => titledEntry(attribution, x));

  return {
    tags: [attribution.id],
    smalls: [
      formatName(sample(tables.names)!),
      formatClass('ceph.devilsReject'),
      formatHp(hp),
      formatOmens(omens, maxOmens),
    ],
    bigs: [
      {
        component: { id: 'introduction' },
        header: { id: 'character.stats.titles.introduction', values: {} },
        content: [
          blurb(attribution),
          formatTableEntry(sample(origins)!),
          ...sampleSize(2, tables.traits).map((trait) => formatTrait(trait)),
          formatBody(sample(tables.bodies)!),
          formatHabit(sample(tables.habits)!),
        ],
      },
      formatTitledEntry(sample(blacksmithBoons)!),
      formatAbilities(abilities),
      formatEquipmentList(equipment, abilities.presence.score, silverRange),
    ],
  };
};

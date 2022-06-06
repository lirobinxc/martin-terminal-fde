import _ from 'lodash';

const aircrafts = {
  L: { piston: ['PA31'], turboprop: ['C208', 'BE20'] },
  M: { turboprop: ['DH8C', 'B190'], jet: ['CRJ9', 'A310', 'A320', 'B738'] },
  H: { jet: ['A343', 'B744', 'B763'] },
};

export function genAircraftType() {
  let wtc = 'M';
  let type = 'jet';
  let equipment = 'X';

  const num1to10 = _.random(1, 10);

  // Generate WTC
  if (num1to10 > 8) {
    wtc = 'H';
  } else if (num1to10 > 1) {
    wtc = 'M';
  } else {
    wtc = 'L';
  }

  // Generate equipment type
  if (num1to10 > 2) {
    equipment = _.sample(['X', 'R', 'G']);
  } else {
    equipment = 'S';
  }

  if (wtc === 'H') type = 'jet';
  if (wtc === 'M' && num1to10 > 4) type = 'jet';
  if (wtc === 'M' && num1to10 <= 4) type = 'turboprop';
  if (wtc === 'L' && num1to10 > 4) type = 'turboprop';
  if (wtc === 'L' && num1to10 <= 4) type = 'piston';

  return {
    fullName: `${wtc}/${_.sample(aircrafts[wtc][type])}/${equipment}`,
    wtc,
    type,
    equipment,
  };
}

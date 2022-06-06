import _ from 'lodash';

const callsigns = [
  'AAL',
  'ACA',
  'AFR',
  'BAW',
  'ASP',
  'BWA',
  'CAV',
  'CMS',
  'CNK',
  'COA',
  'DAL',
  'EGF',
  'FAB',
  'GGN',
  'GLR',
  'JAL',
  'JZA',
  'KBA',
  'KEE',
  'LXJ',
  'MAL',
  'MES',
  'MPE',
  'NCB',
  'PAG',
  'PCO',
  'RH',
  'RRR',
  'RSCU',
  'TGO',
  'UAL',
  'UPS',
  'VV',
  'WEW',
  'WJA',
];

export function genCallsign() {
  const random = _.random(1, 5);

  let num = _.random(101, 999);

  if (random > 3) num = _.random(1000, 9999);

  return `${_.sample(callsigns)}${num}`;
}

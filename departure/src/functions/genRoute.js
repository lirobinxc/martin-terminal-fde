import _ from 'lodash';

const routes = {
  standard: {
    J: [
      // J504
      {
        route: 'J504 YBR',
        destination: 'CYVR',
      },
      {
        route: 'J504 YBR',
        destination: 'CYLW',
      },
      {
        route: 'J504 YBR',
        destination: 'KSFO',
      },
      {
        route: 'J504 YBR',
        destination: 'KDEN',
      },
      // J506
      {
        route: 'J506 ANGEL YAA',
        destination: 'CYQD',
      },
      {
        route: 'J506 ANGEL YQV',
        destination: 'CYXE',
      },
      // J506 duplicates for balance
      {
        route: 'J506 ANGEL YAA',
        destination: 'CYQD',
      },
      {
        route: 'J506 ANGEL YQV',
        destination: 'CYXE',
      },
      // J503
      {
        route: 'J503 BRUNS',
        destination: 'CYFF',
      },
      {
        route: 'J503 BRUNS',
        destination: 'CYOW',
      },
      {
        route: 'J503',
        destination: 'CYGG',
      },
      // J503 duplicates for balance
      {
        route: 'J503 BRUNS',
        destination: 'CYFF',
      },
      // J502
      {
        route: 'J502 DEREK',
        destination: 'CYHH',
      },
      {
        route: 'J502 YHH',
        destination: 'CYYZ',
      },
      {
        route: 'J502 DEREK',
        destination: 'KMSP',
      },
      {
        route: 'J502 DEREK',
        destination: 'KORD',
      },
    ],
    V: [
      {
        route: 'V4',
        destination: 'CYBR',
      },
      {
        route: 'V4 YBR',
        destination: 'CYVR',
      },
      {
        route: 'V6 ANGEL YAA',
        destination: 'CYQD',
      },
      {
        route: 'V6 ANGEL',
        destination: 'CVQV',
      },
      {
        route: 'V3',
        destination: 'CYGG',
      },
      {
        route: 'V3 BRUNS',
        destination: 'CYFF',
      },
      {
        route: 'V2',
        destination: 'CYHH',
      },
      {
        route: 'V2 YQT',
        destination: 'CYQT',
      },
      {
        route: 'V2 DEREK',
        destination: 'KMSP',
      },
    ],
  },
  nonstandard: {
    J: [
      // J504
      {
        route: 'J504 YBR',
        destination: 'CYVR',
      },
      {
        route: 'J504 YBR',
        destination: 'CYLW',
      },
      {
        route: 'J504 YBR',
        destination: 'KSFO',
      },
      {
        route: 'J504 YBR',
        destination: 'KDEN',
      },
      // J506
      {
        route: 'J506 YAA',
        destination: 'CYQD',
      },
      {
        route: 'J506 YQV',
        destination: 'CYXE',
      },
      // J506 duplicates for balance
      {
        route: 'J506 YAA',
        destination: 'CYQD',
      },
      {
        route: 'J506 YQV',
        destination: 'CYXE',
      },
      // J503
      {
        route: 'J503',
        destination: 'CYFF',
      },
      {
        route: 'J503',
        destination: 'CYGG',
      },
      // J503 duplicates for balance
      {
        route: 'J503',
        destination: 'CYFF',
      },
      {
        route: 'J503',
        destination: 'CYGG',
      },
      // J502
      {
        route: 'J502',
        destination: 'CYHH',
      },
      {
        route: 'J502 YHH',
        destination: 'CYYZ',
      },
      {
        route: 'J502',
        destination: 'KMSP',
      },
      {
        route: 'J502',
        destination: 'KORD',
      },
    ],
    V: [
      {
        route: 'V4',
        destination: 'CYBR',
      },
      {
        route: 'V4 YBR',
        destination: 'CYVR',
      },
      {
        route: 'V6',
        destination: 'CYQD',
      },
      {
        route: 'V6',
        destination: 'CVQV',
      },
      {
        route: 'V3',
        destination: 'CYGG',
      },
      {
        route: 'V3',
        destination: 'CYFF',
      },
      {
        route: 'V2',
        destination: 'CYHH',
      },
      {
        route: 'V2 YQT',
        destination: 'CYQT',
      },
      {
        route: 'V2',
        destination: 'KMSP',
      },
    ],
  },
};

export function genRoute(filedAlt, equipment) {
  if (equipment === 'S') {
    if (filedAlt < 180) {
      return _.sample(routes.nonstandard.V);
    }
    return _.sample(routes.nonstandard.J);
  }

  if (filedAlt < 180) {
    return _.sample(routes.standard.V);
  }
  return _.sample(routes.standard.J);
}

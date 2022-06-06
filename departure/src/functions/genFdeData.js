import _ from 'lodash';
import { genAircraftType } from './genAircraftType';
import { genCallsign } from './genCallsign';
import { genRoute } from './genRoute';

let currentTime = 1200;

export function genFdeData(runwayId) {
  currentTime = currentTime + _.random(1, 2);
  const ac = genAircraftType();
  const route = genRoute();

  // Set filed speed and altitude
  let filedTAS = 999;
  let filedAlt = 999;
  if (ac.type === 'piston') {
    filedTAS = _.sample([170, 183]);
    filedAlt = _.sample([110, 120]);
  }
  if (ac.type === 'turboprop') {
    filedTAS = _.sample([293, 275]);
    filedAlt = _.sample([170, 180, 200, 210, 220]);
  }
  if (ac.type === 'jet') {
    filedTAS = _.sample([349, 374]);
    filedAlt = _.sample([330, 310]);
  }

  // Assigned heading
  let assignedHeading;
  if (runwayId === '09') {
    if (ac.type === 'turboprop' || ac.type === 'piston') {
      if (
        ['CYQD', 'CYXE', 'CYLW', 'KSFO', 'KDEN', 'CYFF', 'CYGG'].includes(
          route.destination
        )
      ) {
        assignedHeading = '060';
      }
      if (
        [
          'KMSP',
          'CYYZ',
          'KORD',
          'CYBR',
          'CYVR',
          'CYLW',
          'KSFO',
          'KDEN',
        ].includes(route.destination)
      ) {
        assignedHeading = '120';
      }
    }
  }
  if (runwayId === '09') {
    if (ac.type === 'turboprop' || ac.type === 'piston') {
      if (['CYVR', 'CYQD', 'CYXE'].includes(route.destination)) {
        assignedHeading = '060';
      }
      if (['KMSP', 'CYYZ', 'KORD'].includes(route.destination)) {
        assignedHeading = '120';
      }
    }
  }

  const fde = {
    debug: ac,
    acId: genCallsign(),
    acType: ac.fullName,
    filedTAS,
    // assignedAlt,
    // additionalInfo,
    assignedHeading,
    runwayId,
    transponderCode: `${_.random(0, 7)}${_.random(0, 7)}${_.random(
      0,
      7
    )}${_.random(0, 7)}`,
    // assignedSpeed,
    filedAlt,
    // departurePoint,
    filedRoute: route.route,
    destination: route.destination,
    ETA: currentTime,
  };

  return fde;
}

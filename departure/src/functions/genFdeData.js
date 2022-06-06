import _ from 'lodash';
import { genAircraftType } from './genAircraftType';
import { genCallsign } from './genCallsign';
import { genRoute } from './genRoute';

let currentHour = _.sample([12, 13, 14, 15, 16, 17, 18]);
let currentMinute = 0;

export function genFdeData(runwayId) {
  // Set timestamp
  currentMinute = currentMinute + _.sample([1, 1, 1, 1, 2, 2, 3]);

  if (currentMinute > 59) {
    currentHour = currentHour + 1;
    currentMinute = currentMinute - 60;
  }

  if (currentHour > 23) currentHour = 0;

  const currentTime = `${String(currentHour).padStart(2, '0')}${String(
    currentMinute
  ).padStart(2, '0')}`;

  // Init aircraft and route
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
  if (runwayId === '27') {
    if (ac.type === 'turboprop' || ac.type === 'piston') {
      if (
        ['CYQD', 'CYXE', 'CYLW', 'KSFO', 'KDEN', 'CYFF', 'CYGG'].includes(
          route.destination
        )
      ) {
        assignedHeading = '300';
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
        assignedHeading = '240';
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

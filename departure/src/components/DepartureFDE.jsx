import clsx from 'clsx';

import './DepartureFDE.scss';
// import { ReactComponent as UpArrow } from '../images/up-arrow.svg';
import upArrow from '../images/up-arrow.png';

function DepartureFDE({
  acId,
  acType,
  filedTAS,
  assignedAlt,
  additionalInfo,
  assignedHeading,
  runwayId,
  transponderCode,
  assignedSpeed,
  filedAlt,
  departurePoint,
  filedRoute,
  destination,
  ETA,
  handleRemove,
}) {
  return (
    <section className={clsx('FlightStrip', 'flexCol')}>
      <div className={clsx('topRow', 'flexRow')}>
        <div className={clsx('col', 'col1')}>
          <div className="flexCol">
            <div className={clsx('dataBox', 'acId')}>{acId}</div>
            <div className={clsx('flexRow', 'spaceBetween')}>
              <div className={clsx('dataBox', 'acType')}>{acType}</div>
              <div className={clsx('dataBox', 'filedTAS')}>{filedTAS}</div>
            </div>
          </div>
        </div>
        <div className={clsx('col', 'col2')}>
          <div className={clsx('flexRow')}>
            <div className={clsx('dataBox', 'assignedAlt')}>{assignedAlt}</div>
            <div className={clsx('dataBox', 'arrow')}>
              {/* <UpArrow /> */}
              <img src={upArrow} className="arrowPng" alt="departureArrow" />
            </div>
            <div className={clsx('dataBox', 'additionalInfo')}>
              {additionalInfo}
            </div>
            <div className={clsx('dataBox', 'assignedHeading')}>
              {assignedHeading ? `${assignedHeading}°` : ''}
            </div>
          </div>
        </div>
        <div className={clsx('col', 'col3')}>
          <div className={clsx('flexRow', 'spaceBetween')}>
            <div className={clsx('dataBox', 'runwayId')} onClick={handleRemove}>
              {runwayId ? runwayId : '09'}
            </div>
          </div>
        </div>
      </div>
      <div className={clsx('bottomRow', 'flexRow')}>
        <div className={clsx('col', 'col1')}>
          <div className={clsx('flexRow', 'spaceBetween')}>
            <div className={clsx('dataBox', 'transponderCode')}>
              {transponderCode}
            </div>
            <div className={clsx('dataBox', 'assignedSpeed')}>
              {assignedSpeed}
            </div>
            <div className={clsx('dataBox', 'filedAlt')}>{filedAlt}</div>
          </div>
        </div>
        <div className={clsx('col', 'col2')}>
          <div className={clsx('flexRow', 'spaceBetween')}>
            <div className={clsx('dataBox', 'departurePoint')}>
              {departurePoint ? departurePoint : 'CYEZ'}
            </div>
            <div className={clsx('dataBox', 'filedRoute')}>{filedRoute}</div>
            <div className={clsx('dataBox', 'destination')}>
              {destination ? destination : 'CYEZ'}
            </div>
          </div>
        </div>
        <div className={clsx('col', 'col3')}>
          <div className={clsx('flexRow', 'spaceBetween')}>
            <div className={clsx('dataBox', 'ETA')}>{ETA}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepartureFDE;

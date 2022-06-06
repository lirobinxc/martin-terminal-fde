import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import useInterval from 'use-interval';
import Modal from 'react-modal';

import './App.scss';
import DepartureFDE from './components/DepartureFDE';
import { genFdeData } from './functions/genFdeData';

const defaultDepSequence = [];
for (let i = 1; i < 7; i++) {
  defaultDepSequence.push(genFdeData(localStorage.getItem('runwayId') || '09'));
}

function App() {
  const [sequence, setSequence] = useState(defaultDepSequence);
  const [options, setOptions] = useState({
    totalItems: localStorage.getItem('totalItems') || 6,
    timedAdd: localStorage.getItem('timedAdd') || 6,
    runwayId: localStorage.getItem('runwayId') || '09',
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [timedAddEnabled, setTimedAddEnabled] = useState(false);

  useEffect(() => {
    refreshSeq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.totalItems, options.runwayId]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function refreshSeq() {
    const newSeq = [];
    for (let i = 0; i < options.totalItems; i++) {
      newSeq.push(genFdeData(options.runwayId));
    }

    setSequence(newSeq);
  }

  function setTotalItems(e) {
    let value = e.target.value;

    if (value > 99) value = 99;
    if (value < 1) value = 1;
    if (isNaN(value)) value = 6;

    localStorage.setItem('totalItems', value);
    setOptions({ ...options, totalItems: value });
  }

  function setTimedAdd(e) {
    let value = e.target.value;

    if (value < 1 || isNaN(value)) value = 6;

    localStorage.setItem('timedAdd', value);
    setOptions({ ...options, timedAdd: value });
  }

  function setRunwayId(e) {
    let value = e.target.value;

    localStorage.setItem('runwayId', value);
    setOptions({ ...options, runwayId: value });
  }

  function handleRemove(acId) {
    console.log('delete', acId);
    const newSeq = sequence.filter((el) => el.acId !== acId);

    setSequence(newSeq);
  }

  useInterval(() => {
    if (!timedAddEnabled) return;
    console.log('ADDED NEW STRIP');

    const newSeq = _.cloneDeep(sequence);
    newSeq.push(genFdeData(options.runwayId));

    setSequence(newSeq);
  }, options.timedAdd * 1000);

  console.log(sequence);
  return (
    <div className="App">
      <div className="headerRow">
        <h2>Departure EXCDS Practice v1.0</h2>
        <div className="optionsRow">
          <button className="refreshButton" onClick={refreshSeq}>
            Refresh
          </button>
          <label>
            Enable "Timed Add" mode
            <input
              type="checkbox"
              checked={timedAddEnabled}
              onChange={() => setTimedAddEnabled(!timedAddEnabled)}
            />
          </label>
          <label>
            <select
              name="rwy"
              id="rwy"
              onChange={setRunwayId}
              defaultValue={options.runwayId}
            >
              <option value="09">RWY 09</option>
              <option value="27">RWY 27</option>
            </select>
          </label>
          <button onClick={openModal}>Options</button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Options Modal"
          ariaHideApp={false}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2>
              Options <button onClick={closeModal}>Close</button>
            </h2>

            <form>
              Starting # of strips (0-99):{' '}
              <input
                type="number"
                name="totalItems"
                defaultValue={options.totalItems}
                onChange={setTotalItems}
              />
              <br />
              <h3>"Timed Add" mode options (adds new strip every X seconds)</h3>
              <label>
                Timed add interval (min 1 second){' '}
                <input
                  type="number"
                  name="timedAdd"
                  defaultValue={options.timedAdd}
                  onChange={setTimedAdd}
                />
              </label>
            </form>
            <a
              href="https://github.com/lirobinxc"
              target={'_blank'}
              rel="noreferrer"
              style={{ alignSelf: 'center', paddingTop: '50vh' }}
            >
              Github @lirobinxc
            </a>
          </div>
        </Modal>
      </div>
      <div className="stripsRow">
        {sequence
          .map((el) => {
            return (
              <DepartureFDE
                key={el.acId}
                value={el.acId}
                {...el}
                handleRemove={() => handleRemove(el.acId)}
              />
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default App;

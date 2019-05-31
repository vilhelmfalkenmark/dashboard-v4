import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Station.module.scss';

const s = classNames.bind(styles);

function Station({ station, openDepartureModal }) {
  const openModal = () => {
    openDepartureModal(station.siteId, station.name);
  };

  return (
    <li className={s('container')}>
      {station.name}
      <button onClick={openModal}>Visa avgångar</button>
    </li>
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string
  })
};

export default Station;

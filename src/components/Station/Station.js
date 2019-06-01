import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { IconTypes } from 'utils/constants';
import CircleButton from 'components/CircleButton/CircleButton';

import styles from './Station.module.scss';

const s = classNames.bind(styles);

function Station({ station, openDepartureModal }) {
  const openModal = () => {
    openDepartureModal(station.siteId, station.name);
  };

  const toggleFavorite = () => {
    console.log('hej!');
  };

  return (
    <li className={s('container')}>
      <div className={s('left')}>
        <CircleButton
          className={s('heart')}
          icon={IconTypes.HEART}
          onClickCallback={toggleFavorite}
        />
        <span>{station.name}</span>
      </div>
      <CircleButton icon={IconTypes.CROSS} onClickCallback={openModal} />
    </li>
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string
  })
};

export default Station;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { SpinnerTypes } from 'utils/constants';

import Station from 'components/Station/Station';
import SolidSpinner from 'components/SolidSpinner/SolidSpinner';
import DepartureModal from 'components/DepartureModal/DepartureModal';

import styles from './StationList.module.scss';

const s = classNames.bind(styles);

const isFavoriteStation = (favoriteStationIds, isFavorites, station) => {
  if (isFavorites) {
    return true;
  }
  if (favoriteStationIds) {
    return favoriteStationIds.indexOf(station.siteId) > -1;
  }
  return false;
};

function StationList({ fetching, stations, favoriteStationIds, isFavorites }) {
  const [modal, toggleModal] = useState({ isOpen: false, station: {} });

  return (
    <div className={s('container')}>
      {fetching && (
        <SolidSpinner color={SpinnerTypes.GREY} size={SpinnerTypes.MEDIUM} />
      )}
      {stations.length > 0 && (
        <ul className={s('list')}>
          {stations.map((station, index) => (
            <Station
              isFavorite={isFavoriteStation(
                favoriteStationIds,
                isFavorites,
                station
              )}
              key={`${station.siteId}_${index}`}
              openDepartureModal={() => toggleModal({ station, isOpen: true })}
              station={station}
            />
          ))}
        </ul>
      )}
      <DepartureModal
        station={modal.station}
        isOpen={modal.isOpen}
        closeDepartureModal={() => toggleModal({ ...modal, isOpen: false })}
      />
    </div>
  );
}

StationList.propTypes = {
  fetching: PropTypes.bool,
  isFavorites: PropTypes.bool,
  stations: PropTypes.arrayOf(PropTypes.shape({})),
  favoriteStationIds: PropTypes.arrayOf(PropTypes.string)
};

export default StationList;

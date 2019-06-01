import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { withApollo } from 'react-apollo';

import {
  SAVE_STATION_AS_FAVORITE,
  REMOVE_STATION_FROM_FAVORITES,
  MY_FAVORITE_STATIONS
} from 'schemas/querys';

import { IconTypes } from 'utils/constants';
import CircleButton from 'components/CircleButton/CircleButton';

import styles from './Station.module.scss';

const s = classNames.bind(styles);

function Station({ station, isFavorite, openDepartureModal, client }) {
  const openModal = () => {
    openDepartureModal(station.siteId, station.name);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      return (async () => {
        await client.mutate({
          mutation: REMOVE_STATION_FROM_FAVORITES,
          variables: { name: station.name, siteId: station.siteId },
          update: (cache, { data: { removedStation } }) => {
            const { myFavoriteStations } = cache.readQuery({
              query: MY_FAVORITE_STATIONS
            });
            cache.writeQuery({
              query: MY_FAVORITE_STATIONS,
              data: {
                myFavoriteStations: myFavoriteStations.filter(station => {
                  return (
                    station.siteId !== removedStation.siteId &&
                    station.name !== removedStation.name
                  );
                })
              }
            });
          }
        });
      })();
    } else {
      return (async () => {
        await client.mutate({
          mutation: SAVE_STATION_AS_FAVORITE,
          variables: { name: station.name, siteId: station.siteId },
          update: (cache, { data: { newFavoriteStation } }) => {
            const { myFavoriteStations } = cache.readQuery({
              query: MY_FAVORITE_STATIONS
            });
            cache.writeQuery({
              query: MY_FAVORITE_STATIONS,
              data: {
                myFavoriteStations: myFavoriteStations.concat([
                  newFavoriteStation
                ])
              }
            });
          }
        });
      })();
    }
  };

  return (
    <li className={s('container')}>
      <div className={s('left')}>
        <CircleButton
          className={s('heart')}
          icon={isFavorite ? IconTypes.HEART_SOLID : IconTypes.HEART_OUTLINED}
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

export default withApollo(Station);

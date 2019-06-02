import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { pathOr } from 'ramda';

import {
  MY_FAVORITE_STATIONS,
  SEARCH_STATIONS_BY_COORDINATES
} from 'schemas/querys';

import StationList from 'components/StationList/StationList';

import styles from './CloseStations.module.scss';
import SolidSpinner from 'components/SolidSpinner/SolidSpinner';

const s = classNames.bind(styles);

function getFavoriteStationIds(myFavoriteStations) {
  if (myFavoriteStations) {
    if (myFavoriteStations.length > 0) {
      return myFavoriteStations.map(station => station.siteId);
    }
  }
  return [];
}

/**
|--------------------------------------------------
| Pluck cordinates
|--------------------------------------------------
*/
function pluckLongitudeAndLatitude({ position, type }) {
  if (type === 'lon') {
    return pathOr(18, ['coords', 'longitude'], position);
  } else if (type === 'lat') {
    return pathOr(59, ['coords', 'latitude'], position);
  }
  return null;
}

/**
|--------------------------------------------------
| Get geolocations
|--------------------------------------------------
*/
function getGeolocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

/**
|--------------------------------------------------
| Render react component
|--------------------------------------------------
*/
const CloseStations = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    async function fetchLocation() {
      const response = await getGeolocation();
      setPosition(response);
    }
    fetchLocation();
  }, []);

  if (!position) {
    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Närliggande stationer</h1>
          <SolidSpinner />
        </div>
      </main>
    );
  }

  const [lon, lat] = [
    pluckLongitudeAndLatitude({
      position,
      type: 'lon'
    }),
    pluckLongitudeAndLatitude({
      position,
      type: 'lat'
    })
  ];

  return (
    <main className={s('container')}>
      <div className={s('card')}>
        <h1>Närliggande stationer</h1>
        <h4>{`Longitud: ${lon.toFixed(3)}, Lattitud: ${lat.toFixed(3)}`}</h4>
        <Query query={MY_FAVORITE_STATIONS}>
          {({
            data: { myFavoriteStations },
            errorFavoriteStations,
            loading: loadingFavoriteStations,
            client
          }) => {
            if (!errorFavoriteStations & !loadingFavoriteStations) {
              client.writeData({
                data: { myFavoriteStations }
              });
            }
            const favoriteStationIds = getFavoriteStationIds(
              myFavoriteStations
            );

            return (
              <Query
                query={SEARCH_STATIONS_BY_COORDINATES}
                variables={{
                  lon,
                  lat
                }}
              >
                {({
                  data,
                  error: errorStationsByCoords,
                  loading: loadingStationsByCoords
                }) => {
                  if (errorStationsByCoords) {
                    return <p>Det blev ett error</p>;
                  }

                  return (
                    <StationList
                      favoriteStationIds={favoriteStationIds}
                      fetching={loadingStationsByCoords}
                      stations={pathOr([], ['stations'], data)}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Query>
      </div>
    </main>
  );
};

CloseStations.propTypes = {
  _: PropTypes.bool
};

export default CloseStations;

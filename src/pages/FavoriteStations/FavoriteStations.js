import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { pathOr } from 'ramda';

import { MY_FAVORITE_STATIONS } from 'schemas/querys';

import StationList from 'components/StationList/StationList';

import styles from './FavoriteStations.module.scss';

const s = classNames.bind(styles);

class FavoriteStations extends Component {
  render() {
    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Mina favorit stationer</h1>
          <Query query={MY_FAVORITE_STATIONS}>
            {({ data, error, loading, refetch, client }) => {
              if (!error & !loading) {
                client.writeData({
                  data: { myFavoriteStations: data.myFavoriteStations }
                });
              }
              return (
                <StationList
                  fetching={loading}
                  stations={pathOr([], ['myFavoriteStations'], data)}
                  isFavorites
                />
              );
            }}
          </Query>
        </div>
      </main>
    );
  }
}

FavoriteStations.propTypes = {
  hej: PropTypes.string
};

export default FavoriteStations;

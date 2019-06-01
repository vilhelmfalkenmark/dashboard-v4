import React, { Component } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { MY_FAVORITE_STATIONS } from 'schemas/querys';

import Station from 'components/Station/Station';
import DepartureModal from 'components/DepartureModal/DepartureModal';

import styles from './FavoriteStations.module.scss';

const s = classNames.bind(styles);

class FavoriteStations extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      station: {}
    };
    this.openDepartureModal = this.openDepartureModal.bind(this);
    this.closeDepartureModal = this.closeDepartureModal.bind(this);
  }

  openDepartureModal(siteId, name) {
    this.setState({
      station: {
        siteId,
        name
      },
      modalIsOpen: true
    });
  }

  closeDepartureModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Mina favorit stationer</h1>
          <Query query={MY_FAVORITE_STATIONS}>
            {({ data, error, loading, refetch, client }) => {
              console.log(data);
              if (loading) return <p>Laddar</p>;
              if (error) return `Error!: ${error}`;
              client.writeData({
                data: { myFavoriteStations: data.myFavoriteStations }
              });
              // return null;
              return (
                data.myFavoriteStations.length > 0 && (
                  <ul className={s('list')}>
                    {data.myFavoriteStations.map((station, index) => (
                      <Station
                        isFavorite
                        key={`${station.siteId}_${index}`}
                        openDepartureModal={this.openDepartureModal}
                        station={station}
                      />
                    ))}
                  </ul>
                )
              );
            }}
          </Query>
        </div>
        <DepartureModal
          station={this.state.station}
          isOpen={this.state.modalIsOpen}
          closeDepartureModal={this.closeDepartureModal}
        />
      </main>
    );
  }
}

FavoriteStations.propTypes = {
  hej: PropTypes.string
};

export default FavoriteStations;

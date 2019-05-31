import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import classNames from 'classnames/bind';

import { SEARCH_STATION_BY_NAME } from 'schemas/querys';
import { SpinnerTypes } from 'utils/constants';

import Station from 'components/Station/Station';
import SolidSpinner from 'components/SolidSpinner/SolidSpinner';
import Input from 'components/Input/Input';
import DepartureModal from 'components/DepartureModal/DepartureModal';

import styles from './SearchStations.module.scss';

const s = classNames.bind(styles);

class SearchStations extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      stationsByName: [],
      fetching: false,
      modalIsOpen: false,
      station: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onStationsFetched = this.onStationsFetched.bind(this);
    this.openDepartureModal = this.openDepartureModal.bind(this);
    this.closeDepartureModal = this.closeDepartureModal.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      searchValue: e
    });
  }

  onHandleSubmit() {
    const { client } = this.props;

    return (async () => {
      this.setState({
        fetching: true
      });

      const { data } = await client.query({
        query: SEARCH_STATION_BY_NAME,
        variables: { name: this.state.searchValue }
      });
      this.onStationsFetched(data.stationsByName);
    })();
  }

  onStationsFetched(stationsByName) {
    this.setState({ stationsByName, fetching: false });
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
    const { fetching, stationsByName } = this.state;

    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Sök station</h1>
          <Input
            inputLabel={'Sök station'}
            onInputChange={this.handleInputChange}
            handleSubmit={this.onHandleSubmit}
          />
          {fetching && (
            <SolidSpinner
              color={SpinnerTypes.GREY}
              size={SpinnerTypes.MEDIUM}
            />
          )}
          {stationsByName.length > 0 && (
            <ul>
              {stationsByName.map((station, index) => (
                <Station
                  key={`${station.siteId}_${index}`}
                  openDepartureModal={this.openDepartureModal}
                  station={station}
                />
              ))}
            </ul>
          )}
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

SearchStations.propTypes = {
  hej: PropTypes.string
};

export default withApollo(SearchStations);

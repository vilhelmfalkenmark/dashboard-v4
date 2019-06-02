import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import classNames from 'classnames/bind';
// import { Query } from 'react-apollo';

import { SEARCH_STATION_BY_NAME } from 'schemas/querys';

import Input from 'components/Input/Input';
import StationList from 'components/StationList/StationList';

import styles from './SearchJourney.module.scss';

const s = classNames.bind(styles);

class SearchJourney extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      stations: [],
      fetching: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onStationsFetched = this.onStationsFetched.bind(this);
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
      this.onStationsFetched(data.stations);
    })();
  }

  onStationsFetched(stations) {
    this.setState({ stations, fetching: false });
  }

  getFavoriteStationIds(data) {
    if (data.myFavoriteStations) {
      if (data.myFavoriteStations.length > 0) {
        return data.myFavoriteStations.map(station => station.siteId);
      }
    }
    return [];
  }

  render() {
    const { fetching, stations, searchValue } = this.state;

    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Sök resa</h1>
          <div className={s('row')}>
            <div className={s('col')}>
              <h3>Från station</h3>
              <Input
                inputLabel={'Från station'}
                inputValue={searchValue}
                onInputChange={this.handleInputChange}
                handleSubmit={this.onHandleSubmit}
              />
              <StationList stations={stations} fetching={fetching} />
            </div>
            <div className={s('col')}>
              <h3>Till station </h3>
              <Input
                inputLabel={'Till station'}
                inputValue={searchValue}
                onInputChange={this.handleInputChange}
                handleSubmit={this.onHandleSubmit}
              />
              <StationList stations={stations} fetching={fetching} />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

SearchJourney.propTypes = {
  _: PropTypes.string
};

export default withApollo(SearchJourney);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import classNames from 'classnames/bind';
import { Query } from 'react-apollo';

import { SEARCH_STATION_BY_NAME, MY_FAVORITE_STATIONS } from 'schemas/querys';

import Input from 'components/Input/Input';
import StationList from 'components/StationList/StationList';

import styles from './SearchStations.module.scss';

const s = classNames.bind(styles);

class SearchStations extends Component {
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
      <Query query={MY_FAVORITE_STATIONS}>
        {({ data, error }) => {
          const favoriteStationIds = this.getFavoriteStationIds(data);
          return (
            <main className={s('container')}>
              <div className={s('card')}>
                <h1>Sök station</h1>
                <Input
                  inputLabel={'Sök station'}
                  inputValue={searchValue}
                  onInputChange={this.handleInputChange}
                  handleSubmit={this.onHandleSubmit}
                />
                <StationList
                  stations={stations}
                  favoriteStationIds={favoriteStationIds}
                  fetching={fetching}
                />
              </div>
            </main>
          );
        }}
      </Query>
    );
  }
}

SearchStations.propTypes = {
  _: PropTypes.string
};

export default withApollo(SearchStations);

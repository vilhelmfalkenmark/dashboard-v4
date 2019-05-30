import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import classNames from 'classnames/bind';
import { useQuery } from 'react-apollo-hooks';

import { SEARCH_STATION_BY_NAME } from 'schemas/querys';

import Input from 'components/Input/Input';

import styles from './SearchStations.module.scss';

const s = classNames.bind(styles);

class SearchStations extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      stationsByName: [],
      fetching: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
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

  onStationsFetched = stationsByName =>
    this.setState({ stationsByName, fetching: false });

  render() {
    const { fetching, stationsByName } = this.state;

    console.log(this.state.stationsByName);

    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Sök station</h1>
          <Input
            onInputChange={this.handleInputChange}
            handleSubmit={this.onHandleSubmit}
          />
          {fetching && <p>Laddar</p>}
          {stationsByName.length > 0 && (
            <ul>
              {stationsByName.map((station, index) => (
                <li key={`${station.siteId}_${index}`}>{station.name}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    );
  }
}

SearchStations.propTypes = {
  hej: PropTypes.string
};

export default withApollo(SearchStations);

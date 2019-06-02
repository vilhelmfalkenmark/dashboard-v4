import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import classNames from 'classnames/bind';

import { ModalTypes, SpinnerTypes } from 'utils/constants';
import { GET_DEPARTURES_BY_STATION_ID } from 'schemas/querys';

import ModalBase from 'components/ModalBase/ModalBase';
import SolidSpinner from 'components/SolidSpinner/SolidSpinner';

import styles from './DepartureModal.module.scss';

const s = classNames.bind(styles);

const TIME_WINDOWS = ['10', '20', '30', '60', '90', '120', '240', '480'];

class DepartureModal extends Component {
  constructor() {
    super();
    this.state = {
      fetching: false,
      error: false,
      timeWindowsIndex: 0,
      departures: {
        metros: [],
        buses: [],
        trains: []
      }
    };

    this.oDeparturesFetched = this.oDeparturesFetched.bind(this);
    this.getDeparturesMarkup = this.getDeparturesMarkup.bind(this);
    this.loadDepartures = this.loadDepartures.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState(prevState => ({
      timeWindowsIndex: prevState.timeWindowsIndex + 1
    }));

    this.loadDepartures(TIME_WINDOWS[this.state.timeWindowsIndex + 1]);
  }

  loadDepartures(timeWindow) {
    const { client } = this.props;

    return (async () => {
      this.setState({
        fetching: true
      });

      const { data, loading, error } = await client.query({
        query: GET_DEPARTURES_BY_STATION_ID,
        variables: {
          siteId: this.props.station.siteId,
          timeWindow
        }
      });
      this.oDeparturesFetched(data.departures, loading, error);
    })();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.station.siteId) {
      this.loadDepartures(TIME_WINDOWS[this.state.timeWindowsIndex]);
    }
  }

  oDeparturesFetched(departures, _, error) {
    if (error) {
      this.setState({ error: true, fetching: false });
    }

    this.setState({ departures: { ...departures }, fetching: false });
  }

  getDepartureTypeMarkup(transport, heading, type) {
    return (
      <div>
        <h3>{heading}</h3>
        <ul className={s('list')}>
          {transport.map((t, index) => (
            <li key={`${t.lineNumber}_${index}`} className={s('item')}>
              <div className={s('item_left')}>
                <span
                  className={s('line', {
                    line_bus: type === 'bus',
                    line_metro: type === 'metro',
                    line_train: type === 'train'
                  })}
                >
                  {t.lineNumber}
                </span>
                <span className={s('destination')}>{t.destination}</span>
              </div>
              <p className={s('displayTime')}>{t.displayTime} </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  getDeparturesMarkup({ metros, buses, trains }) {
    if (!this.props.isOpen) {
      return null;
    }

    if (!metros.length && !buses.length && !trains.length) {
      return <p>Inga avgångar hittades</p>;
    }

    return (
      <div>
        <h3>
          {`Avgångar inom ${TIME_WINDOWS[this.state.timeWindowsIndex]} minuter`}
        </h3>
        {metros.length > 0 &&
          this.getDepartureTypeMarkup(metros, 'Tunnelbana', 'metro')}
        {buses.length > 0 &&
          this.getDepartureTypeMarkup(buses, 'Bussar', 'bus')}
        {trains.length > 0 &&
          this.getDepartureTypeMarkup(trains, 'Tåg', 'train')}
        {this.state.timeWindowsIndex < TIME_WINDOWS.length - 1 && (
          <button onClick={this.loadMore}>{`Ladda avgångar inom ${
            TIME_WINDOWS[this.state.timeWindowsIndex + 1]
          } minuter`}</button>
        )}
      </div>
    );
  }

  render() {
    const { fetching, departures, error } = this.state;

    const { station } = this.props;

    return (
      <ModalBase
        overlayClick
        size={ModalTypes.MEDIUM}
        isOpen={this.props.isOpen}
        onCloseCallback={this.props.closeDepartureModal}
      >
        <div className={s('container')}>
          <h1>{`Avgångar från ${station.name}`}</h1>
          {fetching && (
            <div className={s('spinnerContainer')}>
              <SolidSpinner
                color={SpinnerTypes.GREY}
                size={SpinnerTypes.MEDIUM}
              />
            </div>
          )}
          {error && <p>Ett fel har inträffat</p>}
          {!fetching && this.getDeparturesMarkup(departures)}
        </div>
      </ModalBase>
    );
  }
}

DepartureModal.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string,
    siteId: PropTypes.string
  })
};

export default withApollo(DepartureModal);

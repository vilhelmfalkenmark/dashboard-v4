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

class DepartureModal extends Component {
  constructor() {
    super();

    this.state = {
      fetching: false,
      departures: {
        metros: [],
        buses: [],
        trains: []
      }
    };

    this.oDeparturesFetched = this.oDeparturesFetched.bind(this);
    this.getDeparturesMarkup = this.getDeparturesMarkup.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen && this.props.station.siteId) {
      const { client } = this.props;

      return (async () => {
        this.setState({
          fetching: true
        });

        const { data } = await client.query({
          query: GET_DEPARTURES_BY_STATION_ID,
          variables: { siteId: this.props.station.siteId }
        });
        this.oDeparturesFetched(data.departures);
      })();
    }
  }

  oDeparturesFetched(departures) {
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

    return (
      <div>
        {metros.length > 0 &&
          this.getDepartureTypeMarkup(metros, 'Tunnelbana', 'metro')}
        {buses.length > 0 &&
          this.getDepartureTypeMarkup(buses, 'Bussar', 'bus')}
        {trains.length > 0 &&
          this.getDepartureTypeMarkup(trains, 'Tåg', 'train')}
      </div>
    );
  }

  render() {
    const { fetching, departures } = this.state;

    const { station } = this.props;

    return (
      <ModalBase
        overlayClick
        size={ModalTypes.MEDIUM}
        isOpen={this.props.isOpen}
        onCloseCallback={this.props.closeDepartureModal}
      >
        <div className={s('container')}>
          <h1>Avgångar från {station.name}</h1>
          {fetching && (
            <SolidSpinner
              color={SpinnerTypes.GREY}
              size={SpinnerTypes.MEDIUM}
            />
          )}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './FavoriteStations.module.scss';

const s = classNames.bind(styles);

class FavoriteStations extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      searchValue: e
    });
  }

  onHandleSubmit() {}

  render() {
    return (
      <main className={s('container')}>
        <div className={s('card')}>
          <h1>Mina favorit stationer</h1>
        </div>
      </main>
    );
  }
}

FavoriteStations.propTypes = {
  hej: PropTypes.string
};

export default FavoriteStations;

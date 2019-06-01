import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { PulseTypes } from 'utils/constants';

import Pulse from 'components/Pulse/Pulse';

import styles from './Navigation.module.scss';

const s = classNames.bind(styles);

const Navigation = ({ navigation }) => (
  <menu className={s('container')}>
    <nav className={s('nav')}>
      {navigation.map(nav => (
        <div key={nav.id}>
          <header className={s('heading')}>{nav.heading}</header>
          <ul className={s('list')}>
            {nav.routes.map(route => (
              <li key={route.id} className={s('item')}>
                <Pulse color={PulseTypes.BLUE}>
                  <Link className={s('link')} to={route.path}>
                    {route.title}
                  </Link>
                </Pulse>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  </menu>
);

Navigation.propTypes = {
  navigation: PropTypes.array
};

export default Navigation;

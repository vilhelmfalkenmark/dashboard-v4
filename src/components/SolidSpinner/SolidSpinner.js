import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { SpinnerTypes } from 'utils/constants';

import styles from './SolidSpinner.module.scss';

const s = classNames.bind(styles);

const SolidSpinner = ({ className, color, size }) => {
  return (
    <div
      className={s('container', {
        [className]: className
      })}
    >
      <figure
        className={s('spinner', {
          spinner_blue: color === SpinnerTypes.BLUE,
          spinner_lightBlue: color === SpinnerTypes.LIGHT_BLUE,
          spinner_grey: color === SpinnerTypes.GREY,
          spinner_white: color === SpinnerTypes.WHITE,
          spinner_small: size === SpinnerTypes.SMALL,
          spinner_medium: size === SpinnerTypes.MEDIUM,
          spinner_large: size === SpinnerTypes.LARGE
        })}
      />
    </div>
  );
};

SolidSpinner.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
};

export default SolidSpinner;

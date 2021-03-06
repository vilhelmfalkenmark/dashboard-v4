import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { PulseTypes, IconTypes } from 'utils/constants';
import Pulse from 'components/Pulse/Pulse';

import { ReactComponent as CrossIcon } from 'images/svg/cross.svg';
import { ReactComponent as HeartIcon } from 'images/svg/heart.svg';

import styles from './CircleButton.module.scss';

const s = classNames.bind(styles);

const CircleButton = ({ onClickCallback, className, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case IconTypes.HEART:
        return <HeartIcon className={s('icon')} />;
      case IconTypes.CROSS:
        return <CrossIcon className={s('icon')} />;
      default:
        return null;
    }
  };

  return (
    <span className={s('container', { [className]: className })}>
      <Pulse
        onClickCallback={onClickCallback}
        borderRadius={'50%'}
        centerAnimation
        color={PulseTypes.GREY}
        size={PulseTypes.SMALL}
      >
        <span className={s('innerContainer')}>{getIcon()}</span>
      </Pulse>
    </span>
  );
};

CircleButton.propTypes = {
  onClickCallback: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string
};

export default CircleButton;

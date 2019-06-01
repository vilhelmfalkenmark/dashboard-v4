import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { PulseTypes } from 'utils/constants';
import styles from './Pulse.module.scss';

const s = classNames.bind(styles);

class Pulse extends Component {
  constructor() {
    super();
    this.state = {
      animations: []
    };
    this.removeAnimation = this.removeAnimation.bind(this);
    this.getAnimations = this.getAnimations.bind(this);
  }

  removeAnimation(id) {
    this.setState(prevState => ({
      animations: prevState.animations.filter(a => a.id !== id)
    }));
  }

  clicked(e) {
    const rect = e.target.getBoundingClientRect();
    const { centerAnimation } = this.props;

    const x = centerAnimation ? rect.width / 2 : e.clientX - rect.left;
    const y = centerAnimation ? rect.height / 2 : e.clientY - rect.top;

    const size = Math.max(rect.height, rect.width) * 2;

    const id = setTimeout(() => {
      this.removeAnimation(id);
    }, 800);

    this.setState(prevState => ({
      animations: [{ x, y, size, id }].concat(prevState.animations)
    }));

    if (this.props.onClickCallback) {
      this.props.onClickCallback();
    }
  }

  getAnimations(animations) {
    return animations.length > 0
      ? animations.map(a => (
          <span
            key={a.id}
            className={s('animation', {
              animation_grey: this.props.color === PulseTypes.GREY,
              animation_blue: this.props.color === PulseTypes.BLUE
            })}
            style={{
              height: `${a.size}px`,
              width: `${a.size}px`,
              top: `calc(${a.y}px - ${a.size / 2}px) `,
              left: `calc(${a.x}px - ${a.size / 2}px)`
            }}
          />
        ))
      : null;
  }

  render() {
    const { animations } = this.state;

    const { className, color, onClickCallback } = this.props;

    if (onClickCallback) {
      return (
        <button
          onClick={this.clicked.bind(this)}
          className={s('container', {
            container_grey: color === PulseTypes.GREY,
            container_blue: color === PulseTypes.BLUE,
            [className]: className
          })}
          style={{ borderRadius: this.props.borderRadius || null }}
        >
          {this.getAnimations(animations)}
          {this.props.children}
        </button>
      );
    }

    return (
      <span
        onClick={this.clicked.bind(this)}
        className={s('container', { [className]: className })}
        style={{ borderRadius: this.props.borderRadius || null }}
      >
        {this.getAnimations(animations)}
        {this.props.children}
      </span>
    );
  }
}

Pulse.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default Pulse;

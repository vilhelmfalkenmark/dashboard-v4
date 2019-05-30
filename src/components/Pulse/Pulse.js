import React, { Component } from 'react';
import classNames from 'classnames/bind';

import styles from './Pulse.module.scss';

const s = classNames.bind(styles);

class Pulse extends Component {
  constructor() {
    super();
    this.state = {
      animations: []
    };
    this.removeAnimation = this.removeAnimation.bind(this);
  }

  removeAnimation(id) {
    this.setState(prevState => ({
      animations: prevState.animations.filter(a => a.id !== id)
    }));
  }

  clicked(e) {
    // if (this.props.onClickCallback) {
    //   this.props.onClickCallback();
    // } else {
    //   // return false;
    // }

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const size = Math.max(rect.height, rect.width) * 2;

    const id = setTimeout(() => {
      this.removeAnimation(id);
    }, 800);

    this.setState(prevState => ({
      animations: [{ x, y, size, id }].concat(prevState.animations)
    }));
  }

  render() {
    const { animations } = this.state;

    const { className } = this.props;

    return (
      <span
        onClick={this.clicked.bind(this)}
        className={s('container', { [className]: className })}
        style={{ borderRadius: this.props.borderRadius || null }}
      >
        {animations.length > 0
          ? animations.map(a => (
              <span
                key={a.id}
                className={s('animation')}
                style={{
                  height: `${a.size}px`,
                  width: `${a.size}px`,
                  top: `calc(${a.y}px - ${a.size / 2}px) `,
                  left: `calc(${a.x}px - ${a.size / 2}px)`
                }}
              />
            ))
          : null}
        {this.props.children}
      </span>
    );
  }
}

export default Pulse;

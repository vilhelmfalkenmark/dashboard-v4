import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { ModalTypes, IconTypes } from 'utils/constants';
import styles from './ModalBase.module.scss';
import CircleButton from 'components/CircleButton/CircleButton';

const s = classNames.bind(styles);

class ModalBase extends Component {
  constructor() {
    super();
    this.state = {
      hasBeenOpened: false
    };

    this.onClose = this.onClose.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.htmlRef = document.getElementsByTagName('html')[0];
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.isOpen) {
      return { ...nextState, hasBeenOpened: true };
    }
    return {};
  }

  componentWillUnmount() {
    if (this.state.hasBeenOpened) {
      document.removeEventListener('keydown', this.escFunction, false);
    }
  }

  escFunction(event) {
    // ESC key
    if (event.keyCode === 27) {
      this.onClose();
    }
  }

  onClose() {
    this.setState({
      hasBeenOpened: true
    });

    this.props.onCloseCallback();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hasBeenOpened === false && this.props.isOpen) {
      document.addEventListener('keydown', this.escFunction, false);
    }

    if (this.props.isOpen !== prevProps.isOpen) {
      // Modal was opened
      if (this.props.isOpen) {
        this.htmlRef.classList.toggle('modal-is-open');
      }
      // Modal was closed
      else {
        this.htmlRef.classList.toggle('modal-is-open');
      }
    }
  }

  render() {
    const {
      onCloseCallback,
      overlayClick,
      children,
      isOpen = false,
      type = ModalTypes.SMALL
    } = this.props;

    return (
      <div
        className={s('container', {
          container_hasBeenOpened: this.state.hasBeenOpened,
          container_isClosed: !isOpen,
          container_isOpen: isOpen
        })}
      >
        <div className={s('inner')}>
          <button
            className={s('closeOverlay', {
              closeOverlay_isOpen: isOpen,
              closeOverlay_isDisabled: !overlayClick
            })}
            onClick={overlayClick ? onCloseCallback : () => null}
          />
          <div
            className={s('children', {
              children_isExtraSmall: type === ModalTypes.EXTRA_SMALL,
              children_isSmall: type === ModalTypes.SMALL,
              children_isMedium: type === ModalTypes.MEDIUM,
              children_isLarge: type === ModalTypes.LARGE,
              children_isResponsive: type === ModalTypes.RESPONSIVE,
              children_isOpen: isOpen,
              children_isClosed: !isOpen
            })}
          >
            <CircleButton
              className={s('closeContainer')}
              icon={IconTypes.CROSS}
              onClickCallback={this.props.onCloseCallback}
            />

            {children}
          </div>
        </div>
      </div>
    );
  }
}

ModalBase.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onCloseCallback: PropTypes.func,
  isOpen: PropTypes.bool,
  overlayClick: PropTypes.bool,
  title: PropTypes.string
};

ModalBase.defaultProps = {
  onCloseCallback: () => {
    console.error('onCloseCallback missing in component'); // eslint-disable-line
  }
};

export default ModalBase;

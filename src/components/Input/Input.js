import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const s = classNames.bind(styles);

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: props.inputValue || false };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  handleOnKeyDown(e) {
    if (e.key === 'Enter' && this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }

  handleOnChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const {
      inputLabel,
      inputValue,
      inputName,
      inputDisabled,
      submitButtonText
    } = this.props;
    const { focus } = this.state;
    const inputHtml = [
      <input
        key={1}
        disabled={inputDisabled}
        name={inputName}
        value={inputValue}
        onFocus={() =>
          this.setState({
            focus: true
          })
        }
        onBlur={() =>
          this.setState({
            focus: inputValue ? true : false
          })
        }
        onKeyDown={event => this.handleOnKeyDown(event)}
        onChange={event => this.handleOnChange(event)}
        className={s('input')}
      />,
      <span className={s('line')} key={2} />
    ];
    const labelHtml = (
      <label
        htmlFor={inputName}
        className={s('label', { label_isFocused: focus })}
      >
        {inputLabel}
      </label>
    );

    return (
      <div className={s('container')}>
        {labelHtml}
        {inputHtml}
        {submitButtonText && (
          <button
            className={s('submitButton')}
            onClick={() => this.props.handleSubmit()}
          >
            {submitButtonText}
          </button>
        )}
      </div>
    );
  }
}

export default Input;

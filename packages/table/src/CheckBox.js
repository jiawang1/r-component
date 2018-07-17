import React from 'react';
import PropTypes from 'prop-types';

import './CheckBox.css';

class CheckBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: false,
      initialized: false
    };
    this.onClick = this.onClick.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let { value } = nextProps;
    const { disabled } = nextProps;

    if ((!disabled && value !== undefined) || !prevState.initialized) {
      let __state = null;
      value = value === 'false' ? false : Boolean(value);
      if (value !== prevState.value) {
        __state = { value };
      }
      if (!prevState.initialized) {
        __state = __state ? { ...__state, initialized: true } : { initialized: true };
      }
      return __state;
    }
    return null;
  }

  onClick() {
    const { onChange, disabled } = this.props;
    if (disabled) return;
    this.setState(pre => {
      const value = !pre.value;
      onChange(value);
      return { value };
    });
  }
  render() {
    const { value } = this.state;
    const { disabled } = this.props;
    return (
      <div
        onClick={this.onClick}
        className={`p-checkbox ${disabled ? 'disabled' : ''} ${value ? 'checked' : ''}`}
      >
        <span className="check-mark" />
      </div>
    );
  }
}
CheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool
};

CheckBox.defaultProps = {
  disabled: false,
  value: false
};

export default CheckBox;

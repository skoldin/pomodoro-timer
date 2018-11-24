import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class LengthControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maxValue: 60,
      minValue: 1,
      value: this.props.value
    };

    this.decrementHandle = this.decrementHandle.bind(this);
    this.incrementHandle = this.incrementHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  incrementHandle() {
    this.setState((prevState) => {
      const newValue = (prevState.value >= this.state.maxValue) ?
        this.state.maxValue : prevState.value += 1;

      this.props.updateAppState(this.props.prop, newValue);

      return {
        value: newValue
      }
    });
  }

  decrementHandle() {
    this.setState((prevState) => {
      const newValue = (prevState.value <= this.state.minValue) ?
        this.state.minValue : prevState.value -= 1;

      this.props.updateAppState(this.props.prop, newValue);

      return {
        value: newValue
      }
    });
  }

  render() {
    return (
      <div className={"length-control"}>
        <h3 id={this.props.labelId}>{this.props.label}</h3>
        <div className="controls">
          <button id={this.props.incrementId} onClick={this.incrementHandle} disabled={this.props.disabled}><FontAwesomeIcon
            icon={faChevronUp}/></button>
          <div className="value" id={this.props.elemId}>{this.state.value}</div>
          <button id={this.props.decrementId} onClick={this.decrementHandle} disabled={this.props.disabled}><FontAwesomeIcon
            icon={faChevronDown}/></button>
        </div>
      </div>
    );
  }
}

LengthControl.propTypes = {
  elemId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  prop: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  decrementId: PropTypes.string.isRequired,
  incrementId: PropTypes.string.isRequired,
  updateAppState: PropTypes.func.isRequired
};

export default LengthControl;
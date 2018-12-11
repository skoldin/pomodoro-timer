import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setSessionLength, setBreakLength } from '../actions/lengthActions';

export class LengthControl extends React.Component {
  constructor(props) {
    super(props);

    this.decrementHandle = this.decrementHandle.bind(this);
    this.incrementHandle = this.incrementHandle.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  changeHandle(e) {
    this.props.setLength(e.target.value);
  }

  incrementHandle() {
    this.props.setLength(this.props.timeLength + 1);
  }

  decrementHandle() {
    this.props.setLength(this.props.timeLength -1);
  }

  render() {
    return (
      <div className={"length-control"}>
        <h3 id={this.props.labelId}>{this.props.label}</h3>
        <div className="length-controls-inner">
          <button title={"You can click the number to edit"} id={this.props.decrementId} onClick={this.decrementHandle} ><FontAwesomeIcon
            icon={faChevronLeft}/></button>
          <input className="value"
                 id={this.props.elemId}
                 value={this.props.timeLength}
                 onChange={this.changeHandle}/>
          <button title={"You can click the number to edit"} id={this.props.incrementId} onClick={this.incrementHandle}><FontAwesomeIcon
            icon={faChevronRight}/></button>
        </div>
      </div>
    );
  }
}

LengthControl.propTypes = {
  elemId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  decrementId: PropTypes.string.isRequired,
  incrementId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    timeLength: (ownProps.type === 'session') ? state.sessionLength : state.breakLength
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const setLength = (ownProps.type === 'session') ? setSessionLength : setBreakLength;

  return {
    setLength: (length) => {
      dispatch(setLength(length));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LengthControl);
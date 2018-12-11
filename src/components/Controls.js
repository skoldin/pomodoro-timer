import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import storageHelper from '../storageHelper';
import { startTimer, stopTimer, reset } from '../actions/controlsActions';

export class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.toggleRun = this.toggleRun.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleRun() {
    if (this.props.running) {
      this.props.stopTimer();
      sessionStorage.removeItem('running');
    } else {
      this.props.startTimer();
      storageHelper.setBool('running', true);
    }
  }

  reset() {
    this.props.reset();

    const sound = document.getElementById('beep');

    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }

    sessionStorage.clear();
  }

	render() {
    return (
      <div className={'controls'}>
        <button id="start_stop" onClick={this.toggleRun}>
          <FontAwesomeIcon icon={(this.props.running) ? faPause : faPlay}/>
        </button>
        <button id="reset" onClick={this.reset}>
          <FontAwesomeIcon icon={faSync}/>
        </button>
      </div>
    );
	}
}

Controls.propTypes = {
  running: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

function mapStateToProps( state ) {
  return {
    running: state.running
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: () => {
      dispatch(startTimer());
    },
    stopTimer: () => {
      dispatch(stopTimer());
    },
    reset: () => {
      dispatch(reset());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
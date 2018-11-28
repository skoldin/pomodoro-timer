import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';
import storageHelper from '../storageHelper';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: storageHelper.getBool('running') || this.props.running
    };

    this.toggleRun = this.toggleRun.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleRun() {
    this.setState((prevState) => {
      const running = ! prevState.running;

      sessionStorage.setItem('running', running.toString());
      this.props.updateAppState('running', running);

      return {
        running
      }
    });
  }

  reset() {
    this.props.reset();

    this.setState({
      running: false
    });

    this.props.updateAppState('running', false);
    sessionStorage.setItem('running', 'false');
  }

	render() {
    return (
      <div className={'controls'}>
        <button id="start_stop" onClick={this.toggleRun}>
          <FontAwesomeIcon icon={(this.state.running) ? faPause : faPlay}/>
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
  updateAppState: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default Controls;
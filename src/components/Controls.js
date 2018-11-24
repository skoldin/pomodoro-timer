import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: this.props.running
    };

    this.toggleRun = this.toggleRun.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleRun() {
    this.setState((prevState) => {
      this.props.updateAppState('running', ! prevState.running);

      return {
        running: ! prevState.running
      }
    });
  }

  reset() {
    this.props.reset();

    this.setState({
      running: false
    })
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
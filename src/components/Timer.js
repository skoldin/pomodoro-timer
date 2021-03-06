import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import storageHelper from '../storageHelper';
import { startTimer, stopTimer } from '../actions/controlsActions';

export class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.msInSec = 1000;
    this.msInMin = 60 * this.msInSec;
    this.defaultTime =  this.msInMin * this.props.sessionLength;
    this.timer = null;

    this.state = {
        running: storageHelper.getBool('running') || false,
        isBreak: storageHelper.getBool('isBreak') || false,
        timeLeft: sessionStorage.getItem('timeLeft') || this.defaultTime
      };
  }

  resetTimer() {
    clearInterval(this.timer);

    this.timer = null;
  }

  toggleStartStop(running) {
    if (running && ! this.timer) {
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);

      this.props.startTimer();
    } else if ( ! running ) {
      this.resetTimer();

      this.props.stopTimer();
    }
  }

  componentWillMount() {
    this.toggleStartStop(sessionStorage.getItem('running') || this.state.running);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.toggleStartStop(nextState.running);
  }

  componentWillReceiveProps(next) {
    if (next.reset) {
      this.setState({
        running: false,
        isBreak: false,
        timeLeft: this.defaultTime,
      });
    }

    if (this.props.running !== next.running) {
      this.toggleStartStop(next.running);

      this.setState({
        running: next.running
      });

      sessionStorage.setItem('running', next.running);
    }

    if (this.props.sessionLength !== next.sessionLength && ! this.state.isBreak) {
      this.setState({
        timeLeft: this.msInMin * next.sessionLength
      });
    }

    if (this.props.breakLength !== next.breakLength && this.state.isBreak) {
      this.setState({
        timeLeft: this.msInMin * next.breakLength
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime() {
    let seconds = parseInt((this.state.timeLeft / 1000) % 60),
      minutes = parseInt(((this.state.timeLeft / 1000) / 60));
    
    // add leading zeros
    seconds = (seconds < 10) ? '0' + seconds: seconds;
    minutes = (minutes < 10) ? '0' + minutes: minutes;

    return `${minutes}:${seconds}`;
  }

  tick() {
    this.setState((prevState) => {
      const toggleBreak = (prevState.timeLeft - 1000 < 0);
      let newTime = prevState.timeLeft - 1000;
      let isBreak = this.state.isBreak;

      if (toggleBreak) {
        // there's no need in using actual html tag but that was part of requirements
        document.getElementById('beep').play()
          .catch(err => console.log(err));

        if (! isBreak) {
          newTime = this.props.breakLength * this.msInMin;
          isBreak = true;
        } else {
          newTime = this.props.sessionLength * this.msInMin;
          isBreak = false;
        }
      }

      // update session storage
      sessionStorage.setItem('timeLeft', newTime);
      sessionStorage.setItem('isBreak', isBreak);

      return {
        timeLeft: newTime,
        isBreak
      }
    });
  }

  render() {
    let favicon = '/favicon.ico',
      title = 'Pomodoro Timer';

    if (this.state.running && this.state.isBreak) {
      title = this.formatTime(this.state.timeLeft) + ' | Break | ' + title;
      favicon = '/favicon-break.ico';
    } else if (this.state.running) {
      title = this.formatTime(this.state.timeLeft) + ' | Session | ' + title;
      favicon = '/favicon-session.ico';
    }

    return (
      <div className={'timer'}>
        <Helmet defer={false}>
          <link rel="shortcut icon" href={favicon + '?v=3'}/>
          <title>{title}</title>
        </Helmet>
        <h3 id={"timer-label"}>{ (this.state.isBreak) ? 'Break' : 'Session' }</h3>
        <div id="time-left" style={(this.state.timeLeft < 60000) ? {color: '#980000'} : {}}>{this.formatTime()}</div>
        <audio src="gong.wav" id="beep"></audio>
      </div>
    )
  }
}

Timer.propTypes = {
  sessionLength: PropTypes.number.isRequired,
  breakLength: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    sessionLength: state.sessionLength,
    breakLength: state.breakLength,
    running: state.running,
    reset: state.reset
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: () => {
      dispatch(startTimer());
    },
    stopTimer: () => {
      dispatch(stopTimer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
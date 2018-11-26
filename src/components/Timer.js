import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.msInSec = 1000;
    this.msInMin = 60 * this.msInSec;
    this.defaultTime = this.msInMin * this.props.sessionLength;
    this.timer = null;

    this.state = {
      running: props.running,
      isBreak: props.isBreak,
      timeLeft: this.defaultTime
    };
  }

  resetTimer() {
    clearInterval(this.timer);

    this.timer = null
  }

  toggleStartStop(running) {
    if (running && ! this.timer) {
      this.timer = setInterval(() => {
        this.tick();
      }, 100)
    } else if ( ! running ) {
      this.resetTimer();
    }
  }

  componentWillReceiveProps(next) {
    if (next.reset) {
      this.setState({
        isBreak: false,
        timeLeft: this.defaultTime,
      });

      this.props.updateAppState('reset', false);
    }

    if (this.props.sessionLength !== next.sessionLength) {
      this.setState({
        timeLeft: this.msInMin * next.sessionLength
      })
    }

    if (this.props.running !== next.running) {
      this.toggleStartStop(next.running);
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

      return {
        timeLeft: newTime,
        isBreak
      }
    });
  }

  render() {
    let favicon = '/favicon.ico';

    if (this.props.running && this.state.isBreak) {
      favicon = '/favicon-break.ico';
    } else if (this.props.running) {
      favicon = '/favicon-session.ico';
    }

    return (
      <div className={'timer'}>
        <Helmet defer={false}>
          <link rel="shortcut icon" href={favicon}/>
          <title>{(this.props.running) ? `${this.formatTime(this.state.timeLeft)} | Pomodoro Timer` : 'Pomodoro Timer'}</title>
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
  breakLength: PropTypes.number.isRequired,
  isBreak: PropTypes.bool.isRequired
};

export default Timer;
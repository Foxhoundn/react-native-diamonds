// @flow
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import pure from 'recompose/onlyUpdateForKeys';

import Text from '../../components/text';
import styles from './style';

type Props = {
  streak: number,
};

class Streak extends Component {

  state: {
    show: boolean,
    streak: number,
    scale: number,
    opacity: number,
  } = {
    show: false,
    streak: 0,
    scale: 0,
    opacity: new Animated.Value(0),
  };

  timeout: ?any = null;

  componentWillReceiveProps(nextProps: Props) {
    const { streak } = this.props;

    if (streak !== nextProps.streak) {
      if (nextProps.streak > 1) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          this.setState({
            show: false,
          });
        }, 1500);

        this.setState({
          show: true,
          streak: nextProps.streak,
          scale: new Animated.Value(2),
          opacity: new Animated.Value(0),
        });
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { streak } = this.props;
    const { scale, opacity } = this.state;

    if (prevProps.streak !== streak) {
      if (streak > 1) {
        Animated.timing(
          opacity,
          {
            toValue: 1,
            duration: 100,
          }
        ).start();

        Animated.timing(
          scale,
          {
            toValue: 1 + ((streak > 4 ? 4 : streak) / 10),
            duration: 100,
          }
        ).start();
      }
    }
  }

  render() {
    if (!this.state.show) return null;

    const { scale, opacity } = this.state;

    return (
      <Animated.View
        style={[
          styles.streakWrapper,
          {
            opacity,
            transform: [{
              scale,
            }],
          }
        ]}
      >
        <Text style={styles.streakText}>
          STREAK <Text style={[
            styles.streakText,
            styles.multiplierText,
          ]}>x{this.state.streak}!</Text>
        </Text>
      </Animated.View>
    );
  }
}

export default pure(['streak'])(Streak);

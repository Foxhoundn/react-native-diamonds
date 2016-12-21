/* @flow */
import React, { Component } from 'react';
import { Animated } from 'react-native';

import Text from '../../components/text';
import styles from './style';

export default class HighScore extends Component {
  props: {
    isHighscore: boolean,
  };

  state: {
    opacity: number,
  } = {
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 1,
      }
    ).start();
  }

  render() {
    if (!this.props.isHighscore) return null;

    return (
      <Animated.View
        style={{
          opacity: this.state.opacity,
        }}
      >
        <Text style={styles.highScoreText}>
          NEW BEST SCORE!
        </Text>
      </Animated.View>
    );
  }
}

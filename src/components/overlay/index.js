/* @flow */
import React, { Component } from 'react';
import { Animated } from 'react-native';

import globalStyles from '../../style';
import styles from './style';

export default class Overlay extends Component {
  props: {
    children?: any,
  };

  state: {
    opacity: Object,
  } = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 200,
      }
    ).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          globalStyles.flexCenter,
          styles.overlay,
          {
            opacity: this.state.opacity,
          }
        ]}
      >
        { this.props.children }
      </Animated.View>
    )
  }
}

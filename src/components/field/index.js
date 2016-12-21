/* @flow */
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import globalStyles from '../../style';

type Props = {
  active: boolean,
  position: number,
  row: number,
  color: string,
  onPress: Function,
}

class Field extends Component {
  props: Props;

  state: {
    opacity: AnimatedValue | AnimatedValueXY,
  } = {
    opacity: new Animated.Value(1),
  };

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.color === 'transparent') {
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 350,
        }
      ).start();
    } else {
      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 1,
        }
      ).start();
    }
  }

  render() {
    const { onPress, active, color } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.field,
          ]}
        >
          <LinearGradient
            colors={['transparent', 'rgba(140, 140, 140, 0.3)']}
            style={[
              globalStyles.flexCenter,
              {
                alignSelf: 'stretch',
              }
            ]}
          >
            <Animated.Image
              style={[
                styles.fieldImage,
                active ? styles.fieldImageSelected : {},
                {
                  opacity: this.state.opacity,
                  transform: [
                    {
                      scale: this.state.opacity.interpolate({
                        inputRange: [0, 0.9, 1],
                        outputRange: [0.3, 1.6, 1],
                      }),
                    },
                    {
                      rotateZ: this.state.opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['180deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
              source={{ uri: color }}
            />
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Field;

/* @flow */
import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
} from 'react-native';

import styles from './style';

type Props = {
  active: boolean,
  field: Object,
  onPress: Function,
}

class Field extends Component {
  props: Props;

  state: {
    opacity: number,
  } = {
    opacity: new Animated.Value(1),
  };

  componentWillReceiveProps(nextProps): void {
    if (nextProps.field.color === 'transparent') {
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          duration: 250,
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
    const { onPress, active, field } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          style={[
            styles.field,
            active ? styles.selectedField : {},
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 0.8, 1],
                    outputRange: [0.4, 1.4, 1],
                  }),
                },
                {
                  rotateZ: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                  }),
                }
              ]
            }
          ]}
        >
          <Image
            style={[
              styles.fieldImage,
              active ? styles.fieldImageSelected : {}
            ]}
            source={{ uri: field.color }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Field;

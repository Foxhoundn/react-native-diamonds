/* @flow */
import React from 'react';
import {
  TouchableHighlight,
  View,
  Text
} from 'react-native';

import styles from './style';

type Props = {
  children: string,
  onPress: Function,
  disabled: boolean,
  wrapperStyle?: Object,
  textStyle?: Object,
}

const Button: Function = ({
  children,
  onPress,
  disabled,
  wrapperStyle = {},
  textStyle = {},
}: Props): React.Component<any> => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="transparent"
  >
    <View
      style={[
        styles.buttonWrapper,
        wrapperStyle,
        disabled ? styles.buttonDisabled : {},
      ]}
    >
      <Text style={[styles.buttonText, textStyle]}>
        { children }
      </Text>
    </View>
  </TouchableHighlight>
);

export default Button;

/* @flow */
import React from 'react';
import {
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import Text from '../text/';

type Props = {
  children: string,
  onPress: Function,
  disabled: boolean,
  wrapperStyle?: Object,
  textStyle?: Object,
  icon?: string,
  iconStyle: Object,
}

const Button: Function = ({
  children,
  onPress,
  disabled,
  wrapperStyle = {},
  textStyle = {},
  icon,
  iconStyle = {},
}: Props): React.Component<any> => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="transparent"
  >
   <View
     style={[
       icon ? styles.iconWrapper : styles.buttonWrapper,
       wrapperStyle,
       disabled ? styles.buttonDisabled : {},
     ]}
    >
    <LinearGradient
      colors={disabled ? ['#a9a9a9', '#696969'] : ['#8440b2', '#d326b6']}
      style={[
        styles.gradient,
        disabled ? styles.disabledGradient : null,
      ]}
    >
      {icon ? (
        <Icon
          name={icon}
          color="#fff"
          backgroundColor="transparent"
          size={15}
          iconStyle={iconStyle}
        />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>
          { children }
        </Text>
      )}
    </LinearGradient>
   </View>
  </TouchableHighlight>
);

export default Button;

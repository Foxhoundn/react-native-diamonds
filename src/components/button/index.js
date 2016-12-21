/* @flow */
import React from 'react';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/onlyUpdateForKeys';
import {
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import Text from '../text/';
import { vibrate } from '../../store/app/actions';

type Props = {
  children: number,
  onButtonPress: Function,
  onPress: Function,
  disabled: boolean,
  wrapperStyle?: Object,
  textStyle?: Object,
  icon?: string,
  iconStyle: Object,
  vibrate: Function,
}

const Button: Function = ({
  children,
  onButtonPress,
  disabled,
  wrapperStyle = {},
  textStyle = {},
  icon,
  iconStyle = {},
}: Props): React.Component<any> => (
  <TouchableHighlight
    onPress={onButtonPress}
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

export default compose(
  connect(
    () => ({}),
    {
      vibrate,
    }
  ),
  withHandlers({
    onButtonPress: (props: Props): Function => (): void => {
      props.vibrate();
      props.onPress();
    },
  }),
  pure([
    'children',
    'disabled',
  ])
)(Button);

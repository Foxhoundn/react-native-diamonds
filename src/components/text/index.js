/* @flow */
import React from 'react';
import { Text } from 'react-native';

import styles from './style';

type Props = {
  style?: Object,
  children: string | number,
}

const CustomText: Function = ({ style, children }: Props): React.Element<any> => (
  <Text
    style={[
      styles.text,
      style,
    ]}
  >
    { children }
  </Text>
);

export default CustomText;

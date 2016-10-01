/* @flow */
import React from 'react';
import { View } from 'react-native';

import styles from './style';

type Props = {
  customStyle: Object,
}

const Section: Function = ({ children, customStyle }: Props): React.Element<any> => (
  <View
    style={[
      styles.section,
      customStyle,
    ]}
  >
    { children }
  </View>
);

export default Section;

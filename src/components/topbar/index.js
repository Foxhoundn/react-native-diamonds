/* @flow */
import React from 'react';
import { View } from 'react-native';

import globalStyles from '../../style';
import styles from './style';

type Props = {
  onBackPress: Function,
  children: any,
  customStyle: Object,
}

const TopBar: Function = ({ onBackPress, children, customStyle }: Props): React.Element<any> => (
  <View
    style={[
      globalStyles.flex,
      styles.topbar,
    ]}
  >
    { children }
  </View>
);

export default TopBar;

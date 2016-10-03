/* @flow */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import globalStyles from '../../style';
import styles from './style';

type Props = {
  onBackPress: Function,
  children: any,
  customStyle: Object,
}

const TopBar: Function = ({ onBackPress, children, customStyle }: Props): React.Element<any> => (
  <LinearGradient
    colors={['#065187', '#1f9af2']}
    style={[
      globalStyles.flex,
      styles.topbar,
    ]}
  >
    { children }
  </LinearGradient>
);

export default TopBar;

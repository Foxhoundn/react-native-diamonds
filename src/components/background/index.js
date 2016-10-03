/* @flow */
import React from 'react';
import { Image } from 'react-native';

import globalStyles from '../../style';

type Props = {
  children: any,
  style: Object,
}

const Background: Function = ({ children, style }: Props): React.Element<any> => (
  <Image
    style={[
      style || globalStyles.flexCenter,
    ]}
    source={{ uri: 'space' }}
    resizeMode="contain"
  >
    { children }
  </Image>
);

export default Background;

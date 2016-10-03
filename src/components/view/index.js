/* @flow */
import React from 'react';
import { StatusBar } from 'react-native';

import Background from '../../components/background';
import Section from '../../components/section';

type Props = {
  children: any,
  style?: Object,
  backgroundStyle?: Object,
}

const View: Function = ({ children, style = null, backgroundStyle = null }: Props): React.Element<any> => (
  <Section customStyle={style}>
    <StatusBar hidden />
    <Background style={backgroundStyle}>
      { children }
    </Background>
  </Section>
);

export default View;

/* @flow */
import React from 'react';
import { Text } from 'react-native';
import pure from 'recompose/pure';

import Section from '../../components/section';
import globalStyles from '../../style';

type Props = {
  saveTime: Function,
  time: number,
}

const MovesCounter: Function = ({ moves }: Props): React.Element<any> => (
  <Section customStyle={globalStyles.flexCenter}>
    <Text style={{ fontSize: 20, color: 'white' }}> { moves } </Text>
  </Section>
);

export default pure(MovesCounter);

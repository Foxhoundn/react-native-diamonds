/* @flow */
import React from 'react';
import pure from 'recompose/pure';

import Section from '../../components/section';
import Text from '../../components/text';
import globalStyles from '../../style';

type Props = {
  score: number,
}

const Score: Function = ({ score }: Props): React.Element<any> => (
  <Section customStyle={globalStyles.flexCenter}>
    <Text> Score: { score } </Text>
  </Section>
);

export default pure(Score);

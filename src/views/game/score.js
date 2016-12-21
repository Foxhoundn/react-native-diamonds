/* @flow */
import React from 'react';
import pure from 'recompose/pure';

import Section from '../../components/section';
import Text from '../../components/text';
import globalStyles from '../../style';
import styles from './style';

type Props = {
  score: number,
  streak: number,
}

const Score: Function = ({ score, streak }: Props): React.Element<any> => (
  <Section customStyle={globalStyles.flexCenter}>
    <Text>
      Score: { score }
      {' '}
      { streak > 2 && (
          <Text style={styles.multiplierText}>(x{streak * 0.5})</Text>
        )
      }
    </Text>
  </Section>
);

export default pure(Score);

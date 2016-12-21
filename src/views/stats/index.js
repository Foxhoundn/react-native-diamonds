/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import { connect } from 'react-redux';

import View from '../../components/view';
import Section from '../../components/section';
import TopBar from '../../components/topbar';
import Text from '../../components/text';
import Button from '../../containers/button';
import withPop from '../../hocomponents/withPop';
import loading from '../../hocomponents/loader';
import globalStyles from '../../style';
import styles from './style';
import { loadStats } from '../../store/app/actions';

type Props = {
  highscore: Object,
  gamesPlayed: number,
  goBack: Function,
  streak: number,
}

const StatsView: Function = ({
  highscore,
  gamesPlayed,
  goBack,
  streak,
}: Props): React.Element<any> => (
  <View backgroundStyle={globalStyles.flex}>
    <TopBar>
      <Section
        customStyle={[
          globalStyles.flexCenter,
          globalStyles.topbarLeftElement,
        ]}
      >
        <Button
          icon="chevron-left"
          onPress={goBack}
        />
      </Section>
      <Section
        customStyle={[
          globalStyles.flexCenter,
          globalStyles.topbarTitle,
        ]}
      >
        <Text style={globalStyles.topbarTitleText}>
          Statistics
        </Text>
      </Section>
      <Section
        customStyle={[
          globalStyles.flexCenter,
          globalStyles.topbarRightElement,
        ]}
      />
    </TopBar>
    <Section customStyle={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={styles.text}> High Score </Text>
      <Text style={styles.text}>Classic: { highscore.classic }</Text>
      <Text style={styles.text}>Best of one: { highscore.bestOfOne }</Text>
      <Text style={styles.text}> Games played </Text>
      <Text style={styles.text}>{ gamesPlayed }</Text>
      <Text style={styles.text}> Longest streak </Text>
      <Text style={styles.text}>{ streak }</Text>
    </Section>
  </View>
);

export default compose(
  connect(
    ({ app: { stats: { highscore, gamesPlayed, streak } } }) => ({
      highscore,
      gamesPlayed,
      streak,
    }),
    {
      loadStats,
    }
  ),
  withPop(),
)(StatsView);

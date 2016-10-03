/* @flow */
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { changeSettings } from '../../store/app/actions';
import View from '../../components/view';
import Section from '../../components/section';
import TopBar from '../../components/topbar';
import Text from '../../components/text';
import SettingsButton from './button';
import Button from '../../containers/button';
import withPop from '../../hocomponents/withPop';
import globalStyles from '../../style';
import styles from './style';

type Props = {
  sfx: boolean,
  music: boolean,
  vibrations: boolean,
  changeSettings: Function,
  goBack: Function,
}

const SettingsView: Function = ({
  sfx,
  music,
  vibrations,
  changeSettings,
  goBack,
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
          Options
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
        <Text style={styles.text}> Sound effects </Text>
        <SettingsButton
          onPress={changeSettings}
          setting="sfx"
          value={sfx}
        />
        <Text style={styles.text}> Music </Text>
        <SettingsButton
          onPress={changeSettings}
          setting="music"
          value={music}
        />
        <Text style={styles.text}> Vibrations </Text>
        <SettingsButton
          onPress={changeSettings}
          setting="vibrations"
          value={vibrations}
        />
    </Section>
  </View>
);

export default compose(
  connect(
    ({ app: { settings } }) => ({
      sfx: settings.sfx,
      music: settings.music,
      vibrations: settings.vibrations,
    }),
    { changeSettings }
  ),
  withPop(),
)(SettingsView);

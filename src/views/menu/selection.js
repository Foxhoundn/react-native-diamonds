import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import Button from '../../containers/button';
import View from '../../components/view';
import GameView from '../../views/game';
import Section from '../../components/section';
import TopBar from '../../components/topbar';
import globalStyles from '../../style';
import withPop from '../../hocomponents/withPop';

type Props = {
  onNormalClick: Function,
  onBestOfOneClick: Function,
  goBack: Function,
}

const Selection: Function= ({
  onNormalClick,
  onBestOfOneClick,
  goBack,
}: Props): React.Component<any> => (
  <View>
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
    </TopBar>
    <Section customStyle={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        onPress={onNormalClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > NORMAL </Button>
      <Button
        onPress={onBestOfOneClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > BEST OF ONE </Button>
    </Section>
  </View>
);

export default compose(
  withHandlers({
    onNormalClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: GameView,
        navigationBarHidden: true,
        passProps: {
          type: 'classic',
        },
      })
    },
    onBestOfOneClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: GameView,
        navigationBarHidden: true,
        passProps: {
          type: 'bestOfOne'
        },
      })
    },
  }),
  withPop(),
)(Selection);

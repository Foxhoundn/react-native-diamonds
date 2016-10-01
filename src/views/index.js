import React from 'react';
import { Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';

import Button from '../containers/button';
import GameView from '../views/game';
import * as app from '../store/app/actions';
import loader from '../hocomponents/loader';
import globalStyles from '../style';

type Props = {
  onContinueClick: Function,
  onNewGameClick: Function,
  appState: Function,
}

const IndexRoute: Function= ({
  onContinueClick,
  onNewGameClick,
  appState: { hasSave },
}: Props): React.Component<any> => {
  return (
    <Image
      style={globalStyles.flexCenter}
      source={{ uri: 'robots' }}
      resizeMode="repeat"
    >
      <StatusBar hidden />
      <Button
        onPress={onContinueClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
        disabled={!hasSave}
      > CONTINUE </Button>
      <Button
        onPress={onNewGameClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > NEW GAME </Button>
      <Button
        onPress={onNewGameClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > HIGHSCORE </Button>
      <Button
        onPress={onNewGameClick}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > OPTIONS </Button>
    </Image>
  );
};

export default compose(
  connect(
    (state: Object) => ({
      gameState: state.game,
      appState: state.app,
      loading: state.app.loadingSounds || state.app.loadingSaves,
    }),
    {
      init: app.init,
      playSound: app.playSound,
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.init();
    },
    componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
        this.props.playSound('music');
      }
    }
  }),
  withHandlers({
    onContinueClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: GameView,
        navigationBarHidden: true,
        passProps: {
          resume: true,
        }
      })
    },
    onNewGameClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: GameView,
        navigationBarHidden: true,
      })
    },
  }),
  loader('loading')
)(IndexRoute);

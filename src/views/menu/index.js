import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';

import Button from '../../containers/button';
import View from '../../components/view';
import GameView from '../../views/game';
import SettingsView from '../../views/settings';
import StatsView from '../../views/stats';
import loader from '../../hocomponents/loader';
import globalStyles from '../../style';
import SelectionView from './selection';

type Props = {
  onContinueClick: Function,
  onNewGameClick: Function,
  onSettingsClick: Function,
  save: boolean,
}

const Menu: Function= ({
  onContinueClick,
  onNewGameClick,
  onSettingsClick,
  onStatsClick,
  save,
}: Props): React.Component<any> => (
  <View>
    <Button
      onPress={onContinueClick}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
      disabled={!save}
    > CONTINUE </Button>
    <Button
      onPress={onNewGameClick}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    > NEW GAME </Button>
    <Button
      onPress={onStatsClick}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    > HIGHSCORE </Button>
    <Button
      onPress={onSettingsClick}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    > OPTIONS </Button>
  </View>
);

export default compose(
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
        component: SelectionView,
        navigationBarHidden: true,
      })
    },
    onSettingsClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: SettingsView,
        navigationBarHidden: true,
      })
    },
    onStatsClick: (props: Object): Function => (): void => {
      props.navigator.push({
        component: StatsView,
        navigationBarHidden: true,
      })
    },
  }),
  loader('loading')
)(Menu);

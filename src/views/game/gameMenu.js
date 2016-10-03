/* @flow */
import React from 'react';
import { Text, View } from 'react-native';

import Overlay from '../../components/overlay';
import Button from '../../containers/button';
import globalStyles from '../../style';
import showIfTrue from '../../hocomponents/showIfTrue';

type Props = {
  show: boolean,
  over: boolean,
  score?: number,
  stats: Object,
  onResumePress: Function,
  onNewGamePress: Function,
  onMenuPress: Function,
}

const GameMenu: Function = ({
  over,
  score,
  stats,
  onResumePress,
  onNewGamePress,
  onMenuPress,
}: Props): React.Element<any> => (
  <Overlay>
    {over && (
      <View>
        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
          GAME OVER
        </Text>
        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
          HIGHSCORE: { stats.highscore }
        </Text>
      </View>
    )}
    {!over && (
      <Button
        onPress={onResumePress}
        wrapperStyle={globalStyles.menuButton}
        textStyle={globalStyles.menuButtonText}
      > RESUME </Button>
    )}
    <Button
      onPress={onNewGamePress}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    > PLAY AGAIN </Button>
    <Button
      onPress={onMenuPress}
      wrapperStyle={globalStyles.menuButton}
      textStyle={globalStyles.menuButtonText}
    > MENU </Button>
  </Overlay>
);

export default showIfTrue((props: Object) => props.show)(GameMenu);

/* @flow */
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Overlay from '../../components/overlay';
import Text from '../../components/text';
import Section from '../../components/section';
import Button from '../../containers/button';
import globalStyles from '../../style';
import styles from './style';
import HighScore from './highscore';
import showIfTrue from '../../hocomponents/showIfTrue';

type Props = {
  show: boolean,
  over: boolean,
  score?: number,
  stats: Object,
  onResumePress: Function,
  onNewGamePress: Function,
  onMenuPress: Function,
  newHighscore: boolean,
  gameType: string,
}

const GameMenu: Function = ({
  over,
  score,
  newHighscore,
  stats,
  onResumePress,
  onNewGamePress,
  onMenuPress,
  gameType,
}: Props): React.Element<any> => (
  <Overlay>
    {over && (
      <View>
        <Text style={styles.overText}>
          GAME OVER
        </Text>
        <HighScore isHighscore={newHighscore} />
        <Section
          customStyle={[
            styles.scoreWrapper,
            newHighscore ? styles.highScoreWrapper : null,
          ]}
        >
          <LinearGradient
            colors={
              newHighscore ?
              ['#19F86D', '#32B82C'] :
              ['#a9a9a9', '#696969']
            }
            style={[
              styles.scoreGradient,
              newHighscore ? styles.highScoreGradient : null,
              globalStyles.flexCenter,
            ]}
          >
            <Text
              style={[
                styles.scoreText,
              ]}
            >
              SCORE : { score }
            </Text>
            <Text
              style={[
                styles.scoreText,
              ]}
            >
              BEST : { stats.highscore[gameType] }
            </Text>
          </LinearGradient>
        </Section>
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

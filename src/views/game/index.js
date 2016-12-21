// @flow
import React from 'react';
import { View } from 'react-native';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import mapProps from 'recompose/mapProps';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as actions from '../../store/game/actions';
import { saveGame } from '../../store/app/actions';
import globalStyles from '../../style';
import GameBoard from './gameBoard';
import GameMenu from './gameMenu';
import Moves from './movesCounter';
import Score from './score';
import Streak from './streak';
import TopBar from '../../components/topbar';
import Text from '../../components/text';
import Section from '../../components/section';
import CustomView from '../../components/view';
import Button from '../../containers/button';
import loader from '../../hocomponents/loader';

type Props = {
  board: Array<Array<Object>>,
  navigator: Object,
  score: number,
  moves: number,
  processing: boolean,
  selected: Object,
  selectField: Function,
  menu: boolean,
  toggleMenu: Function,
  onNewGamePress: Function,
  over: boolean,
  stats: Object,
  onMenuPress: Function,
  onPausePress: Function,
  startGame: Function,
  streak: number,
  newHighscore: boolean,
  gameType: string,
  type: string,
}

const GameView: Function = ({
  board,
  score,
  onMenuPress,
  onPausePress,
  onNewGamePress,
  toggleMenu,
  startGame,
  moves,
  selected,
  selectField,
  processing,
  menu,
  over,
  stats,
  streak,
  newHighscore,
  gameType,
}: Props): React.Element<any> => (
  <CustomView
    style={globalStyles.flex}
    backgroundStyle={globalStyles.flex}
  >
    <View
      style={[
        globalStyles.flex,
        globalStyles.fade,
      ]}
    >
      <TopBar>
        <Moves moves={moves} />
        <Section customStyle={[
          globalStyles.flexCenter,
          {
            flexDirection: 'row',
          }
        ]}>
          <Button
            icon="pause"
            onPress={onPausePress}
            disabled={processing}
          />
        </Section>
        <Score score={score} streak={streak} />
      </TopBar>
      <GameBoard
        board={board}
        selected={selected}
        selectField={selectField}
      />
      <Streak streak={streak} />
      <GameMenu
        show={over || menu}
        over={over}
        newHighscore={newHighscore}
        score={score}
        stats={stats}
        onResumePress={toggleMenu}
        onNewGamePress={onNewGamePress}
        onMenuPress={onMenuPress}
        gameType={gameType}
      />
    </View>
  </CustomView>
);


const gameSelector: Function = (state: Object): Object => state.game;
const appSelector: Function = (state: Object): Object => state.app;
const viewSelector: Function = createSelector(
  [
    gameSelector,
    appSelector,
  ], (game: Object, app: Object) => ({
    board: game.board,
    processing: game.processing,
    score: game.score,
    over: game.over,
    hits: game.hits,
    blanks: game.blanks,
    selected: game.selected,
    moves: game.moves,
    loading: game.loading,
    menu: game.menu,
    stats: app.stats,
    streak: game.streak,
    newHighscore: game.newHighscore,
    gameType: game.gameType,
  })
);

export default compose(
  connect(
    viewSelector,
    {
      startGame: actions.startGame,
      selectField: actions.selectField,
      processHits: actions.processHits,
      processBlanks: actions.processBlanks,
      gameOver: actions.gameOver,
      saveGame,
      toggleMenu: actions.toggleMenu,
      resetStreak: actions.resetStreak,
    }
  ),
  mapProps(({ type, gameType, ...rest }: Props) => ({
    gameType: type || gameType,
    ...rest,
  })),
  lifecycle({
    componentWillMount() {
      const { startGame, resume, gameType } = this.props;

      startGame(resume, gameType);
    },
    componentWillReceiveProps(nextProps) {
      const { processHits, processBlanks, gameOver, resetStreak } = this.props;
      const { board, score, hits, blanks, processing, moves, over, streak, gameType } = nextProps;

      if (hits) {
        processHits(hits, board, streak, score);
      } else if (blanks) {
        processBlanks(board, gameType);
      } else {
        resetStreak();
      }

      if (moves === 0 && !processing && !over) {
        gameOver(gameType);
      }
    }
  }),
  withHandlers({
    onPausePress: (props: Object): Function => (): void => {
      if (!props.processing) {
        props.toggleMenu();
      }
    },
    onMenuPress: (props: Object): Function => (): void => {
      if (!props.over) {
        props.saveGame(props.board, props.moves, props.score, props.gameType);
      }

      props.navigator.popToTop();
    },
    onNewGamePress: ({ startGame, gameType }: Props): Function => (): void => {
      startGame(false, gameType);
    },
  }),
  loader('loading')
)(GameView);

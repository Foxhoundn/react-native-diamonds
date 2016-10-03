/* @flow */
import React from 'react';
import { View } from 'react-native';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as actions from '../../store/game/actions';
import { saveGame } from '../../store/app/actions';
import globalStyles from '../../style';
import GameBoard from './gameBoard';
import GameMenu from './gameMenu';
import Moves from './movesCounter';
import Score from './score';
import TopBar from '../../components/topbar';
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
  startGame: Function,
  over: boolean,
  stats: Object,
}

const GameView: Function = ({
  board,
  score,
  onMenuPress,
  onPausePress,
  toggleMenu,
  startGame,
  moves,
  selected,
  selectField,
  processing,
  menu,
  over,
  stats,
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
        <Score score={score} />
      </TopBar>
      <GameBoard
        board={board}
        selected={selected}
        selectField={selectField}
      />
      <GameMenu
        show={over || menu}
        over={over}
        score={score}
        stats={stats}
        onResumePress={toggleMenu}
        onNewGamePress={startGame}
        onMenuPress={onMenuPress}
      />
    </View>
  </CustomView>
);


const gameSelector: Function = (state: Object): Object => state.game;
const viewSelector: Function = createSelector(
  [
    gameSelector,
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
    stats: game.stats,
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
      resumeGame: actions.resumeGame,
      gameOver: actions.gameOver,
      saveGame,
      toggleMenu: actions.toggleMenu,
    }
  ),
  lifecycle({
    componentWillMount() {
      const { startGame, resume } = this.props;

      startGame(resume);
    },
    componentWillReceiveProps(nextProps) {
      const { processHits, processBlanks, gameOver } = this.props;
      const { board, score, hits, blanks, processing, moves, over } = nextProps;

      if (hits) {
        processHits(hits, board, score);
      } else if (blanks) {
        processBlanks(board);
      }

      if (moves === 0 && !processing && !over) {
        gameOver(score);
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
        props.saveGame(props.board, props.moves, props.score);
      }

      props.navigator.pop();
    },
  }),
  loader('loading')
)(GameView);

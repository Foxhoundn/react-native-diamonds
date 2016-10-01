/* @flow */
import React from 'react';
import { Text, StatusBar, Image } from 'react-native';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withHandlers from 'recompose/withHandlers';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as actions from '../../store/game/actions';
import globalStyles from '../../style';
import GameBoard from './gameBoard';
import Moves from './movesCounter';
import TopBar from '../../components/topbar';
import Section from '../../components/section';
import Overlay from '../../components/overlay';
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
}: Props): React.Element<any> => {
  return (
    <Section style={globalStyles.flex}>
      <StatusBar hidden />
      <Image
        style={globalStyles.flex}
        source={{ uri: 'game' }}
      >
        <TopBar>
          <Section customStyle={globalStyles.flexCenter}>
            <Button
              onPress={onPausePress}
              disabled={processing}
              small
            > Pause </Button>
          </Section>
          <Moves moves={moves} />
          <Section customStyle={globalStyles.flexCenter}>
            <Text style={{ fontSize: 20, color: 'white' }}> { score } </Text>
          </Section>
        </TopBar>
        <GameBoard
          board={board}
          selected={selected}
          selectField={selectField}
        />
      </Image>
      {menu && (
        <Overlay>
          <Button
            onPress={toggleMenu}
            wrapperStyle={globalStyles.menuButton}
            textStyle={globalStyles.menuButtonText}
          > RESUME </Button>
          <Button
            onPress={startGame}
            wrapperStyle={globalStyles.menuButton}
            textStyle={globalStyles.menuButtonText}
          > NEW BOARD </Button>
          <Button
            onPress={onMenuPress}
            wrapperStyle={globalStyles.menuButton}
            textStyle={globalStyles.menuButtonText}
          > MENU </Button>
        </Overlay>
      )}
    </Section>
  )
};

const gameSelector: Function = (state: Object): Object => state.game;
const viewSelector: Function = createSelector(
  [
    gameSelector,
  ], ({
    board,
    ended,
    processing,
    score,
    selected,
    hits,
    blanks,
    moves,
    loading,
    menu
  }) => ({
    board,
    processing,
    score,
    ended,
    hits,
    blanks,
    selected,
    moves,
    loading,
    menu,
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
      saveGame: actions.saveGame,
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
      const { board, score, hits, blanks, processing, moves } = nextProps;

      if (hits) {
        processHits(hits, board, score);
      } else if (blanks) {
        processBlanks(board);
      }

      if (!processing && moves === 0) {
        gameOver();
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
      props.saveGame(props.board, props.moves, props.score);
      props.navigator.pop();
    },
  }),
  loader('loading')
)(GameView);

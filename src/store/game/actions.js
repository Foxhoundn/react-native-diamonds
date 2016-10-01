/* @flow */
import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { ACTIONS, gameDefaults } from '../../constants/game';
import removeHits from '../../helpers/game/removeHits';
import checkForHits from '../../helpers/game/checkForHits';
import calculateScore from '../../helpers/game/calculateScore';
import fillBlanks from '../../helpers/game/fillBlanks';
import getBlanks from '../../helpers/game/getBlanks';
import isNeighbour from '../../helpers/game/isNeighbour';
import moveFields from '../../helpers/game/moveFields';
import createBoard from '../../helpers/game/createBoard';
import * as app from '../app/actions';

const startGameAction: Function = createAction(
  ACTIONS.GAME_STARTGAME,
  async (resume: boolean): Object => {
    if (resume) {
      const { board, score, moves } = JSON.parse(await AsyncStorage.getItem('save'));

      return { board, score, moves }
    }

    await AsyncStorage.removeItem('save');

    return {
      board: createBoard(),
      score: gameDefaults.score,
      moves: gameDefaults.moves,
    }
  }
);

const saveGameAction: Function = createAction(
  ACTIONS.GAME_SAVE,
  async (
    board: Array<Array<string>>,
    moves: number,
    score: number,
    dispatch: Function,
  ): Object => {
    try {
      const save = JSON.stringify({
        board,
        moves,
        score,
      });

      await AsyncStorage.setItem('save', save);

      dispatch(app.init());

      return {
        saved: true,
      }
    } catch (error) {
      return {
        saved: false,
        error,
      }
    }
  }
);

const gameLoading: Function = createAction(
  ACTIONS.GAME_LOADING
);

const selectFieldAction: Function = createAction(
  ACTIONS.GAME_SELECTFIELD,
  (field: Object, selected: Object, dispatch: Function): Object => {
    if (!selected) {
      dispatch(app.playSound('select'));
    }

    return { field }
  }
);

const processHitsAction: Function = createAction(
  ACTIONS.GAME_PROCESSHITS,
  async (
    hits: Array<Object>,
    board: Array<Array<Object>>,
    score: number,
    dispatch: Function
  ) => (
    await new Promise(resolve => {
      setTimeout(() => {
        const newBoard = removeHits(board, hits);
        const blanks = getBlanks(newBoard);
        const newScore = calculateScore(score, hits);

        dispatch(app.playSound('bubble'));
        dispatch(app.playSound('score'));

        resolve({
          board: newBoard,
          score: newScore,
          blanks,
        });
      }, 300)
    })
  )
);

const processBlanks: Function = createAction(
  ACTIONS.GAME_PROCESSBLANKS,
  async (
    board: Array<Array<Object>>,
  ) => (
    await new Promise(resolve => {
      setTimeout(() => {
        const newBoard = fillBlanks(board);
        const hits = checkForHits(newBoard);
        const processing = hits ? true : false;

        resolve({
          board: newBoard,
          hits,
          processing,
        });
      }, 600)
    })
  )
);

const tryMoveAction: Function = createAction(
  ACTIONS.GAME_TRYMOVE,
  (state: Object, dispatch: Function): Object => {
    const { selected, target, board } = state;
    const neighbour: boolean = isNeighbour(selected, target);

    if (neighbour) {
      const newBoard = moveFields(board, selected, target);
      const hits = checkForHits(newBoard);
      const processing = hits ? true : false;

      if (hits) {
        dispatch(app.playSound('selectTarget'));
      } else {
        dispatch(app.playSound('error'));
      }

      return {
        board: newBoard,
        hits,
        processing,
      };
    }

    dispatch(app.playSound('error'));

    return { board, target: null, processing: false, update: false };
  }
);

const gameOverAction: Function = createAction(
  ACTIONS.GAME_OVER,
  (dispatch: Function): void => {
    dispatch(app.playSound('gameover'));
  }
);

const toggleMenu: Function = createAction(
  ACTIONS.GAME_TOGGLEMENU
);

const selectField = (field: Object): Function => (dispatch: Function, getState: Function): void => {
  dispatch(selectFieldAction(field, getState().game.selected, dispatch));

  if (getState().game.target) {
    dispatch(tryMoveAction(getState().game, dispatch));
  }
};

const processHits: Function = (
  hits: Array<Object>,
  board: Array<Array<Object>>,
  score: number
): Function => (dispatch: Function): void => {
  dispatch(processHitsAction(hits, board, score, dispatch));
};

const saveGame: Function = (
  board: Array<Array<Object>>,
  moves: number,
  score: number,
): Function => (dispatch: Function): void => {
  dispatch(saveGameAction(board, moves, score, dispatch));
  dispatch(gameLoading());
};

const startGame: Function = (
  resume: boolean,
): Function => (dispatch: Function): void => {
    dispatch(startGameAction(resume));
    dispatch(gameLoading());
};

const gameOver: Function = (): Function => (dispatch: Function): void => {
  dispatch(gameOverAction(dispatch));
};

export {
  startGame,
  selectField,
  processHits,
  processBlanks,
  gameOver,
  saveGame,
  toggleMenu,
};

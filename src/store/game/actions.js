/* @flow */
import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import { ACTIONS } from '../../constants/game';
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
  async (resume: boolean, gameType: string, state: Function): Object => {
    if (resume) {
      return { ...state().app.save };
    }

    return { board: createBoard(gameType), gameType };
  }
);

const gameLoading: Function = createAction(
  ACTIONS.GAME_LOADING
);

const selectFieldAction: Function = createAction(
  ACTIONS.GAME_SELECTFIELD,
  (field: Object, selected: Object, dispatch: Function): Object => {
    if (!selected) dispatch(app.playSound('select'));

    return { field }
  }
);

const processHitsAction: Function = createAction(
  ACTIONS.GAME_PROCESSHITS,
  async (
    hits: Array<Object>,
    board: Array<Array<Object>>,
    streak: number,
    score: number,
    dispatch: Function
  ) => (
    await new Promise(resolve => {
      setTimeout(() => {
        const newBoard = removeHits(board, hits, dispatch);
        const blanks = getBlanks(newBoard);
        const newScore = calculateScore(score, hits, streak);

        dispatch(app.playSound('bubble'));
        dispatch(app.playSound('score'));

        resolve({
          board: newBoard,
          score: newScore,
          blanks,
        });
      }, 350)
    })
  )
);

const processBlanks: Function = createAction(
  ACTIONS.GAME_PROCESSBLANKS,
  async (
    board: Array<Array<Object>>,
    gameType: string,
  ) => (
    await new Promise(resolve => {
      setTimeout(() => {
        const newBoard = fillBlanks(board, gameType);
        const hits = checkForHits(newBoard);
        const processing = !!hits;

        resolve({
          board: newBoard,
          hits,
          processing,
        });
      }, 650)
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
      const processing = !!hits;

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
  async (type: string, dispatch: Function, state: Function): Object => {
    const { score, bestStreak } = state().game;
    let { stats } = state().app;
    let newHighscore;

    if (score > stats.highscore[type]) {
      const highscore = { ...stats.highscore, ...{ [type]: score } };
      stats = { ...stats, ...{ highscore } };
      newHighscore = true;

      dispatch(app.playSound('highscore'));
    } else {
      newHighscore = false;

      dispatch(app.playSound('gameover'));
    }

    if (bestStreak > stats.streak) {
      stats = { ...stats, ...{ streak: bestStreak } };
    }

    stats = { ...stats, ...{
      gamesPlayed: stats.gamesPlayed + 1,
    }};

    await AsyncStorage.setItem('stats', JSON.stringify(stats));

    return { stats, newHighscore };
  }
);

const toggleMenu: Function = createAction(ACTIONS.GAME_TOGGLEMENU);
const resetStreak: Object = createAction(ACTIONS.GAME_RESETSTREAK);

const selectField = (field: Object): Function => (dispatch: Function, getState: Function): void => {
  dispatch(selectFieldAction(field, getState().game.selected, dispatch));

  if (getState().game.target) {
    dispatch(tryMoveAction(getState().game, dispatch));
  }
};

const processHits: Function = (
  hits: Array<Object>,
  board: Array<Array<Object>>,
  streak: number,
  score: number
): Function => (dispatch: Function): void => {
  dispatch(processHitsAction(hits, board, streak, score, dispatch));
};

const startGame: Function = (
  resume: boolean,
  gameType: string,
): Function => (dispatch: Function, getState: Function): void => {
  dispatch(startGameAction(resume, gameType, getState));
  dispatch(gameLoading());
};

const gameOver: Function = (type: string): Function => (dispatch: Function, getState: Function): void => {
  dispatch(app.removeSavedGame());
  dispatch(gameOverAction(type, dispatch, getState));
};

export {
  startGame,
  selectField,
  processHits,
  processBlanks,
  gameOver,
  toggleMenu,
  resetStreak,
};

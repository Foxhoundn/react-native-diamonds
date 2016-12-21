/* @flow */
import { handleActions } from 'redux-actions';
import { ACTIONS, DEFAULTS } from '../../constants/game';

const initialState: Object = {
  processing: false,
  over: false,
  board: [],
  hits: null,
  blanks: null,
  selected: null,
  target: null,
  update: true,
  loading: false,
  menu: false,
  score: 0,
  moves: null,
  streak: 0,
  bestStreak: 0,
  newHighscore: false,
  gameType: null,
};

export default handleActions({
  [ACTIONS.GAME_STARTGAME]: (state: Object, { payload: { board, score, moves, gameType } }) => (
    { ...initialState, ...{
      board,
      score: score || initialState.score,
      moves: moves || DEFAULTS[gameType],
      gameType,
    }}
  ),
  [ACTIONS.GAME_LOADING]: (state: Object) => {
    return {
      ...state,
      ...{
        loading: true,
      }
    };
  },
  [ACTIONS.GAME_SELECTFIELD]: (state: Object, { payload: { field } }) => {
    const { selected, processing } = state;

    if (processing) return state;

    if (!selected) {
      return {...state, ...{ selected: field } }
    } else if (selected.row === field.row && selected.field === field.field) {
      return {...state, ...{ selected: null } }
    }

    return {...state, ...{ target: field, processing: true } };
  },
  [ACTIONS.GAME_TRYMOVE]: (state: Object, { payload: { board, hits, processing }}) => {
    if (hits) {
      return { ...state, ...{
        board,
        hits,
        processing,
        moves: state.moves - 1,
        selected: null,
        target: null,
        update: true,
      }};
    }

    return { ...state, ...{ processing: false, target: null, streak: 0 } };
  },
  [ACTIONS.GAME_PROCESSHITS]: (state: Object, { payload: { board, score, blanks }}) => {
    const streak = state.streak + 1;
    const bestStreak = streak > state.bestStreak ? streak : state.bestStreak;

    return { ...state, ...{ board, score, blanks, hits: null, streak, bestStreak } };
  },
  [ACTIONS.GAME_PROCESSBLANKS]: (state: Object, { payload: { board, hits, blanks, processing } }) => (
    { ...state, ...{ board, hits, processing, blanks } }
  ),
  [ACTIONS.GAME_TOGGLEMENU]: (state: Object): Object => (
    { ...state, ...{ menu: !state.menu } }
  ),
  [ACTIONS.GAME_RESETSTREAK]: (state: Object): Object => (
    { ...state, ...{ streak: 0 } }
  ),
  [ACTIONS.GAME_OVER]: (state: Object, { payload: { newHighscore } }) => (
    { ...state, ...{ processing: true, over: true, newHighscore } }
  ),
}, initialState);

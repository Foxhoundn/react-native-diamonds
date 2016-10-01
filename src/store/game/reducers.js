/* @flow */
import { handleActions } from 'redux-actions';
import { ACTIONS } from '../../constants/game';

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
};

export default handleActions({
  [ACTIONS.GAME_STARTGAME]: (state: Object, { payload: { board, score, moves }}) => {
    return { ...initialState, ...{ board, score, moves } };
  },
  [ACTIONS.GAME_SAVE]: (state: Object) => {
    return {
      ...initialState,
      ...{
        save: state,
      }
    };
  },
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

    return { ...state, ...{ processing: false, target: null } };
  },
  [ACTIONS.GAME_PROCESSHITS]: (state: Object, { payload: { board, score, blanks }}) => (
    { ...state, ...{ board, score, blanks, hits: null } }
  ),
  [ACTIONS.GAME_PROCESSBLANKS]: (state: Object, { payload: { board, hits, blanks, processing } }) => (
    { ...state, ...{ board, hits, processing, blanks } }
  ),
  [ACTIONS.GAME_TOGGLEMENU]: (state: Object) => (
    { ...state, ...{ menu: !state.menu } }
  ),
  [ACTIONS.GAME_OVER]: (state: Object) => (
    { ...state, ...{ processing: true, over: true } }
  ),
}, initialState);

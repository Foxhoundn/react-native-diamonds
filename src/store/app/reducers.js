/* @flow */
import { handleActions } from 'redux-actions';
import { ACTIONS } from '../../constants/app';
import { ACTIONS as GAME_ACTIONS } from '../../constants/game';

const initialState: Object = {
  settings: {
    sfx: true,
    music: true,
    vibrations: true,
  },
  sounds: null,
  loadingSaves: true,
  loadingSounds: true,
  loadingStats: true,
  save: false,
  error: false,
  stats: {
    highscore: {
      classic: 0,
      bestOfOne: 0,
    },
    gamesPlayed: 0,
    streak: 0,
  },
};

export default handleActions({
  [ACTIONS.APP_INITIALIZING]: (state: Object) => (
    { ...state, ...{ loadingSaves: true, loadingSounds: true, loadingStats: true } }
  ),
  [ACTIONS.APP_INIT]: (state: Object, { payload: { save, settings, stats } }) => (
    { ...state, ...{
      loadingSaves: false,
      loadingStats: false,
      save: save || state.save,
      settings: settings || state.settings,
      stats: stats || state.stats,
    }}
  ),
  [ACTIONS.APP_LOADEDSOUNDS]: (state: Object, { payload: { sounds } }) => (
    { ...state, ...{ sounds, loadingSounds: false } }
  ),
  [ACTIONS.APP_CHANGESETTINGS]: (state: Object, { payload: { settings } }) => (
    { ...state, ...{ settings } }
  ),
  [ACTIONS.APP_SAVING]: (state: Object) => (
    { ...state, ...{ loadingSaves: true } }
  ),
  [ACTIONS.APP_SAVEGAME]: (state: Object, { payload }) => (
    { ...state, ...payload }
  ),
  [ACTIONS.APP_REMOVESAVE]: (state: Object, { payload }) => (
    { ...state, ...payload }
  ),
  [ACTIONS.APP_LOADSTATS]: (state: Object, { payload: { stats } }) => (
    { ...state, ...{ stats } }
  ),
  [GAME_ACTIONS.GAME_OVER]: (state: Object, { payload: { stats } }) => (
    { ...state, ...{ stats } }
  ),
}, initialState);

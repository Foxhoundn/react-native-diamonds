/* @flow */
import { handleActions } from 'redux-actions';
import { ACTIONS } from '../../constants/app';

const initialState: Object = {
  settings: {
    sfx: true,
    music: true,
    vibrations: true,
  },
  sounds: null,
  loadingSaves: true,
  loadingSounds: true,
  save: false,
  error: false,
};

export default handleActions({
  [ACTIONS.APP_INITIALIZING]: (state: Object) => (
    { ...state, ...{ loadingSaves: true, loadingSounds: true } }
  ),
  [ACTIONS.APP_INIT]: (state: Object, { payload: { save, settings } }) => (
    { ...state, ...{
      loadingSaves: false,
      save: save || state.save,
      settings: settings || state.settings,
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
}, initialState);

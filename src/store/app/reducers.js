/* @flow */
import { handleActions } from 'redux-actions';
import { ACTIONS } from '../../constants/app';

const initialState: Object = {
  soundsOn: true,
  musicOn: true,
  sounds: null,
  loadingSaves: false,
  loadingSounds: false,
  hasSave: null,
  vibration: true,
};

export default handleActions({
  [ACTIONS.APP_INITIALIZING]: (state: Object) => (
    { ...state, ...{ loadingSaves: true, loadingSounds: true } }
  ),
  [ACTIONS.APP_INIT]: (state: Object, { payload: { hasSave } }) => (
    { ...state, ...{ loadingSaves: false, hasSave } }
  ),
  [ACTIONS.APP_LOADEDSOUNDS]: (state: Object, { payload: { sounds }}) => {
    return { ...state, ...{ sounds, loadingSounds: false } };
  },
}, initialState);

import { createAction } from 'redux-actions';
import { AsyncStorage, Vibration } from 'react-native';
import Sound from 'react-native-sound'

import { ACTIONS, SOUNDS } from '../../constants/app';

const initAction = createAction(
  ACTIONS.APP_INIT,
  async (): Object => {
    // await AsyncStorage.removeItem('stats')
    const save = JSON.parse(await AsyncStorage.getItem('save'));
    const settings = JSON.parse(await AsyncStorage.getItem('settings'));
    const stats = JSON.parse(await AsyncStorage.getItem('stats'));

    return { save, settings, stats };
  }
);

const initOptimistic = createAction(ACTIONS.APP_INITIALIZING);

const init: Function = (): Function => (dispatch: Function): void => {
  dispatch(initAction());
  dispatch(loadSoundsAction());
  dispatch(initOptimistic());
};

const playSoundAction: Function = createAction(
  ACTIONS.APP_PLAYSOUND,
  (name: string, state: Function): void => {
    const { app: { sounds, settings } } = state();
    const sound = SOUNDS[name];
    const item = sounds.find((s: Object): boolean => s.name === name);

    if ((sound.type === 'sfx' && settings.sfx) || (sound.type === 'music' && settings.music)) {
      item.getCurrentTime((seconds: number, isPlaying: boolean) => {
        if (!isPlaying) item.play();
      });
    }
  }
);

const vibrateAction: Function = createAction(
  ACTIONS.APP_VIBRATE,
  (state: Function): void => {
    const { app: { settings } } = state();

    if (settings.vibrations) {
      Vibration.vibrate();
    }
  }
)

const stopMusicAction: Function = createAction(
  ACTIONS.APP_STOPMUSIC,
  (sounds: Array<Object>): void => {
    sounds.forEach((sound: Object): boolean => {
      if (sound.type === 'music') {
        sound.stop();
      }
    });
  }
);

const saveGameAction: Function = createAction(
  ACTIONS.APP_SAVEGAME,
  async (
    board: Array<Array<string>>,
    moves: number,
    score: number,
    gameType: string,
  ): Object => {
    const save = { board, moves, score, gameType };

    await AsyncStorage.setItem('save', JSON.stringify(save));

    return { save, loadingSaves: false }
  }
);

const gameSaving: Function = createAction(
  ACTIONS.APP_SAVING
);

const loadSoundsAction: Function = createAction(
  ACTIONS.APP_LOADEDSOUNDS,
  async (): Object => {
    const promises = Object.keys(SOUNDS).map((key: string): Promise<*> => (
      new Promise(resolve => {
        const sound = new Sound(`${SOUNDS[key].file}`, Sound.MAIN_BUNDLE, () => {
          if (SOUNDS[key].loop) sound.setNumberOfLoops(-1);

          resolve(Object.assign(sound, { name: key, type: SOUNDS[key].type }));
        });
      })
    ));

    const soundObj = await Promise.all(promises);

    return { sounds: soundObj }
  }
);

const changeSettingAction: Function = createAction(
  ACTIONS.APP_CHANGESETTINGS,
  (setting: string, value: boolean, state: Object): Object => {
    const settings: string = { ...state.settings, ...{ [setting]: value } };

    AsyncStorage.setItem('settings', JSON.stringify(settings));

    return { settings };
  }
);

const removeSavedGame: Function = createAction(
  ACTIONS.APP_REMOVESAVE,
  () => {
    AsyncStorage.removeItem('save');

    return { save: false };
  }
);

const playSound: Function = (sound: string): Function => (dispatch: Function, getState: Function): void => {
  dispatch(playSoundAction(sound, getState));
};

const vibrate: Function = (): Function => (dispatch: Function, getState: Function): void => {
  dispatch(vibrateAction(getState));
};

const saveGame: Function = (
  board: Array<Array<Object>>,
  moves: number,
  score: number,
  gameType: string,
): Function => (dispatch: Function): void => {
  dispatch(saveGameAction(board, moves, score, gameType));
  dispatch(gameSaving());
};

const changeSettings: Function = (
  setting: string,
  value: boolean
): Function => (dispatch: Function, getState: Function): void => {
  dispatch(changeSettingAction(setting, value, getState().app));

  if (setting === 'music' && !value) {
    dispatch(stopMusicAction(getState().app.sounds));
  }
};

export {
  init,
  playSound,
  changeSettings,
  saveGame,
  removeSavedGame,
  vibrate,
}

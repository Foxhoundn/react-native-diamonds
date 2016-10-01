import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import Sound from 'react-native-sound'

import { ACTIONS, SOUNDS } from '../../constants/app';

const initAction = createAction(
  ACTIONS.APP_INIT,
  async (): Object => {
    const save = await AsyncStorage.getItem('save');
    const hasSave = save ? true : false;

    return { hasSave };
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
  (sound: string, state: Function): void => {
    const { app: { sounds, soundsOn } } = state();

    console.log(sounds);

    if (soundsOn) {
      sounds.find((s: Object): boolean => s.name === sound).play();
    }
  }
);

const loadSoundsAction: Function = createAction(
  ACTIONS.APP_LOADEDSOUNDS,
  async (): Object => {
    const promises = Object.keys(SOUNDS).map((key: string): Promise<*> => (
      new Promise(resolve => {
        const sound = new Sound(`${SOUNDS[key].file}`, Sound.MAIN_BUNDLE, () => {
          if (SOUNDS[key].loop) sound.setNumberOfLoops(-1);

          resolve(Object.assign(sound, { name: key }));
        });
      })
    ));

    const soundObj = await Promise.all(promises);

    return { sounds: soundObj }
  }
);

const playSound: Function = (sound: string): Function => (dispatch: Function, getState: Function): void => {
  dispatch(playSoundAction(sound, getState));
};

export {
  init,
  playSound,
}

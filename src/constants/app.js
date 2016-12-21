export const ACTIONS = {
  APP_INIT: 'APP_INIT',
  APP_INITIALIZING: 'APP_INITIALIZING',
  APP_LOADEDSOUNDS: 'APP_LOADEDSOUNDS',
  APP_LOADINGSOUNDS: 'APP_LOADINGSOUNDS',
  APP_PLAYSOUND: 'APP_PLAYSOUND',
  APP_CHANGESETTINGS: 'APP_CHANGESETTINGS',
  APP_STOPMUSIC: 'APP_STOPMUSIC',
  APP_SAVEGAME: 'APP_SAVEGAME',
  APP_SAVING: 'APP_SAVING',
  APP_REMOVESAVE: 'APP_REMOVESAVE',
  APP_LOADSTATS: 'APP_LOADSTATS',
  APP_VIBRATE: 'APP_VIBRATE',
};

export const SOUNDS = {
  button: {
    file: 'button.wav',
    type: 'sfx',
  },
  bubble: {
    file: 'bubble.wav',
    type: 'sfx',
  },
  gameover: {
    file: 'gameover.wav',
    type: 'sfx',
  },
  score: {
    file: 'score.wav',
    type: 'sfx',
  },
  error: {
    file: 'error.wav',
    type: 'sfx',
  },
  select: {
    file: 'select.wav',
    type: 'sfx',
  },
  selectTarget: {
    file: 'selectTarget.wav',
    type: 'sfx',
  },
  target: {
    file: 'target.wav',
    type: 'sfx',
  },
  hit: {
    file: 'hit.wav',
    type: 'sfx',
  },
  highscore: {
    file: 'highscore.mp3',
    type: 'sfx',
  },
  music: {
    file: 'music.mp3',
    type: 'music',
    loop: true,
  },
};

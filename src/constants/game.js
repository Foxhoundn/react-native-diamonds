const ACTIONS = {
  GAME_STARTGAME: 'GAME_STARTGAME',
  GAME_SELECTFIELD: 'GAME_SELECTFIELD',
  GAME_PROCESSHITS: 'GAME_PROCESSHITS',
  GAME_TRYMOVE: 'GAME_TRYMOVE',
  GAME_PROCESSBLANKS: 'GAME_FILLBLANKS',
  GAME_OVER: 'GAME_OVER',
  GAME_LOADING: 'GAME_SAVING',
  GAME_TOGGLEMENU: 'GAME_TOGGLEMENU',
  GAME_RESETSTREAK: 'GAME_RESETSTREAK',
};

const COLOURS = {
  classic: [
    'light-green',
    'yellow',
    'orange',
    'red',
    'purple',
    'pink',
  ],
  bestOfOne: [
    'black',
    'brown',
    'blue',
    'green',
  ],
};

const DEFAULTS = {
  classic: 20,
  bestOfOne: 1,
};

export {
  ACTIONS,
  COLOURS,
  DEFAULTS,
}

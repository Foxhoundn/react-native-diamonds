const ACTIONS = {
  GAME_STARTGAME: 'GAME_STARTGAME',
  GAME_SELECTFIELD: 'GAME_SELECTFIELD',
  GAME_PROCESSHITS: 'GAME_PROCESSHITS',
  GAME_TRYMOVE: 'GAME_TRYMOVE',
  GAME_PROCESSBLANKS: 'GAME_FILLBLANKS',
  GAME_OVER: 'GAME_OVER',
  GAME_SAVE: 'GAME_SAVE',
  GAME_LOADING: 'GAME_SAVING',
  GAME_SAVETIME: 'GAME_SAVETIME',
  GAME_TOGGLEMENU: 'GAME_TOGGLEMENU',
};

const COLOURS = [
  'green',
  'blue',
  'red',
  'yellow',
  'purple',
  'orange',
];

const gameDefaults = {
  score: 0,
  moves: 3,
};

export {
  ACTIONS,
  COLOURS,
  gameDefaults,
}

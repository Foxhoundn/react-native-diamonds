import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import game from './game/reducers';
import app from './app/reducers';

export default createStore(
  combineReducers({
    game,
    app,
  }),
  applyMiddleware(
    thunk,
    promise
  )
);

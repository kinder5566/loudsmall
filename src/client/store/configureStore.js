import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import Immutable from 'immutable';
import promise from "redux-promise-middleware"
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from '~/src/client/reducers';
import { history } from '~/src/client/constants/singleton';

const initialState = Immutable.Map();
const middleware = applyMiddleware(promise(), routerMiddleware(history), thunk, logger);

export default createStore(
  rootReducer,
  initialState,
  middleware
);

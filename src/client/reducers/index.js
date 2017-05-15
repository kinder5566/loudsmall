import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer';
import msgReducer from './msgReducer';

const rootReducer = combineReducers({
  authReducer,
  msgReducer,
  routerReducer
});

export default rootReducer;

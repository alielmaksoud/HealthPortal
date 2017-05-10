import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import adminReducer from './admin_reducer';
import userReducer from './user_reducer';
import graphReducer from './graph_reducer';
import { routerReducer } from 'react-router-redux'; 

const rootReducer = combineReducers({
  authReducer,
  adminReducer,
  userReducer,
  graphReducer,
  routing: routerReducer
});

export default rootReducer;

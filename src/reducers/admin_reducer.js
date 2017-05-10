import {
  GET_ALL_TABLES,
  GET_TABLE,
  GET_DOCTOR,
  TOGGLE_MODAL
} from '../actions/types';

const initial_state = {
  data: [],
  modal: false, 
  column_name: []
};

export default function(state = initial_state, action) {
  switch(action.type) {
    case GET_ALL_TABLES:
      return { ...state, error: '', tables: action.payload };
    case GET_TABLE:
      return { ...state, error: '', table: action.payload };
    case GET_DOCTOR:
      return { ...state, error: '', doctor: action.payload};
    case TOGGLE_MODAL:
      return { ...state, error: '', modal: action.payload};
    default:
      return state;
  }
}
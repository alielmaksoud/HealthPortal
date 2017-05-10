import {
  GET_DOCTOR,
  GET_PATIENT
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_DOCTOR:
      return { ...state, error: '', doctor: action.payload};
    case GET_PATIENT:
      return { ...state, error: '', patient: action.payload};
    default:
      return state;
  }
}
import {
  GET_ALL_TABLES,
  GET_ALL_DOCTORS,
  GET_ALL_PATIENTS,
  GET_ALL_PATIENTS_DOCTORS,
  GET_TEMPERATURE,
  GET_HEART_RATES,
  GET_DOCTOR,
  TOGGLE_MODAL
} from '../actions/types';

export default function(state = {modal: false}, action) {
  switch(action.type) {
    case GET_ALL_DOCTORS:
      return { ...state, error: '', doctors: action.payload };
    case GET_ALL_TABLES:
      return { ...state, error: '', tables: action.payload };
    case GET_ALL_PATIENTS:
      return { ...state, error: '', patients: action.payload };
    case GET_ALL_PATIENTS_DOCTORS:
      return { ...state, error: '', patientsDoctors: action.payload };
    case GET_HEART_RATES:
      return { ...state, error: '', heartRate: action.payload };
    case GET_TEMPERATURE:
      return { ...state, error: '', temperature: action.payload };
    case GET_DOCTOR:
      return { ...state, error: '', doctor: action.payload};
    case TOGGLE_MODAL:
      return { ...state, error: '', modal: action.payload};
    default:
      return state;
  }
}
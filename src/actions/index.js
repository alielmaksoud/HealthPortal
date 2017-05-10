import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_ERROR,
  GET_ALL_DOCTORS,
  GET_ALL_PATIENTS,
  GET_ALL_PATIENTS_DOCTORS,
  GET_HEART_RATES,
  GET_TEMPERATURE,
  GET_ALL_TABLES,
  GET_DOCTOR,
  GET_PATIENT,
  SEE_AVERAGE,
  TOGGLE_MODAL
} from './types';

//fake doc id for testing 
const docIds = [1,2,3,4,5,6,7,8];

const ROOT_URL = 'http://localhost:3000/api/';

export function loginUser({ docId }) {
  const url = `${ROOT_URL}doctors/${docId}`;
  return function(dispatch) {
    axios.get(url)
      .then(
        response => {
          localStorage.setItem('user', JSON.stringify(response.data));
          browserHistory.push(`/dashboard/${docId}`);
          return dispatch({
            type: GET_DOCTOR,
            payload: response.data
          })}
      )
      .catch(e => {
        return dispatch(authError(e.toString()));
      })
  }
}

export function getAllTables() {
  const url = `${ROOT_URL}tables`;

  return (dispatch) => {
    axios.get(url)
      .then(response => dispatch({
        type: GET_ALL_TABLES,
        payload: response.data
      }))
  }
}

export function getAllDoctors() {
  const url = `${ROOT_URL}doctors`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_ALL_DOCTORS,
      payload: response.data
    }))
  }

}

export function getAllPatients() {
  const url = `${ROOT_URL}patients`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_ALL_PATIENTS,
      payload: response.data
    }))
  }
}

export function getPatientsDoctors() {
  const url = `${ROOT_URL}patientsDoctors`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_ALL_PATIENTS_DOCTORS,
      payload: response.data
    }))
  }
}

export function getHeartRates() {
  const url = `${ROOT_URL}heartRates`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_HEART_RATES,
      payload: response.data
    }))
  }
}

export function getTemperature() {
  const url = `${ROOT_URL}temperature`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_TEMPERATURE,
      payload: response.data
    }))
  }
}

export function getPatient(patient_id) {
  const url = `${ROOT_URL}patients/${patient_id}`;

  return (dispatch) => {
    axios.get(url)
    .then(response => dispatch({
      type: GET_PATIENT,
      payload: response.data
    }))
  }
}

export function seeAverageAction(current_state) {
  return {
    type: SEE_AVERAGE,
    payload: current_state
  }
}

export function toggleModal(current_state, action) {
  return {
    type: TOGGLE_MODAL,
    payload: [!current_state, action]
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
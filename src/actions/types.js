/*
	AUTH ACTIONS
 */

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

/*
	DASHBOARD ACTIONS
 */
export const GET_DOCTOR = 'GET_DOCTOR';
export const GET_PATIENT = 'GET_PATIENT';
export const SEE_AVERAGE = 'SEE_AVERAGE';

/*
	ADMIN ACTIONS
 */

export const GET_ALL_TABLES = 'GET_ALL_TABLES';
// In our case, doctors and patients are in a small and limited number 
export const GET_ALL_DOCTORS = 'GET_ALL_DOCTORS';
export const GET_ALL_PATIENTS = 'GET_ALL_PATIENTS';
export const GET_ALL_PATIENTS_DOCTORS = 'GET_ALL_PATIENTS_DOCTORS';

// In our case, there are 1000 reading for both heart rates and temperature.
// We get 25 row each time making the request
export const GET_HEART_RATES = 'GET_HEART_RATES';
export const GET_TEMPERATURE = 'GET_TEMPERATURE';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
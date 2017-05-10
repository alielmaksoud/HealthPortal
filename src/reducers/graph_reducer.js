import {
	SEE_AVERAGE
} from '../actions/types';

export default function(state = {seeAverage: false}, action) {
  switch(action.type) {
    case SEE_AVERAGE:
      return { ...state, seeAverage: action.payload };
    default:
      return state;
  }
}
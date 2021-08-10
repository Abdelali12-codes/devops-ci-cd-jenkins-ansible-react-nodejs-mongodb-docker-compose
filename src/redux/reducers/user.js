import * as types from '../actionTypes';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  user: null,
  loading: false
});

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_USER: {
      return state.set('user', action.data);
    }
    case types.SET_USER_LOADING: {
      return state.set('loading', action.data);
    }
    default:
      return state;
  }
}

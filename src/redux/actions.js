import * as types from './actionTypes';
import axios from 'axios';
import Immutable from 'immutable';

export const setUser = user => ({
  type: types.SET_USER,
  data: user
});

export const setUserLoading = loading => ({
  type: types.SET_USER_LOADING,
  data: loading
});

export const fetchUser = () => dispatch => {
  dispatch(setUserLoading(true));
  axios.post('/api/auth/current')
    .then(res => {
      const user = res.data;
      if (user) {
        dispatch(setUser(Immutable.fromJS(user)));
      }
      dispatch(setUserLoading(false));
    });
};

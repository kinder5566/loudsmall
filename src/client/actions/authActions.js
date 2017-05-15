import { createAction } from 'redux-actions';
import Cookies from 'universal-cookie';
import axios from "axios";

import { AUTH } from '~/src/client/constants/actionTypes';
import { API_PATH } from '~/util/config';
import { history } from '~/src/client/constants/singleton';

const cookies = new Cookies();

const cookieReq = createAction(AUTH.COOKIE);
const cookieSuccess = createAction(AUTH.COOKIE_SUCCESS);
const cookieFail = createAction(AUTH.COOKIE_FAIL);
export function checkCookie(cb) {
  return dispatch => {
    dispatch(cookieReq());
    const token = cookies.get('loudsmallToken');
    var data = {
      token: token
    };
    axios.post(API_PATH + "api/v1/auth_token/", data)
    .then((res) => {
      if(res.data.code === 0) {
        dispatch(cookieSuccess(res.data.data));
        cb(null, res.data.data);
      }
      else {
        dispatch(cookieFail(res.data.code));
        cb('no cookie', null);
      }
    })
    .catch((err) => {
      dispatch(cookieFail(err));
      cb('cookie error', null);
    });
  };
}

const signInReq = createAction(AUTH.SIGNIN);
const signInSuccess = createAction(AUTH.SIGNIN_SUCCESS);
const signInFail = createAction(AUTH.SIGNIN_FAIL);
export function signIn(user) {
  return dispatch => {
    dispatch(signInReq());
    var data = {
      u_name: user.u_name
    };
    axios.post(API_PATH + "api/v1/sign_in/", data)
    .then((res) => {
      if(res.data.code === 0) {
        dispatch(signInSuccess(res.data.data));
        cookies.set('loudsmallToken', res.data.data.token);
        history.push('/loud');
      }
      else {
        dispatch(signInFail(res.data.code));
      }
    })
    .catch((err) => {
      dispatch(signInFail(err));
    });
  };
}

export function signInGoogle(googleUser) {
  return dispatch => {
    dispatch(signInReq());
    var data = {
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    };
    axios.post(API_PATH + "api/v1/sign_in_google/", data)
    .then((res) => {
      if(res.data.code === 0) {
        dispatch(signInSuccess(res.data.data));
        cookies.set('loudsmallToken', res.data.data.token);
        history.push('/loud');
      }
      else {
        dispatch(signInFail(res.data.code));
      }
    })
    .catch((err) => {
      dispatch(signInFail(err));
    });
  };
}

const signOutReq = createAction(AUTH.SIGNOUT);
const signOutSuccess = createAction(AUTH.SIGNOUT_SUCCESS);
const signOutFail = createAction(AUTH.SIGNOUT_FAIL);
export function signOut(user) {
  return dispatch => {
    dispatch(signOutReq());
    var data = {
      u_name: user.u_name,
      token: user.token
    };
    axios.post(API_PATH + "api/v1/sign_out/", data)
    .then((res) => {
      if(res.data.code === 0) {
        cookies.remove('loudsmallToken');
        if(user.type === 'google') {
          window.gapi.auth2.getAuthInstance().signOut()
          .then(() => {
            dispatch(signOutSuccess());
            history.push('/');
          });
        }
        else {
          dispatch(signOutSuccess());
          history.push('/');
        }
      }
      else {
        dispatch(signInFail(res.data.code));
      }
    })
    .catch((err) => {
      dispatch(signInFail(err));
    });
  };
}
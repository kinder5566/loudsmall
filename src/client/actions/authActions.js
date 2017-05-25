import { createAction } from 'redux-actions';
import Cookies from 'universal-cookie';
import axios from "axios";

import { AUTH } from '~/src/client/constants/actionTypes';
import { API_PATH } from '~/src/util/config';

const cookies = new Cookies();

const cookieReq = createAction(AUTH.COOKIE);
const cookieSuccess = createAction(AUTH.COOKIE_SUCCESS);
const cookieFail = createAction(AUTH.COOKIE_FAIL);
export function checkCookie() {
  return dispatch => {
    dispatch(cookieReq());
    const token = cookies.get('loudsmallToken');
    var data = {
      token: token
    };
    return new Promise(function(fulfill, reject) {
      axios.post(API_PATH + "api/v1/auth_token/", data)
      .then((res) => {
        if(res.data.code === 0) {
          dispatch(cookieSuccess(res.data.data));
          fulfill(res.data.data);
        }
        else {
          dispatch(cookieFail(res.data.code));
          reject('no cookie');
        }
      })
      .catch((err) => {
        dispatch(cookieFail(err));
        reject('cookie error');
      });
    });
  };
}

const signInReq = createAction(AUTH.SIGNIN);
const signInSuccess = createAction(AUTH.SIGNIN_SUCCESS);
const signInFail = createAction(AUTH.SIGNIN_FAIL);
export function signIn(user) {
  return dispatch => {
    dispatch(signInReq());
    let data = {
      u_name: user.u_name
    };
    return new Promise(function(fulfill, reject) {
      axios.post(API_PATH + "api/v1/sign_in/", data)
      .then((res) => {
        if(res.data.code === 0) {
          dispatch(signInSuccess(res.data.data));
          cookies.set('loudsmallToken', res.data.data.token);
          fulfill(res.data.data.token);
        }
        else {
          dispatch(signInFail(res.data.code));
          reject(res.data.code);
        }
      })
      .catch((err) => {
        dispatch(signInFail(err));
        reject(err);
      });
    }); 
  };
}

export function signInGoogle(googleUser) {
  return dispatch => {
    dispatch(signInReq());
    let data = {
      email: googleUser.getBasicProfile().getEmail(),
      token: googleUser.getAuthResponse().id_token
    };
    return new Promise(function(fulfill, reject) {
      axios.post(API_PATH + "api/v1/sign_in_google/", data)
      .then((res) => {
        if(res.data.code === 0) {
          dispatch(signInSuccess(res.data.data));
          cookies.set('loudsmallToken', res.data.data.token);
          fulfill(res.data.data.token);
        }
        else {
          dispatch(signInFail(res.data.code));
          reject(res.data.code);
        }
      })
      .catch((err) => {
        dispatch(signInFail(err));
        reject(err);
      });
    }); 
  };
}

const signOutReq = createAction(AUTH.SIGNOUT);
const signOutSuccess = createAction(AUTH.SIGNOUT_SUCCESS);
const signOutFail = createAction(AUTH.SIGNOUT_FAIL);
export function signOut(user) {
  return dispatch => {
    dispatch(signOutReq());
    let data = {
      u_name: user.u_name,
      token: user.token
    };
    return new Promise(function(fulfill, reject) {
      axios.post(API_PATH + "api/v1/sign_out/", data)
      .then((res) => {
        if(res.data.code === 0) {
          cookies.remove('loudsmallToken');
          if(user.type === 'google') {
            window.gapi.auth2.getAuthInstance().signOut()
            .then(() => {
              dispatch(signOutSuccess());
              fulfill();
            });
          }
          else {
            dispatch(signOutSuccess());
            fulfill();
          }
        }
        else {
          dispatch(signInFail(res.data.code));
          reject(res.data.code);
        }
      })
      .catch((err) => {
        dispatch(signInFail(err));
        reject(err);
      });
    });
  };
}
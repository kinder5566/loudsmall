import { createAction } from 'redux-actions';
import axios from "axios";
import { AUTH, SOCKET } from '~/src/client/constants/actionTypes';
import { API_PATH } from '~/util/config';
import { history, socket } from '~/src/client/constants/singleton';

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
        history.push('/loud');
        dispatch(connectToServer(res.data.data));
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
        history.push('/loud');
        dispatch(connectToServer(res.data.data));
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

const disconnect = createAction(SOCKET.DISCONNECTED);
const connecting = createAction(SOCKET.CONNECTING);
const connected = createAction(SOCKET.CONNECTED);
function connectToServer(user) {
  return dispatch => {
    dispatch(connecting());
    socket.connect(dispatch, function(err, client) {
      if(err) {
        dispatch(disconnect(err));
        return;
      }
      let data = {
        u_name: user.u_name,
        token: user.token
      };
      client.emit('auth', data);
      dispatch(connected());
    });
  };
}
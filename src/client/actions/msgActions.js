import { createAction } from 'redux-actions';
import { SOCKET, MSG } from '~/src/client/constants/actionTypes';
import { socket } from '~/src/client/constants/singleton';
import uuid from 'uuid';

const disconnect = createAction(SOCKET.DISCONNECTED);
const connecting = createAction(SOCKET.CONNECTING);
const connected = createAction(SOCKET.CONNECTED);
export function connectToServer() {
  return (dispatch, getState) => {
    dispatch(connecting());
    let user = getState().getIn(['authReducer', 'user']).toJS();
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

const sendMsgAction = createAction(MSG.SEND_MSG);
const addMsgAction = createAction(MSG.ADD_MSG);
const receiveMsgAction = createAction(MSG.RECEIVE_MSG);

export function sendTextMsg(msg) {
  return (dispatch, getState) => {
    dispatch(sendMsgAction());
    let user = getState().getIn(['authReducer', 'user']).toJS();
    let data = {
      id: uuid.v4(),
      msg: msg,
      type: 'text'
    };
    socket.client().emit('text_msg', data);
    data.u_name = user.u_name;
    dispatch(addMsgAction(data));
  };
}

export function sendMapMsg(pos) {
  return (dispatch, getState) => {
    dispatch(sendMsgAction());
    let user = getState().getIn(['authReducer', 'user']).toJS();
    let data = {
      id: uuid.v4(),
      msg: pos,
      type: 'map'
    };
    socket.client().emit('text_msg', data);
    data.u_name = user.u_name;
    dispatch(addMsgAction(data));
  };
}

export function receiveMsg(msg) {
  return (dispatch, getState) => {
    let user = getState().getIn(['authReducer', 'user']).toJS();
    if(user.u_name === msg.u_name) {
      msg.self = true;
    }
    dispatch(receiveMsgAction(msg));
  };
}
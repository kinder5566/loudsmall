import {
  sendMsg,
  addMsg,
  receiveMsg
} from '~/src/client/actions/msgActions';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

import io from 'socket.io-client';

export const socket = function() {
  var connection = null;
  var connect = function(dispatch, callback) {
    if(!connection) {
      connection = io();
      connection.on('text_msg', function(data){
        dispatch(receiveMsg(data));
      });
    }
    callback(null, connection);
  }
  var client = function() {
    return connection;
  }
  return {
    connect: connect,
    client: client
  };
}();
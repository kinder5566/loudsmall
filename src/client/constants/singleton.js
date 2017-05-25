import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

import io from 'socket.io-client';
import { receiveMsg } from '~/src/client/actions/msgActions';
export const socket = function() {
  let connection = null;
  let connect = function(dispatch, callback) {
    if(!connection) {
      connection = io();
      connection.on('text_msg', function(data){
        dispatch(receiveMsg(data));
      });
    }
    callback(null, connection);
  }
  let client = function() {
    return connection;
  }
  let disconnect = function() {
    connection.disconnect();
    connection = null;
  }
  return {
    connect: connect,
    disconnect: disconnect,
    client: client
  };
}();
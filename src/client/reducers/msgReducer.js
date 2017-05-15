import Immutable from 'immutable';
import { MSG } from '~/src/client/constants/actionTypes';

const msgState = Immutable.fromJS({
  msgs: []
});

export default function msgReducers(state = msgState, action) {
  switch (action.type) {
  case MSG.ADD_MSG: {
    let data = Immutable.fromJS({
      id: action.payload.id,
      self: true,
      send: false,
      type: action.payload.type,
      u_name: action.payload.u_name,
      msg: action.payload.msg,
      time: Date.now()
    });
    let newState = state.set('msgs', state.get('msgs').push(data))
    return newState;
  }
  case MSG.RECEIVE_MSG: {
    if(!action.payload.self) {
      let data = Immutable.fromJS({
        id: action.payload.id,
        self: false,
        send: true,
        type: action.payload.type,
        u_name: action.payload.u_name,
        msg: action.payload.msg,
        time: Date.now()
      });
      return state.set('msgs', state.get('msgs').push(data));
    }
    else {
      let list = state.get('msgs');
      list = list.update(
        list.findIndex(function(item) {
          return item.id === action.payload.id; 
        }), function(item) {
          return item.set('send', true);
        }
      );
      return state.set('msgs', list);
    }
  }
  default:
    return state;
  }
}

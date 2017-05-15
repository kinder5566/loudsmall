import Immutable from 'immutable';
import { AUTH } from '~/src/client/constants/actionTypes';

const authState = Immutable.fromJS({
  signingIn: false,
  user: {
    u_name: null,
    token: null,
    type: null
  }
});

export default function authReducers(state = authState, action) {
  switch (action.type) {
  case AUTH.COOKIE: {
    return state;
  }
  case AUTH.COOKIE_SUCCESS: {
    console.log(action.payload);
    return state.merge({'user': {
      'u_name': action.payload.u_name,
      'token': action.payload.token,
      'type': action.payload.type
    }});
  }
  case AUTH.COOKIE_FAIL: {
    return state;
  }

  case AUTH.SIGNIN: {
    return state.set({'signingIn': true});
  }
  case AUTH.SIGNIN_SUCCESS: {
    return state.merge({'signingIn': false, 'user': {
      'u_name': action.payload.u_name,
      'token': action.payload.token,
      'type': action.payload.type
    }});
  }
  case AUTH.SIGNIN_FAIL: {
    alert(action.payload);
    return state.set({'signingIn': false});
  }

  case AUTH.SIGNOUT: {
    return state;
  }
  case AUTH.SIGNOUT_SUCCESS: {
    return state.merge({'signingIn': false, 'user': {
      'u_name': null,
      'token': null,
      'type': null
    }});
  }
  case AUTH.SIGNOUT_FAIL: {
    alert(action.payload);
    return state;
  }
  default:
    return state;
  }
}
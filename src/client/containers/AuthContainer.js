import { connect } from 'react-redux';
import * as authActions from '~/src/client/actions/authActions';
import AuthComponent from '~/src/client/components/auth/AuthComponent';

export default (Component) => {
  return connect(
    (state) => ({
      component: Component,
      isAuth: state.getIn(['authReducer', 'user', 'token']) ? true : false
    }),
    (dispatch) => ({
      handleCookie: () => {
        return dispatch(authActions.checkCookie());
      },
    })
  )(AuthComponent);
}
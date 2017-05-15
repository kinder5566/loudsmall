import { connect } from 'react-redux';
import * as authActions from '~/src/client/actions/authActions';
import AuthComponent from '~/src/client/components/auth/AuthComponent';

export default (Component) => {
  const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuth: state.auth.isAuthenticated
  });

  return connect(
    (state) => ({
      component: Component,
      isAuth: state.getIn(['authReducer', 'user', 'token']) ? true : false
    }),
    (dispatch) => ({
      handleCookie: (cb) => {
        dispatch(authActions.checkCookie(cb));
      },
    })
  )(AuthComponent);
}
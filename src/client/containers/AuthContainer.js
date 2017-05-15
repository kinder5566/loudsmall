import { connect } from 'react-redux';
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
      user: state.getIn(['authReducer', 'user']),
      isAuth: state.getIn(['authReducer', 'user']) ? true : false
    }),
    (dispatch) => ({ })
  )(AuthComponent);
}
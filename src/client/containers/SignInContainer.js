import { connect } from 'react-redux';
import * as authActions from '~/src/client/actions/authActions';
import SignIn from '~/src/client/components/auth/SignIn';

export default connect(
  (state) => ({}),
  (dispatch) => ({
    handleSubmit: (data) => {
      var userObj = {
        u_name: data
      };
      return dispatch(authActions.signIn(userObj));
    },
    handleSubmitGoogle: (googleUser) => {
      return dispatch(authActions.signInGoogle(googleUser));
    }
  })
)(SignIn);

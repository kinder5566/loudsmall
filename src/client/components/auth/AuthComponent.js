import React from 'react';
import PropTypes from 'prop-types';
import { history } from '~/src/client/constants/singleton';

class AuthComponent extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    handleCookie: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  };
  componentWillMount() {
    this.checkAuth();
  };
  componentWillReceiveProps(nextProps) {
    this.checkAuth();
  };
  checkAuth() {
    var self = this;
    if (!this.props.isAuth) {
      this.props.handleCookie(function(err, data) {
        if (err) {
          history.push('/');
          // let redirectAfterLogin = self.props.location.pathname;
          // history.push(`/?next=${redirectAfterLogin}`);
        }
      });
    }
  };

  render() {
    return (
      <div>
        { this.props.isAuth === true ? <this.props.component {...this.props}/> : null }
      </div>
    )
  };
}

export default AuthComponent
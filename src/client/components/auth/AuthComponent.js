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
      this.props.handleCookie()
      .then()
      .catch(err => {
        history.push('/');
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
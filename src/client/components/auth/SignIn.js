import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';

import { history } from '~/src/client/constants/singleton';
import SignInLocal from './SignInLocal';
import SignInGoogle from './SignInGoogle';
import CirclePhoneDiv from '../fun/CirclePhoneDiv';

const row_margin_top = {
  'marginTop': '20px'
};

class SignIn extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitGoogle: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  };

  handleSubmit(data) {
    this.handleRedirect(this.props.handleSubmit(data));
  };

  handleSubmitGoogle(googleUser) {
    this.handleRedirect(this.props.handleSubmitGoogle(googleUser));
  };

  handleRedirect(promise) {
    promise
    .then(data => { history.push('/loud'); })
    .catch(err => { console.log(err) });
  }

  render() {
    return (
      <Jumbotron>
        <h1>大聲什麼 Online!</h1>
        <p>爽用啥登入隨便你</p>
        <div className="row">
          <div className="col-xs-6">
            <div style={row_margin_top}>
              <SignInLocal handleSubmit={::this.handleSubmit} />
            </div>
            <div style={row_margin_top}>
              <SignInGoogle handleSubmit={::this.handleSubmitGoogle} />
            </div>
          </div>
        </div>
        <CirclePhoneDiv number={10} />
      </Jumbotron>
    );
  };
}

export default SignIn


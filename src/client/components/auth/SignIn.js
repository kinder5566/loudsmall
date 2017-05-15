import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import SignInLocal from './SignInLocal';
import SignInGoogle from './SignInGoogle';
import CirclePhoneDiv from '../fun/CirclePhoneDiv';

const row_margin_top = {
  'marginTop': '20px'
};

const SignIn = ({
  handleSubmit,
  handleSubmitGoogle
}) => {
  return (
    <Jumbotron>
      <h1>大聲什麼 Online!</h1>
      <p>爽用啥登入隨便你</p>
      <div className="row">
        <div className="col-xs-6">
          <div style={row_margin_top}>
            <SignInLocal handleSubmit={handleSubmit} />
          </div>
          <div style={row_margin_top}>
            <SignInGoogle handleSubmit={handleSubmitGoogle} />
          </div>
        </div>
      </div>
      <CirclePhoneDiv number={10} />
    </Jumbotron>
   );
};

export default SignIn;


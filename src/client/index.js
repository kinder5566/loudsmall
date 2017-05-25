import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import config from '~/src/util/config';
import { history } from '~/src/client/constants/singleton';
import store from '~/src/client/store';
import App from '~/src/client/containers/App';
import AuthContainer from '~/src/client/containers/AuthContainer';
import SignInContainer from '~/src/client/containers/SignInContainer';
import ChatroomContainer from '~/src/client/containers/ChatroomContainer';

ReactDOM.render(
  <div>
    <meta name="google-signin-client_id" content={config.GOOGLE_SIGNIN_KEY} />

    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Route exact path="/" component={SignInContainer} />
          <Route exact path="/loud" component={AuthContainer(ChatroomContainer)} />
        </App>
      </ConnectedRouter>
    </Provider>
  </div>,
  document.getElementById('app')
);
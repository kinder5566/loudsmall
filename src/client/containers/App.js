import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import config from '~/util/config';

class App extends React.Component {
  componentWillMount() {
    const map = document.createElement("script");
    map.src = "https://maps.googleapis.com/maps/api/js?key=" + config.GOOGLE_MAP_KEY;
    map.async = true;
    document.body.appendChild(map);
  };

  handleSignOut() {
    this.props.handleSignOut(this.props.user);
  };
  render(user) {
    return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Loud Small
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
        </Nav>
        <Nav pullRight>
          {this.props.user.get('token') !== null ? 
            <NavItem onClick={::this.handleSignOut}>Sign out</NavItem> : ''}
        </Nav>
      </Navbar>
      <div className="container">
        {this.props.children}
      </div>
    </div>
  );}
}

import { withRouter } from 'react-router-dom'
import * as authActions from '~/src/client/actions/authActions';
export default withRouter(connect(
  (state) => ({
    user: state.getIn(['authReducer', 'user'])
  }),
  (dispatch) => ({
    handleSignOut: (user) => {
      var data = {
        u_name: user.get('u_name'),
        token: user.get('token'),
        type: user.get('type')
      }
      dispatch(authActions.signOut(data));
    }
  })
)(App));
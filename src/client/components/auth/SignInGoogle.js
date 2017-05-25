import React from 'react';
import PropTypes from 'prop-types';

class SignInGoogle extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount(){
    var self = this;
    const googleSign = document.createElement("script");
    googleSign.src = "https://apis.google.com/js/platform.js";
    googleSign.async = true;
    document.body.appendChild(googleSign);
    googleSign.onload = function() {
      window.gapi.signin2.render('g-signin2', {
        'width': 215,
        'height': 46,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': self.handleSubmit
      }); 
    }
  };

  handleSubmit(googleUser) {
    this.props.handleSubmit(googleUser);
  };
  render() {
    return ( <div id="g-signin2" /> );
  };
}
export default SignInGoogle
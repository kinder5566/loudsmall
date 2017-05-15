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
    window.gapi.signin2.render('g-signin2', {
      'width': 215,
      'height': 46,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.handleSubmit
    }); 
  };

  handleSubmit(googleUser) {
    this.props.handleSubmit(googleUser);
  };
  render() {
    return ( <div id="g-signin2" /> );
  };
}
export default SignInGoogle

          
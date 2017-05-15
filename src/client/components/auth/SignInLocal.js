import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

class SignInLocal extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {u_name: ''};
  };
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.nameInput).focus();
  };
  handleChange(e) {
    this.setState({u_name: e.target.value});
  };
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.u_name.length < 1) {
      ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }
    else {
      this.props.handleSubmit(this.state.u_name);
      this.setState({u_name: ''});
    }
  };
  render() {
    return (
      <Form onSubmit={::this.handleSubmit}>
        <InputGroup>
          <FormControl type="text" bsSize="large" value={this.state.u_name} 
            onChange={::this.handleChange} ref="nameInput" placeholder="銀行帳戶密碼" />
          <InputGroup.Button>
            <Button type="submit" bsSize="large" bsStyle="primary">登人</Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
    );
  };
}
export default SignInLocal

          
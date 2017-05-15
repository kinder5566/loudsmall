import React from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';

import { socket } from '~/src/client/constants/singleton';
import InputMap from './InputMap';

const icon = {
  fontSize: '15px',
  color: '#636363'
};

class Input extends React.Component {
  static propTypes = {
    handleEnter: PropTypes.func.isRequired,
    handleMap: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      inputMethod: 1
    };
  };
  textChange(e) {
    this.setState({msg: e.target.value});
  };
  inputMethodChange(index) {
    if(this.state.inputMethod === index) {
      this.setState({inputMethod: 1});
    }
    else {
      this.setState({inputMethod: index});
    }
  };
  rendorInputMethod() {
    switch(this.state.inputMethod) {
      case 1:
        return null;
      case 2:
        return <InputMap socket={socket.client()} handleMap={::this.handleMap} />
    }
  }

  handleEnter(e) {
    if(e.type !== 'keydown' && e.type !== 'click') return;
    if(e.type === 'keydown')
      if (e.which !== 13) return;
    e.preventDefault();
    if(this.state.msg && this.state.msg !== '') {
      this.props.handleEnter(this.state.msg);
      this.setState({msg: ''});
    }
  };

  handleMap(pos) {
    this.setState({inputMethod: 1});
    this.props.handleMap(pos);
  };

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={() => {this.inputMethodChange(2)}}><Glyphicon style={icon} glyph="map-marker" /></Button>
          </InputGroup.Button>
          <FormControl type="text" value={this.state.msg} onChange={::this.textChange}  
            onKeyDown={::this.handleEnter} placeholder="請說話好嗎..." />
          <InputGroup.Button>
            <Button onClick={::this.handleEnter}>送啦</Button>
          </InputGroup.Button>
        </InputGroup>
        {this.rendorInputMethod()}
      </div>
    );
  };
}

export default Input
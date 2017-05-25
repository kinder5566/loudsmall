import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

import ChatView from './ChatView';
import Input from './Input';

class Chatroom extends React.Component {
  static propTypes = {
    msgs: PropTypes.object.isRequired,
    handleSocket: PropTypes.func.isRequired,
    handleEnter: PropTypes.func.isRequired,
    handleMap: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  };

  componentDidMount(){
    this.props.handleSocket();
  };

  render() {
    return (
      <Panel bsStyle="warning" header="開嗆啦"
        footer={<Input handleEnter={this.props.handleEnter} 
                       handleMap={this.props.handleMap} />}>
        <ChatView msgs={this.props.msgs} />
      </Panel>
     );
  };
}

export default Chatroom
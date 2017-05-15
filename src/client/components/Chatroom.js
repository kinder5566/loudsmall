import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import ChatView from './ChatView';
import Input from './Input';

const Chatroom = ({
  msgs,
  handleEnter,
  handleMap
}) => {
  return (
    <Panel bsStyle="warning" header="開嗆啦"
      footer={<Input handleEnter={handleEnter} handleMap={handleMap} />}>
      <ChatView msgs={msgs} />
    </Panel>
   );
};

export default Chatroom;
import React from 'react';
import PropTypes from 'prop-types';
import ChatViewText from '~/src/client/components/ChatViewText';
import ChatViewMap from '~/src/client/components/ChatViewMap';

const chatroom = {
  minHeight: 300
};

class ChatView extends React.Component {
  static propTypes = {
    msgs: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  };

  rendorChatType(content, index) {
    
    switch(content.type) {
      case 'text':
        return <ChatViewText key={index} content={content} />;
      case 'map':
        return <ChatViewMap key={index} content={content} />;
    }
  }

  render() {
    return (
      <div style={chatroom}> {
        this.props.msgs.map((content, index) => {
          return this.rendorChatType(content.toJS(), index)
        })
      } </div>
    );
  };
}

export default ChatView
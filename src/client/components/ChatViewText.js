import React from 'react';
import PropTypes from 'prop-types';
import { Well } from 'react-bootstrap';

import '~/src/util/util'; // for override Date
import '~/src/client/styles/style.css';

const ChatViewText = ({ content }) => {
  return (
    <div className="col-xs-12 chatDiv">
      <div className={'chatBlock' + (content.self ? ' self' : ' others')}>
        <div className="row">
          <h4>{content.u_name}:</h4>
        </div>
        <div className="row">
          <Well bsSize="small">
            <p>{content.msg}</p>
          </Well>
        </div>
        <div className="row">
          {new Date(content.time).toDateString()}
          {content.self ? (content.send ? ' - 送到':' - 傳送中') : ''}
        </div>
      </div>
    </div>
  );
};

ChatViewText.propTypes = {
  content: PropTypes.object.isRequired,
};

export default ChatViewText;
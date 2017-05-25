import { connect } from 'react-redux';
import Chatroom from '~/src/client/components/Chatroom';
import * as msgActions from '~/src/client/actions/msgActions';

export default connect(
  (state) => ({
    msgs: state.getIn(['msgReducer', 'msgs'])
  }),
  (dispatch) => ({
    handleSocket: () => {
      return dispatch(msgActions.connectToServer());
    },
    handleEnter: (data) => {
      return dispatch(msgActions.sendTextMsg(data));
    },
    handleMap: (pos) => {
      return dispatch(msgActions.sendMapMsg(pos));
    }
  })
)(Chatroom);

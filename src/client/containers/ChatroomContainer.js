import { connect } from 'react-redux';
import Chatroom from '~/src/client/components/Chatroom';
import * as msgActions from '~/src/client/actions/msgActions';

export default connect(
  (state) => ({
    msgs: state.getIn(['msgReducer', 'msgs'])
  }),
  (dispatch) => ({
    handleEnter: (data) => {
      dispatch(msgActions.sendTextMsg(data));
    },
    handleMap: (pos) => {
      dispatch(msgActions.sendMapMsg(pos));
    }
  })
)(Chatroom);

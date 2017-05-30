import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import config from '~/src/util/config';
import '~/src/util/util'; // for override Date
import '~/src/client/styles/style.css';

const img = {
  borderRadius: '10px',
  cursor: 'pointer'
}

class ChatViewMap extends React.Component {
  static propTypes = {
    content: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  };

  genStaticMapURL(pos) {
    let url = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=400x200&markers=';
    return url + pos.lat + ',' + pos.lng + '&key=' + config.GOOGLE_STATICMAP_KEY;
  }

  clickMap() {
    this.setState({ showModal: true });
  }

  closeMap() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <div className="col-xs-12 chatDiv">
          <div className={'chatBlock' + (this.props.content.self ? ' self' : ' others')}>
            <div className="row">
              <h4>{this.props.content.u_name}:</h4>
            </div>
            <div className="row">
              <img src={this.genStaticMapURL(this.props.content.msg)} alt="google map" 
                onClick={::this.clickMap} style={img} />
            </div>
            <div className="row">
              {new Date(this.props.content.time).toDateString()}
              {this.props.content.self ? (this.props.content.send ? 
                ' - ' + <Glyphicon glyph="ok" />: ' - ' + <Glyphicon glyph="option-horizontal" />) : ''}
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={::this.closeMap}>
          <Modal.Header closeButton>
            <Modal.Title>不要偷窺</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WithGoogleMap
              defaultCenter={this.props.content.msg}
              containerElement={ <div style={{ height: `300px` }} /> }
              mapElement={ <div style={{ height: `300px` }} /> }
              selfMarker={{ position: this.props.content.msg }} />
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}

const WithGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultCenter={props.defaultCenter}
      defaultZoom={13}
      options={{ mapTypeControl: false }}>
    { <Marker {...props.selfMarker} /> }
  </GoogleMap>
));

export default ChatViewMap
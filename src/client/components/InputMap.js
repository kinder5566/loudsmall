import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class InputMap extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    center: PropTypes.object,
    socket: PropTypes.object.isRequired,
    handleMap: PropTypes.func.isRequired
  };
  static defaultProps = {
    interval: 2,
    defaultCenter: { lat: 25.0112183, lng: 121.5206757 }
  };
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      selfMarker: null,
      markers: [],
      shareLocation: false,
      refreshIntervalId: null
    };
  };

  componentDidMount(){
    let self = this;
    self.props.socket.on('map_msg', function(data){
      let newMarkers = [];
      data.forEach(function(element) {
        if(!element.lat) return;
        let marker = {
          position:{ lat: element.lat, lng: element.lng }
        }
        newMarkers.push(marker);
        self.setState({markers: newMarkers});
      });
    });
    this.scheduleGetPosition();
  };

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
    this.props.socket.emit('enable_map', { enable: false });
  }

  scheduleGetPosition() {
    let self = this;
    let refreshIntervalId = setInterval(function() {
      self.getPosition(function(err, pos) {
        if(err) return;
        if(!self.state.center) {
          self.setState({ center: pos });
        }
        self.setState({
          selfMarker: { position: pos }
        });
        if(self.state.shareLocation) {
          self.props.socket.emit('map_msg', pos);
        }
      })
    }, this.props.interval * 1000);
    self.setState({refreshIntervalId: refreshIntervalId});
  }

  getPosition(cb) {
    if (!navigator.geolocation) {
      cb('Not support geolocation', null);
      return;
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        cb(null, pos);
      }, function(err) { cb(err, null); }
    );
  };

  shareLocation() {
    let share = !this.state.shareLocation;
    this.setState({shareLocation: share});
    let data = { enable: share }
    this.props.socket.emit('enable_map', data);
  };

  handleMap() {
    if(this.state.selfMarker) {
      this.props.handleMap(this.state.selfMarker.position);
    }
    else {
      alert('Can\'t get position');
    }
  }

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button bsStyle="info" onClick={::this.shareLocation}>
            {this.state.shareLocation ? '關閉分享' : '分享位置'}
          </Button>
          <Button bsStyle="info" onClick={::this.handleMap}>傳送位置</Button>
        </ButtonGroup>
        <WithGoogleMap
          defaultCenter={this.props.defaultCenter}
          center={this.state.center}
          containerElement={ <div style={{ height: `300px` }} /> }
          mapElement={ <div style={{ height: `300px` }} /> }
          selfMarker={this.state.selfMarker}
          markers={this.state.markers} />
      </div>
    );
  };
}

const WithGoogleMap = withGoogleMap(props => (
  <GoogleMap defaultCenter={props.defaultCenter}
      center={props.center ? props.center : props.defaultCenter}
      defaultZoom={13}
      options={{ mapTypeControl: false }}>
    { <Marker {...props.selfMarker} /> }
    { props.markers.map((marker, index) => ( <Marker key={index} {...marker} /> )) }
  </GoogleMap>
));

export default InputMap
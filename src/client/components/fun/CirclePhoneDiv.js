import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import prefix from 'react-prefixer';

import '~/src/client/styles/phone.css';

class CirclePhoneDiv extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      centerX: null,
      centerY: null,
      startAngle: 0,
      degree: 0,
      transition: 0,
      r: 0,
      numbers: null
    };
  };

  componentDidMount() {
    this.drawChild();
    window.addEventListener("resize", ::this.drawChild);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", ::this.drawChild);
  }

  onMouseDown(e) {
    e.preventDefault();
    let state = {};
    state.dragging = true;
    state.transition = 0;

    let refRect = this.refs.phone.getBoundingClientRect();
    let top = refRect.top,
        left = refRect.left,
        height = refRect.height,
        width = refRect.width;
    state.centerX = left + (width / 2);
    state.centerY = top + (height / 2);

    let clickX = e.clientX,
        clickY = e.clientY;
    let startAngle = (180/Math.PI) * Math.atan2(clickY - state.centerY, 
      clickX - state.centerX);
    state.startAngle = startAngle;
    this.setState(state);
  };

  onMouseMove(e) {
    e.preventDefault();
    if(!this.state.dragging) return;

    let movingX = e.clientX,
        movingY = e.clientY;
    let newAngle = (180/Math.PI) * Math.atan2(movingY - this.state.centerY, 
      movingX - this.state.centerX);
    let degree = newAngle - this.state.startAngle;
    this.setState({
      degree: degree
    });
  };

  onMouseUp(e) {
    if(!this.state.dragging) return;
    this.setState({
      dragging: false,
      degree: 0,
      transition: 500
    });
  };

  drawChild() {
    if(!this.refs.phone) return;
    let numbers = [];
    for (var i = 0; i < this.props.number; i++) {
      let pos = this.computeChild(i);
      numbers.push(<div key={i} className="circle number" 
        style={pos} onMouseDown={::this.onMouseDown}>{i}</div>);
    }
    this.setState({
      numbers: numbers
    });
  }

  computeChild(index) {
    let refRect = this.refs.phone.getBoundingClientRect();
    let r = refRect.width / 2;
    let childWidth = refRect.width * 20 / 100;
    let angle = 360 / this.props.number;

    r -= childWidth/2
    let x = r * Math.sin((2*Math.PI/360) * angle * index);
    let y = r * Math.cos((2*Math.PI/360) * angle * index);
    return {
      left: x + r,
      top: r - y
    };
  };

  render() {
    return (
      <div className="circle phone" ref="phone" 
           style={prefix({
              WebkitTransition: this.state.transition + 'ms',
              transform: 'rotate(' + this.state.degree + 'deg)',
              transformOrigin: '50% 50%'
            })}
           onMouseMove={::this.onMouseMove}
           onMouseUp={::this.onMouseUp}>
        {this.state.numbers}
      </div>
    );
  };
}

export default CirclePhoneDiv
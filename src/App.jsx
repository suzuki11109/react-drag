import React from 'react';
import update from 'react-addons-update';
import ReactDOM from 'react-dom';
// import Draggable from 'react-draggable';

class Draggable extends React.Component {
  // this.props.position = {
  //   x,
  //   y
  // }
  dragging = false;

  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0
    };
  }

  onMouseDown = (e) => {
    console.log(e);
    this.dragging = true;
    document.addEventListener('mousemove', this.onMouseMove, true);
  }

  onMouseMove = (e) => {
    if (this.dragging) {
      let node = ReactDOM.findDOMNode(this);

      // let body = node.props.offsetParent;
      // console.log(body.scrollLeft);
      // console.log(e.clientX);

      let offsetParentRect = node.parentElement.getBoundingClientRect();
      let offsetClientRect = node.getBoundingClientRect();
      console.log(e.clientX - offsetParentRect.left)
      this.setState({x:e.clientX - offsetParentRect.left - offsetClientRect.left, y: this.state.y})
    }
  }

  onMouseUp = () => {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onMouseMove, true);
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      x: this.state.x,
      y: this.state.y,
    })
  }
}

class App extends React.Component {
  render() {
    return (
      <div style={{marginLeft: 50}}>
        <svg xmlns="http://www.w3.org/2000/svg" width={500} height={500}>
          <Draggable><rect width={100} height={100} /></Draggable>
        </svg>
      </div>
    );
  }
}

export default App;

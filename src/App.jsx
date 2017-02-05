import React from 'react';
import update from 'react-addons-update';
import Draggable from 'react-draggable';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rect: { x: 0, y: 0, width: 100, height: 100 },
      resizer: { x: 100, y: 0 }
    };
  }
  handleStart = (e, data) => {
    console.log('Event: ', e.nativeEvent.offsetX);
    console.log('Data: ', data);

  }

  resizerDrag = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
    this.setState({
      rect: update(this.state.rect, {width: { $set: data.x }}),
      resizer: {x: data.x, y: this.state.resizer.y}
    });
  }

  render() {
    return (
      <div style={{marginLeft: 50}}>
        <svg xmlns="http://www.w3.org/2000/svg" width={500} height={500}>
          <Draggable
            handle=".figure"
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}
            position={{x: this.state.rect.x, y: this.state.rect.y}}>
            <rect className="figure" width={this.state.rect.width} height={100} fill={'orange'}/>
          </Draggable>
          <g>
            <Draggable
              axis="x"
              handle=".resizer"
              defaultPosition={this.state.resizer}
              onDrag={this.resizerDrag}
              position={{x: this.state.resizer.x, y: this.state.resizer.y}}
              onStop={this.handleStop}>
              <rect className="resizer" width={10} height={10} />
            </Draggable>
          </g>
        </svg>
      </div>
    );
  }
}

export default App;

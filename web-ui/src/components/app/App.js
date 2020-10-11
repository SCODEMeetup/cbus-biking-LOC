import React from 'react';
import './App.css';
import MapView from '../views/map/MapView';

export default class App extends React.Component {

  state = {
    height: window.innerHeight
  }

  updateDimensions() {
    this.setState({height: window.innerHeight});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    const startPosition = [40, -83]; //TODO: Use the user's location
    const zoom = 12;

    return (
      <div id="map-container">
        <MapView
          height={this.state.height}
          position={startPosition}
          zoom={zoom}
        />
      </div>
    );
  }
};

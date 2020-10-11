import React from 'react';
import {Map, TileLayer, Marker } from 'react-leaflet';

export default class MapView extends React.Component {

  constructor() {
    super();
    this.mapRef = React.createRef();
    this.state = {
      marker: null
    };
  }

  clearMarker() {
    this.setState({
      marker: null
    });
  }

  handleClick(e) {
    const map = this.mapRef.current;
    if (map) {
      this.setState({
        marker: {
          pos: e.latlng
        }
      })
    }
  }

  render() {
    const marker = (this.state && this.state.marker) ? (
      <Marker
        position={this.state.marker.pos}
        onClick={() => this.clearMarker()}
      ></Marker>
    ) : null;

    return (
      <div id="map">
        <Map
          center={this.props.position}
          zoom={this.props.zoom}
          style={{height: this.props.height + 'px'}}
          ref={this.mapRef}
          onClick={(e) => this.handleClick(e)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {marker}
        </Map>
      </div>
    );
  }
}

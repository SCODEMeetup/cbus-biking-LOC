import React from 'react';
import {Map, TileLayer } from 'react-leaflet';

export default class MapView extends React.Component {

  render() {
    console.log(this.props.height)
    return (
      <div id="map">
        <Map
          center={this.props.position}
          zoom={this.props.zoom}
          style={{height: this.props.height + 'px'}}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}
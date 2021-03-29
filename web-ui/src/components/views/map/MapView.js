import React from 'react';
import './MapView.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
require('dotenv').config();

// URL for Reports API|
const reportsUrl = process.env.REACT_APP_BIKING_REPORTS_URL || "http://localhost:4000/api/reports";

var newMarkerId = 999; //placeholder for report id when user clicks a new location on map

export default class MapView extends React.Component {

  constructor() {
    super();
    this.state = {
      reports: [],               // Stored JSON report objects 
      error_msg: "",             // error message displayed before map
      apiResponse: "",           // Response from bikeloc reports API
    };
  }

  callAPI() {
    fetch(reportsUrl) 
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          return res;
        } else {
          throw Error(res.statusText);
        }
      })
      .then(res => res.text()) 
      .then(res => this.setState({ apiResponse: res }))
      .then(res => this.storedMarkers())
      .catch((error) => {
        // Handle the error
        this.setState({error_msg: `Failed to fetch reports from ${process.env.REACT_APP_BIKING_REPORTS_URL}.`}); 
      });
  }

  componentDidMount() {
    this.callAPI();
  } 

  // addMarker creates a placeholder report marker 
  // ToDo: add input form
  addMarker = (e) => {
    const {reports} = this.state
    ++newMarkerId;
    var report = this.addReport(e);
    reports.push(report);
    this.setState({reports})
  } 

  // creates placeholder report object
  addReport(e) {
    var incident_type = {
      description: 'undefined'
    }
    var incident_severity = {
      description: 'undefined'
    }
    var report = {
      lat: e.latlng.lat,
      long: e.latlng.lng,
      id: newMarkerId,
      incident_type,
      incident_severity,
      incident_text: 'ToDo: add input form'
    }
    return(report);
  }

  storedMarkers = () => {
    if (this.state.apiResponse !== "") 
      this.setState({reports: JSON.parse(this.state.apiResponse)});
  }

  render() {
    return (
      <div id="map">
        <div>{this.state.error_msg}</div>
        <Map
          tap={false} //needed for Safari browser
          center={this.props.position}
          zoom={this.props.zoom}
          style={{height: this.props.height + 'px'}}
          onClick={this.addMarker}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.reports.map(report => {
            return (
              <Marker 
                position={[
                  report.lat,
                  report.long
                ]}
                key={report['id']}>
                <Popup>
                  <div className="info-box">
                    <div className="content">
                      <h2> Bike Safety Incident</h2>
                      <h3>Incident Type</h3>
                      <p>{(report.incident_type.description)}</p>
                      <hr color="white"/>
                      <h3>Incident Severity</h3>
                      <p>{report.incident_severity.description}</p>
                      <hr color="white"/>
                      <h3>Date and Time of Incident</h3>
                      <p>{formatUtcDate(report.incident_datetime)}</p>
                      <hr color="white"/>
                      <h3>Incident description</h3>
                      <p>{report.incident_text}</p>
                    </div>
                   </div>
                </Popup>
              </Marker>
            )
          })
        }
        </Map>
      </div>
    );
  }
}

function formatUtcDate(utc_string) {
  var localDate = new Date(utc_string);
  var secondString = localDate.toLocaleTimeString().substr(-6,6);
  return localDate.toLocaleString().replace(secondString, secondString.substr(-3));

}


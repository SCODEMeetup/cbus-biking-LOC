import React from 'react';
import './MapView.css';
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { BIKING_REPORTS_URL } from '../../services/CbusBikingLocService.js';
import { getReports } from '../../services/CbusBikingLocService.js';
import { formatUtcDate } from '../../lib/DateUtils.js'
import { isValidHttpUrl } from '../../lib/Utils.js'

var newMarkerId = 9999; //placeholder for report id when user clicks a new location on map
let zoom = 14;

export default class MapView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reports: [],               // Stored JSON report objects 
      error_msg: "",             // error message displayed before map
      apiResponse: "",           // Response from bikeloc reports API
    };
  }

  componentDidMount() {
    this.retrieveReports();
  }
  
  componentDidUpdate() {
    if (this.props.reportPosted) {
      this.retrieveReports();
      this.props.handleReportPostedChange(false);
    }
  }

  retrieveReports() {
    getReports(BIKING_REPORTS_URL)
      .then(res => res.text()) 
      .then(res => this.setState({ apiResponse: res }))
      .then(res => this.storedMarkers())
      .catch((error) => {
        // Handle the error
        this.setState({error_msg: `Failed to fetch reports from ${BIKING_REPORTS_URL}.`}); 
      });
  } 

  addMarker = (e) => {
    this.handleFormLatChange(e);
    this.handleFormLongChange(e);
    const {reports} = this.state
    ++newMarkerId;
    var report = this.addReport(e);
    reports.push(report);
    this.setState({reports})
  } 

  handleFormLatChange(e) {
    this.props.handleFormLatChange(e.latlng.lat);
  }

  handleFormLongChange(e) {
    this.props.handleFormLongChange(e.latlng.lng);
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
      incident_datetime: 'undefined',
      incident_text: 'undefined'
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
        <Map
          tap={false} //needed for Safari browser
          center={this.props.position}
          zoom={zoom}
          style={{height: this.props.height + 'px'}}
          onClick={this.addMarker}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <CircleMarker
            center={this.props.position}
            color="green"
            fillColor="red"
            radius={8}
            fillOpacity={.6}
            stroke={false}
          ></CircleMarker>
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
                      <p>{isValidHttpUrl(report.incident_text) ? <a href={report.incident_text}>Crash Report Link</a> : report.incident_text}</p>
                    </div>
                   </div>
                </Popup>
              </Marker>
            )
          })
        }
        </Map>
        <div style={{color: "red"}} >{this.state.error_msg}</div>
      </div>
    );
  }
}



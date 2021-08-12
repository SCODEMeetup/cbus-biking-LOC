import React from 'react';
import './App.css';
import MapView from '../views/map/MapView';
import FormView from '../views/form/FormView';
import Delayed from '../lib/Delayed';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleFormLatChange = this.handleFormLatChange.bind(this);
    this.handleFormLongChange = this.handleFormLongChange.bind(this);
    this.handleReportPostedChange = this.handleReportPostedChange.bind(this);
    this.state = {
      height: window.innerHeight * 0.9,
      width: window.innerWidth * 0.9,
      formLat: '',
      formLong: '',
      reportPosted: false,
      startPosition: [40, -83],
      zoom: 11,
    }
  }

  handleFormLatChange(newFormLat) {
    this.setState({formLat: newFormLat});
  }

  handleFormLongChange(newFormLong) {
    this.setState({formLong: newFormLong});
  }

  handleReportPostedChange(newReportPosted) {
    this.setState({reportPosted: newReportPosted});
  }

  updateDimensions() {
    this.setState({height: window.innerHeight * 0.9});
    this.setState({width: window.innerWidth * 0.9});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));

    let success = position => {
      this.setState( { startPosition: [position.coords.latitude, position.coords.longitude]} );
    }

    let error = () => this.setState({startPosition: [40, -83]});
    
    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    return (
      <div className="app-container">
        <Delayed waitBeforeShow={3750}>
        <div className="map-container">
          <MapView
            height={this.state.height}
            width={this.state.width}
            position={this.state.startPosition}
            zoom={this.state.zoom}
            reportPosted={this.state.reportPosted}
            handleFormLatChange={this.handleFormLatChange}
            handleFormLongChange={this.handleFormLongChange}
            handleReportPostedChange={this.handleReportPostedChange}
          />
        </div>
        </Delayed>
        <div className="form-container">
          <FormView
            formLat={this.state.formLat}
            formLong={this.state.formLong}
            handleReportPostedChange={this.handleReportPostedChange}
          />
        </div>
      </div>
    );
  }
};

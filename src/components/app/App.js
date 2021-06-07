import React from 'react';
import './App.css';
import MapView from '../views/map/MapView';
import FormView from '../views/form/FormView';

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
    window.removeEventListener("resize", this.updateDimensions.bind(this))
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }

  render() {
    const startPosition = [40, -83]; //TODO: Use the user's location
    const zoom = 11;
    return (
      <div className="app-container">
        <div className="map-container">
          <MapView
            height={this.state.height}
            width={this.state.width}
            position={startPosition}
            zoom={zoom}
            reportPosted={this.state.reportPosted}
            handleFormLatChange={this.handleFormLatChange}
            handleFormLongChange={this.handleFormLongChange}
            handleReportPostedChange={this.handleReportPostedChange}
          />
        </div>
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

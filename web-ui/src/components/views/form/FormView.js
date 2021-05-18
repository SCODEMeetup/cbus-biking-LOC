import React from 'react';
import './FormView.css';
import { BIKING_REPORTS_URL } from '../../services/CbusBikingLocService.js';
import { postReport } from '../../services/CbusBikingLocService.js';
import { incidentTypes, incidentSeverities, formMessages, datetimeInputTip } from './FormViewUserMessages';

export default class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      long: '',
      prev_props_formLat: '',
      prev_props_formLong: '',
      incident_type: incidentTypes.get(1),
      incident_severity: incidentSeverities.get(1),
      incident_datetime: datetimeInputTip(),
      incident_text: '',
      input_status: '',
      input_color: '',
      response_status: '',
      response_status_text: '',
      form_tip_text: formMessages.get(1),
      input_text_class: 'input-text-plain-border',
      form_tip_text_class: 'form-tip-text',
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  
  static getDerivedStateFromProps(props, state) {
    if (props.formLat !== state.prev_props_formLat || 
        props.formLong !== state.prev_props_formLong) {
      return {
        lat: props.formLat,
        long: props.formLong,
        prev_props_formLat: props.formLat,
        prev_props_formLong: props.formLong,
        input_text_class: 'input-text-highlight-border',
        form_tip_text: formMessages.get(2), 
        input_status: '',
        incident_type: incidentTypes.get(1),
        incident_severity: incidentSeverities.get(1),
        incident_datetime: datetimeInputTip(),
        incident_text: '',
      };
    }
    return null;
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  handleSubmit = (event) => {
    var report = this.createReport();
    event.preventDefault();
    if(this.validateReport(report)) {
      postReport(BIKING_REPORTS_URL, report)
        .then(response => {
          this.setState({response_status: response.status});
          if (response.status === 201)
            this.restoreFormMsg();
          else
            this.setState({response_status_text: response.statusText});
          return response.text();
        })
        .then(data => {
          if(this.state.response_status !== 201)
            throw Error(`${this.state.response_status_text} ${data}`);
        })
        .catch(error => {
          this.setSubmitMessage("red", `${error}` );
        });
    }
  }

  restoreFormMsg() {
    this.setSubmitMessage("green", formMessages.get(3));
    this.setState({form_tip_text: formMessages.get(1)});
    this.setState({ input_text_class: 'input-text-plain-border'});
  }

  setSubmitMessage(input_color, input_status) {
    this.setState({input_color: input_color});
    this.setState({input_status: input_status});
  }


  createReport() {
    var report = {
      lat: this.state.lat,
      long: this.state.long,
      incident_datetime: this.getUtcDateTime(),
      incident_text: this.state.incident_text,
      incident_type_id: this.getTypeId(),
      incident_severity_id: this.getSeverityId(),
    }
    return report;
  }

  getUtcDateTime() {
    //convert datetime to UTC datetime string
    var DateTime = new Date(this.state.incident_datetime);
    if (DateTime instanceof Date && isFinite(DateTime)) {
      var isoDateTime = DateTime.toISOString();
      return isoDateTime;
    }
    else
      return('invalid datetime');
  }

  getTypeId() {
    for (let [key, value] of incidentTypes) {
      if(value === this.state.incident_type) 
        return(key);
    }
  }

  getSeverityId() {
    for (let [key, value] of incidentSeverities) {
      if(value === this.state.incident_severity)
        return(key);
    }
  }


  validateReport(report) {
    var errorFound = false;
    if(report.incident_datetime === "invalid datetime") {
       this.setState({input_status: report.incident_datetime} );
       errorFound = true;
    } 
    if(report.lat < -90 || report.lat > 90) {
      this.setState({input_status: "latitude must be between -90 and 90"} );
      errorFound = true;
    }
    if(report.long < -90 || report.long > 90) {
      this.setState({input_status: "longitude must be between -180 and 180"} );
      errorFound = true;
    }
    if(errorFound) {
        this.setState({input_color: "red"});
        return(false);
    } else {
        this.setState({input_color: "green"});
        return(true);  
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Bike Safety Incident Report</h1>
        <div className={this.state.form_tip_text_class}>{this.state.form_tip_text}</div>
        <p/>
        <div>Latitude: *</div>
        <input
          className={this.state.input_text_class}
          type='text'
          name='lat'
          value={this.state.lat}
          onChange={this.myChangeHandler}
        />
        <div>Longitude: *</div>
        <input
          className={this.state.input_text_class}
          type='text'
          value={this.state.long}
          name='long'
          onChange={this.myChangeHandler}
        />
        <p/>
        <div>Select Incident Type *</div>
        <select value={this.state.incident_type} onChange={this.myChangeHandler} name='incident_type'>
          <option value={incidentTypes.get(1)}>{incidentTypes.get(1)}</option>
          <option value={incidentTypes.get(2)}>{incidentTypes.get(2)}</option>
          <option value={incidentTypes.get(3)}>{incidentTypes.get(3)}</option>
          <option value={incidentTypes.get(4)}>{incidentTypes.get(4)}</option>
        </select>
        <p/>
        <div>Select Incident Severity *</div>
        <select value={this.state.incident_severity} onChange={this.myChangeHandler} name='incident_severity'>
          <option value={incidentSeverities.get(1)}>{incidentSeverities.get(1)}</option>
          <option value={incidentSeverities.get(2)}>{incidentSeverities.get(2)}</option>
          <option value={incidentSeverities.get(3)}>{incidentSeverities.get(3)}</option>
          <option value={incidentSeverities.get(4)}>{incidentSeverities.get(4)}</option>
          <option value={incidentSeverities.get(5)}>{incidentSeverities.get(5)}</option>
        </select>
        <p/>
        <div>Enter Date and Time of Incident: *</div>
        <input
          type='datetime-local'
          value={this.state.incident_datetime}
          name='incident_datetime'
          onChange={this.myChangeHandler}
        />
        <p/>
        <div/>
          Enter additional text description(optional):
        <div/>
        <label>
          <textarea 
            value={this.state.incident_text} 
            name='incident_text'
            onChange={this.myChangeHandler} 
          />
        </label>
        <p/>
        <input type="submit" value="Submit" />
        <p style={{color: this.state.input_color}}> {this.state.input_status} </p>
      </form>
    );
  }
}



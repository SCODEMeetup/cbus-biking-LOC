import React from 'react';
import './FormView.css';
import { BIKING_REPORTS_URL } from '../../services/CbusBikingLocService.js';
import { postReport } from '../../services/CbusBikingLocService.js';
import { incidentTypes, incidentSeverities, formMessages, errorMessages } from './FormViewUserMessages';
import { CLICK_MAP, COMPLETE_FORM, SUBMIT_SUCCESS } from './FormViewUserMessages';
import { validateReport } from './ReportValidation';
import { datetimeValue } from '../../lib/DateUtils.js'

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
      incident_datetime: datetimeValue(),
      incident_text: '',
      input_status: '',
      input_color: '',
      response_status: '',
      response_status_text: '',
      form_tip_text: formMessages.get(CLICK_MAP),
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
        form_tip_text: formMessages.get(COMPLETE_FORM), 
        input_status: '',
        incident_type: incidentTypes.get(1),
        incident_severity: incidentSeverities.get(1),
        incident_datetime: datetimeValue(),
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
    let report = this.createReport();
    event.preventDefault();
    let errorCode = validateReport(report);
    if (!errorCode) {
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
          if (this.state.response_status !== 201)
            throw Error(`${this.state.response_status_text} ${data}`);
        })
        .catch(error => {
          this.setSubmitMessage("red", `${error}` );
        });
    }
    else
      this.setSubmitMessage("red", errorMessages.get(errorCode));
  }

  restoreFormMsg() {
    this.props.handleReportPostedChange(true);
    this.setSubmitMessage("green", formMessages.get(SUBMIT_SUCCESS));
    this.setState({form_tip_text: formMessages.get(CLICK_MAP)});
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

  refreshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div id="form">
      <form onSubmit={this.handleSubmit}>
        <h5>Bike Safety Incident Report</h5>
        <div className={this.state.form_tip_text_class}>{this.state.form_tip_text}</div>
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
        <div>Incident Type *</div>
        <select value={this.state.incident_type} onChange={this.myChangeHandler} name='incident_type'>
          <option value={incidentTypes.get(1)}>{incidentTypes.get(1)}</option>
          <option value={incidentTypes.get(2)}>{incidentTypes.get(2)}</option>
          <option value={incidentTypes.get(3)}>{incidentTypes.get(3)}</option>
          <option value={incidentTypes.get(4)}>{incidentTypes.get(4)}</option>
        </select>
        <p/>
        <div>Incident Severity *</div>
        <select value={this.state.incident_severity} onChange={this.myChangeHandler} name='incident_severity'>
          <option value={incidentSeverities.get(1)}>{incidentSeverities.get(1)}</option>
          <option value={incidentSeverities.get(2)}>{incidentSeverities.get(2)}</option>
          <option value={incidentSeverities.get(3)}>{incidentSeverities.get(3)}</option>
          <option value={incidentSeverities.get(4)}>{incidentSeverities.get(4)}</option>
          <option value={incidentSeverities.get(5)}>{incidentSeverities.get(5)}</option>
        </select>
        <p/>
        <div>Date and Time of Incident: *</div>
        <input
          type='datetime-local'
          value={this.state.incident_datetime}
          placeholder={this.state.incident_datetime}
          name='incident_datetime'
          onChange={this.myChangeHandler}
        />
        <p/>
        <div/>
          Text description:
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
        {'\u00A0'}{'\u00A0'}
        <input 
          type="button" 
          value="Refresh"
          onClick={this.refreshPage}
        />
        <p style={{color: this.state.input_color}}> {this.state.input_status} </p>
      </form>
      </div>
    );
  }
}



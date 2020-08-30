import React from 'react';
import './App.css';
import ReportList from '../views/reports/ReportList';

export default class App extends React.Component {

  render() {
    return (
      <div className="report-list-container col-sm-3">
        <ReportList></ReportList>
      </div>
    );
  }
};

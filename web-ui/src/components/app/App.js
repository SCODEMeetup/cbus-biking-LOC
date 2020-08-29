import React from 'react';
import './App.css';
import ReportList from '../views/reports/ReportList';

export default class App extends React.Component {

  render() {
    return (
      <div className="app-container">
        <div className="report-list-container">
          <ReportList></ReportList>
        </div>
      </div>
    );
  }
};

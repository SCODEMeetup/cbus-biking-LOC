import React from 'react';
import './ReportList.css';

export default class ReportList extends React.Component {

    render() {
        const data = [
          {
            "id": 1,
            "lat": 39.9846,
            "long": -82.9192,
            "reason": "crash",
            "created_at": "2020-08-08T22:02:29.014Z",
            "updated_at": "2020-08-08T22:02:29.014Z"
          },
          {
            "id": 2,
            "lat": 39.958,
            "long": -82.9735,
            "reason": "road conditions",
            "created_at": "2020-08-08T22:02:29.020Z",
            "updated_at": "2020-08-08T22:02:29.020Z"
          },
          {
            "id": 3,
            "lat": 39.8618,
            "long": -83.1702,
            "reason": "traffic",
            "created_at": "2020-08-08T22:02:29.025Z",
            "updated_at": "2020-08-08T22:02:29.025Z"
          },
          {
            "id": 4,
            "lat": 39.9202,
            "long": -82.8321,
            "reason": "construction",
            "created_at": "2020-08-08T22:02:29.037Z",
            "updated_at": "2020-08-08T22:02:29.037Z"
          },
          {
            "id": 5,
            "lat": 39.9311,
            "long": -82.9646,
            "reason": "safety",
            "created_at": "2020-08-08T22:02:29.044Z",
            "updated_at": "2020-08-08T22:02:29.044Z"
          }
        ];
        return (
            <ul className="report-list">
                {
                    data.map((d) => 
                        <li key={d.id} className="report-item">
                            <strong>{d.reason.charAt(0).toUpperCase() + d.reason.slice(1)}</strong>: {d.lat.toFixed(2) + '/' + d.long.toFixed(2)}
                        </li>
                    )
                }
            </ul>
        );
    }
};
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


export default class ReportList extends React.Component {

  renderReport(report, styles) {
    const reason = report.reason.charAt(0).toUpperCase() + report.reason.slice(1);
    const lat = report.lat.toFixed(2);
    const long = report.long.toFixed(2);
    return (<Text style={styles}>{reason + ': ' + lat + '/' + long}</Text>);
  }

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

    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      list: {
        marginTop: 5
      },
      item: {
        fontSize: 18
      },
    });

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={(d) => this.renderReport(d.item, styles.item)}
        />
      </View>
    );
  }
}
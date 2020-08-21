import React from 'react';
import ReportList from '../views/report-list';
import { View, Text } from 'react-native';

export default class ReportListContainer extends React.Component {
  render() {
    const styles= {
      container: {
        paddingTop: 20
      },
      title: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: 'bold'
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Report List</Text>
        <ReportList></ReportList>
      </View>
    );
  }
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReportListContainer from '../containers/report-list-container';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ReportListContainer></ReportListContainer>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

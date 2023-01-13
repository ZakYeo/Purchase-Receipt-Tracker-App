import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import colours from '../config/colours';

/**
   * Displays settings configurable by the user
*/
function SettingsScreen({navigation, route}) {
    return (
      <ScrollView style={styles.container}>
       <Text>SettingsScreen</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundCol
  }
});

export default SettingsScreen;
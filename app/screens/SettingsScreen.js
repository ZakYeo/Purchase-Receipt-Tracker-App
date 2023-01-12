import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

function SettingsScreen({navigation, route}) {
 
  

    return (
      <ScrollView style={styles.container}>
       <Text>SettingsScreen</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey'
  }
});

export default SettingsScreen;
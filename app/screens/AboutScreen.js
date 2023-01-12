import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

function AboutScreen({navigation, route}) {
 
  

    return (
      <ScrollView style={styles.container}>
       <Text>About</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey'
  }
});

export default AboutScreen;
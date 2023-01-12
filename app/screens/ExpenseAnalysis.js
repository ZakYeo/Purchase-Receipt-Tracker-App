import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import colours from '../config/colours';
function ExpenseAnalysis({navigation, route}) {
 
  

    return (
      <ScrollView style={styles.container}>
       <Text>Expense Analysis</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundCol
  }
});

export default ExpenseAnalysis;
import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import colours from '../config/colours';

/**
   * Displays analytical details of the receipts
*/
function ExpenseAnalysis() {

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
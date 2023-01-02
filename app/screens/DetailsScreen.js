import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import ReceiptCamera from '../components/ReceiptCamera';


function DetailsScreen( {route} ) {
 
    return (
        <View style={styles.container}>
          <ReceiptCamera />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1
  }
  });

export default DetailsScreen;
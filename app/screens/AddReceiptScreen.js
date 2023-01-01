import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ReceiptForm from '../components/ReceiptForm';
function AddReceiptScreen({navigation, data}) {

    return (
      <View style={styles.container}>
        <ReceiptForm />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 , 
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black"
  }
});

export default AddReceiptScreen;
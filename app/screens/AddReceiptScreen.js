import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ReceiptForm from '../components/ReceiptForm';

import { useIsFocused } from '@react-navigation/native';
function AddReceiptScreen({navigation, route}) {

  
  if(route.params === undefined){
    route.params = {};
    route.params.recpInfo = {};
  }

  const isFocused = useIsFocused(); 


    return (
      <View style={styles.container}>
        { isFocused && <ReceiptForm navigation={navigation} recpInfo={route.params.recpInfo}/>}
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
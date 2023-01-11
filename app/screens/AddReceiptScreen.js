import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ReceiptForm from '../components/ReceiptForm';

import { useIsFocused } from '@react-navigation/native';
function AddReceiptScreen({navigation, route}) {

  
  if(route.params === undefined){
    route.params = {};
    route.params.recpInfo = {};
    route.params.edit = false;
  }

  const isFocused = useIsFocused(); 
  

    return (
      <ScrollView style={styles.container}>
        { isFocused && <ReceiptForm navigation={navigation} recpInfo={route.params.recpInfo} edit={route.params.edit}/>}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey'
  }
});

export default AddReceiptScreen;
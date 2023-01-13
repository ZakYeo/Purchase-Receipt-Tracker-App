import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ReceiptForm from '../components/ReceiptForm';

/**
   * Pop-up Dialog to show detailed information about a receipt
   * Shows info such as receipt name, location name, etc.
   * Has options to edit and delete the receipt
   * @param {Object} route      Holds parameters passed from screens
   * @param {Object} navigation Used to navigate between screens.    
   * @return                    Returns the ReceiptForm component wrapped in a scrollView
*/
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReceiptCamera from '../components/ReceiptCamera';
import { useIsFocused } from '@react-navigation/native';


function CameraScreen( {navigation} ) {

  // Fixes a bug where the camera doesn't load in certain situations:
  const isFocused = useIsFocused(); 
 
    return (
        <View style={styles.container}>
          { isFocused && <ReceiptCamera navigation={navigation}/> }
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

export default CameraScreen;
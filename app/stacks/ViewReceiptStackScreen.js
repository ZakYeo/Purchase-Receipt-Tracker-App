import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colours from '../config/colours';
import CameraScreen from '../screens/CameraScreen';
import ViewReceiptScreen from '../screens/ViewReceiptScreen';
import constants from '../config/constants';
import AddReceiptScreen from '../screens/AddReceiptScreen';

function ViewReceiptStackScreen() {

  const ViewStack = createNativeStackNavigator();
  
  return (
    <ViewStack.Navigator>
      <ViewStack.Screen name="ViewReceipt"
      options={({ navigation }) => ({
        title: "My Receipts",
        headerTintColor: colours.tertiaryCol,
        headerStyle: {backgroundColor: colours.primaryCol}
      })}
      >
        {(props) => <ViewReceiptScreen {...props}></ViewReceiptScreen> }
      </ViewStack.Screen>
      <ViewStack.Screen name="Camera" 
        options={({ route }) => ({ 
          title: "Camera Add",
          headerStyle: {backgroundColor: colours.primaryCol},
          headerTintColor: colours.tertiaryCol 
        })}>
          {(props) => <CameraScreen {...props}></CameraScreen> }
      </ViewStack.Screen>
        <ViewStack.Screen name="Add" component={AddReceiptScreen} 
        options={({ route }) => ({ 
          title: route.params.title,
          headerStyle: {backgroundColor: colours.primaryCol},
          headerTintColor: colours.tertiaryCol 
        })}/>
    </ViewStack.Navigator>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 30, 
    height: 30, 
    marginRight: 15
  },
  bgPrimary: {
    backgroundColor: colours.primaryCol
  }
});

export default ViewReceiptStackScreen;
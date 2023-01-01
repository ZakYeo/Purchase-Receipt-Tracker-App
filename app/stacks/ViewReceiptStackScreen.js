import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colours from '../config/colours';
import DetailsScreen from '../screens/DetailsScreen';
import ViewReceiptScreen from '../screens/ViewReceiptScreen';
import constants from '../config/constants';


function ViewReceiptStackScreen() {

  const ViewStack = createNativeStackNavigator();
  
  return (
    <ViewStack.Navigator>
      <ViewStack.Screen name="ViewReceipt"
      options={({ navigation }) => ({
        title: constants.list_title,
        headerTintColor: colours.tertiaryCol,
        headerStyle: {backgroundColor: colours.primaryCol}
      })}
      >
        {(props) => <ViewReceiptScreen {...props}></ViewReceiptScreen> }
      </ViewStack.Screen>
      <ViewStack.Screen name="DiscoverDetails" component={DetailsScreen} 
        options={({ route }) => ({ 
          title: route.params.item.title,
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
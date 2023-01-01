import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../config/colours';
import constants from '../config/constants';
import DetailsScreen from '../screens/DetailsScreen';
import AddReceiptScreen from '../screens/AddReceiptScreen';


export default function AddReceiptStackScreen() {
  
    const AddStack = createNativeStackNavigator();
  
    return (
      <AddStack.Navigator>
        <AddStack.Screen name="AddReceipt"
        options={({ navigation }) => ({
          title: constants.map_title,
          headerTintColor: colours.tertiaryCol,
          headerStyle: {backgroundColor: colours.primaryCol}
        })}
        >
          {(props) => <AddReceiptScreen {...props}></AddReceiptScreen> }
        </AddStack.Screen>
        <AddStack.Screen name="DetailsScreen" component={DetailsScreen} 
        options={({ route }) => ({ title: route.params.item.title,
          headerStyle: {backgroundColor: colours.primaryCol},
          headerTintColor: colours.tertiaryCol })}/>
      </AddStack.Navigator>
    );
  }
  
const styles = StyleSheet.create({
  logo: {
    width: 30, 
    height: 30, 
    marginRight: 15
  }
  });
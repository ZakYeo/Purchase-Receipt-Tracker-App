
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddReceiptStackScreen from './AddReceiptStackScreen.js';
import ViewReceiptStackScreen from './ViewReceiptStackScreen.js';
import colours from '../config/colours';
import constants from '../config/constants.js';


export default function MainNavigationStack(){

    const Tab = createNativeStackNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarActiveTintColor: colours.secondaryCol,
            tabBarInactiveTintColor: colours.tertiaryCol,
            headerShown: false,
            tabBarStyle: {backgroundColor: colours.primaryCol}
          })}>
            <Tab.Screen name={constants.nav_list}>
          {(props) => <ViewReceiptStackScreen {...props} /> }
          </Tab.Screen>

        </Tab.Navigator>
    )
}
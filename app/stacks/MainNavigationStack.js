
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddReceiptStackScreen from './AddReceiptStackScreen.js';
import ViewReceiptStackScreen from './ViewReceiptStackScreen.js';
import colours from '../config/colours';
import constants from '../config/constants.js';


export default function MainNavigationStack(){

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Add') {
                iconName = focused
                  ? 'create'
                  : 'create-outline';
              } else if (route.name === 'View') {
                iconName = focused ? 'receipt' : 'receipt-outline';
              }
  

              return (<Ionicons name={iconName} size={size} color={color} />);
            },
            tabBarActiveTintColor: colours.secondaryCol,
            tabBarInactiveTintColor: colours.tertiaryCol,
            headerShown: false,
            tabBarStyle: {backgroundColor: colours.primaryCol}
          })}>
          <Tab.Screen name={constants.nav_map}>
            {(props) => <AddReceiptStackScreen {...props} /> }
          </Tab.Screen>
          <Tab.Screen name={constants.nav_list}>
          {(props) => <ViewReceiptStackScreen {...props} /> }
          </Tab.Screen>
        </Tab.Navigator>
    )
}
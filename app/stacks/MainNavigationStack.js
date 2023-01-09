
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
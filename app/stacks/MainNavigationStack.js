
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewReceiptStackScreen from './ViewReceiptStackScreen.js';
import colours from '../config/colours';
import constants from '../config/constants.js';
import CustomDrawer from '../components/CustomDrawer.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
export default function MainNavigationStack(){

    const Stack = createNativeStackNavigator();
    

    return (
        <Stack.Navigator 
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {backgroundColor: colours.headerCol}
          })}>
            <Stack.Screen name={"View"}>
          {(props) => <ViewReceiptStackScreen  {...props} /> }
          </Stack.Screen>

        </Stack.Navigator>
    )
}
import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ViewReceiptScreen from '../screens/ViewReceiptScreen';
import CustomDrawerContent from '../components/CustomDrawer';
import colours from '../config/colours';
import ExpenseAnalysis from '../screens/ExpenseAnalysis';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';

/**
 * Allows for drawer navigation in the View Receipt
 */
export default function ViewReceiptsWithDrawer({props}) {
  
    const Drawer = createDrawerNavigator();
  
    return (
        <Drawer.Navigator initialRouteName="ViewReceiptDrawerScreen"
        screenOptions={{
            title: "My Receipts",
            headerTintColor: "white",
            headerStyle: {backgroundColor: colours.headerCol}
          }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen {...props} name="ViewReceiptDrawerScreen" component={ViewReceiptScreen}/>
            <Drawer.Screen {...props} 
            options={{
                title: "Expense Analysis"
              }}
            name="ExpenseAnalysisScreen" component={ExpenseAnalysis}/>
            <Drawer.Screen {...props} 
            options={{
                title: "About"
              }}
            name="AboutScreen" component={AboutScreen}/>
            <Drawer.Screen {...props} 
            options={{
                title: "Settings"
              }}
            name="SettingsScreen" component={SettingsScreen}/>
        </Drawer.Navigator>
      
    );
  }
  
const styles = StyleSheet.create({
  logo: {
    width: 30, 
    height: 30, 
    marginRight: 15
  }
  });
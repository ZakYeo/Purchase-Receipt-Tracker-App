import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import MainNavigationStack from './app/stacks/MainNavigationStack';


import ViewReceiptStackScreen from './app/stacks/ViewReceiptStackScreen';


export default function App() {
  
  const db = SQLite.openDatabase('receipts.db');
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists receipts (id integer primary key not null, receipt_name text, category text, total_cost text, total_tax text, location_name text, location_address text, date text, base64 text);'
      );
    });
    
  return (
    <NavigationContainer>
      <MainNavigationStack/>
    </NavigationContainer>
  );
}

//TODO
/*

CODE COMMENTS + DOCSTRINGS
CONSTANTS.JS + COLOURS.JS FILE????
Drawer NAvigation account page
  Expense Analysis
  About
  Settings

check app with no perms
Error handling when bad response from API
Edit receipt -> Fix  photo changing

search receipts? filter receipts?
three dots in top corner -> compact vs verbose? duplicate / delete?

Notifications based on location? (in settings page?)



Settings?:
  Crop / Edit photos when choosing from library
  context-based notifications
  permission sliders for media and camera?
  
*/
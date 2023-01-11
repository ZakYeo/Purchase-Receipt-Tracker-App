import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import MainNavigationStack from './app/stacks/MainNavigationStack';


export default function App() {

  const db = SQLite.openDatabase('test4.db');
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
Manual Add -> tap to add photo
Receipt Details page
React native paper date picker
Notifications based on location? (in settings page?)

Settings:
  Crop / Edit photos when choosing from library
  context-based notifications
  permission sliders for media and camera?
  
*/
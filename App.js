import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import MainNavigationStack from './app/stacks/MainNavigationStack';

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
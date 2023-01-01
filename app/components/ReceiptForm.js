import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, button } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';



function ReceiptForm(){

    const [storeName, setStoreName] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
  
    const db = SQLite.openDatabase('test.db');
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists receipts (id integer primary key not null, store_name text, purchase_date text, total_amount text);'
      );
    });
  
    const insertReceipt = (storeName, purchaseDate, totalAmount) => {
      console.log("executing");
  
      db.transaction(tx => {
        tx.executeSql(
          'insert into receipts (store_name, purchase_date, total_amount) values (?, ?, ?)',
          [storeName, purchaseDate, totalAmount]
        );
        tx.executeSql("select * from receipts", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      })
    };
  
    
    
    return (
      <View style={styles.container}>
        <TextInput
          label="Store name"
          value={storeName}
          onChangeText={setStoreName}
        />
        <TextInput
          mode="flat"
          label="Purchase date"
          value={purchaseDate}
          onChangeText={setPurchaseDate}
        />
        <TextInput
          label="Total amount"
          value={totalAmount}
          onChangeText={setTotalAmount}
        />
        <Button
        style={{backgroundColor: 'tomato'}}
          title="Save Receipt"
          color="#841584"
          onPress={() => insertReceipt(storeName, purchaseDate, totalAmount)}
          />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  
      justifyContent: 'center',
    },
  });

export default ReceiptForm;
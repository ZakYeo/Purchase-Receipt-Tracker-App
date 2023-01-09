import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';


function ReceiptForm({navigation}){

    const [receiptName, setReceiptName] = useState("");
    const [category, setCategory] = useState("");
    const [totalCost, setTotalCost] = useState("");
    const [totalTax, setTotalTax] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [date, setDate] = useState("");

  
    const db = SQLite.openDatabase('test3.db');
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists receipts (id integer primary key not null, receipt_name text, category text, total_cost text, total_tax text, location_name text, location_address text, date text);'
      );
    });

    const saveReceipt = () => {

      db.transaction(tx => {
        tx.executeSql(
          'insert into receipts (receipt_name, category, total_cost, total_tax, location_name, location_address, date) values (?, ?, ?, ?, ?, ?, ?)',
          [receiptName, category, totalCost, totalTax, locationName, locationAddress, date]
        );
        tx.executeSql("select * from receipts", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
        navigation.navigate("ViewReceipt");
        
      })
      
    };

    
    
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <View style={styles.maininfo}>
            <TextInput
              style={styles.mainTextInput}
              placeholder="Receipt Name"
              value={receiptName}
              onChangeText={setReceiptName}
            />
            <TextInput
              style={styles.mainTextInput}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
            />
          </View>
          <View style={{flex: 1.1, borderWidth: 1, marginLeft: 10, marginRight: 10}} />
        </View>
        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
          <TextInput
                style={{marginTop: 30, width: '49%', borderWidth: 1,padding: 5}}
                placeholder="Total Cost"
                value={totalCost}
                onChangeText={setTotalCost}
              />
          <TextInput
              style={{marginTop: 30, width: '49%', borderWidth: 1,padding: 5}}
              placeholder="Total Tax"
              value={totalTax}
              onChangeText={setTotalTax}
            />
          </View>
          <View>
            <TextInput 
               style={{marginTop: 30, borderWidth: 1,padding: 5}}
               placeholder="Location Name"
               value={locationName}
               onChangeText={setLocationName}
            />
            <TextInput 
               style={{marginTop: 20, borderWidth: 1,padding: 5}}
               placeholder="Location Address"
               value={locationAddress}
               onChangeText={setLocationAddress}
            />
            <TextInput 
               style={{marginTop: 20, borderWidth: 1,padding: 5}}
               placeholder="Date"
               value={date}
               onChangeText={setDate}
            />
          </View>
          <View style={{paddingTop: 25}}>
            <Button icon="check" mode="contained" onPress={() => saveReceipt()}>
              Save Receipt
            </Button>
          </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15
    },
    maininfo: {
      flex: 1.2

    },
    mainTextInput: {
      marginTop: 15,
      marginBottom: 15,
      padding: 5,
      borderWidth: 1
    },
    textInput: {
      marginTop: 25,
    }
  });

export default ReceiptForm;
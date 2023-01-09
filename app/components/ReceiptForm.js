import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import InsertReceipt from '../../InsertReceipt';


function ReceiptForm({
                      navigation, 
                      receiptInfo={}}){


    const [receiptName, setReceiptName] = useState(receiptInfo.merchant);
    const [category, setCategory] = useState("");
    const [totalCost, setTotalCost] = useState(receiptInfo.total_amount);
    const [totalTax, setTotalTax] = useState(receiptInfo.tax_amount);
    const [locationName, setLocationName] = useState(receiptInfo.merchant);
    const [locationAddress, setLocationAddress] = useState(receiptInfo.merchant_address);
    const [date, setDate] = useState(receiptInfo.date);
    const [base64, setBase64] = useState(receiptInfo.img);

  
    const db = SQLite.openDatabase('test4.db');
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists receipts (id integer primary key not null, receipt_name text, category text, total_cost text, total_tax text, location_name text, location_address text, date text, base64 text);'
      );
    });

    const saveReceipt = () => {
      InsertReceipt({db, receiptName, category, totalCost, totalTax, locationName, locationAddress, date, base64});
      navigation.navigate("ViewReceipt");
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
          {base64 ? 
                    <Image
                      source={{ uri: `data:image/png;base64,${base64}`}}
                      style={{flex: 1.1, borderWidth: 3, marginLeft: 10, marginRight: 10}}
                    />
                  : <View style={{flex: 1.1, borderWidth: 1, marginLeft: 10, marginRight: 10}} />}
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
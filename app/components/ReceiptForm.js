import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Image } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { Camera } from "expo-camera";
import InsertReceipt from '../functions/InsertReceipt'
import EditReceipt from '../functions/EditReceipt';


function ReceiptForm({
                      navigation, 
                      recpInfo={},
                    edit}){

    const [receiptName, setReceiptName] = useState(recpInfo.receipt_name);
    const [category, setCategory] = useState("");
    const [totalCost, setTotalCost] = useState(recpInfo.total_cost);
    const [totalTax, setTotalTax] = useState(recpInfo.total_tax);
    const [locationName, setLocationName] = useState(recpInfo.location_name);
    const [locationAddress, setLocationAddress] = useState(recpInfo.location_address);
    const [date, setDate] = useState(recpInfo.date);
    const [base64, setBase64] = useState(recpInfo.base64);

    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    const db = SQLite.openDatabase('test4.db');

    const saveReceipt = () => {
      if(edit){
        // Update receipt
        let id = recpInfo.id;
        EditReceipt({db, receiptName, category, totalCost, totalTax, locationName, locationAddress, date, base64, id})

      }else{
        // Insert receipt
        InsertReceipt({db, receiptName, category, totalCost, totalTax, locationName, locationAddress, date, base64});
      }
      
      navigation.navigate("ViewReceipt");
    };

    const openCamera = async () => {
      if (!permission.granted) {
        // Camera permissions are not granted yet
        requestPermission();
        
      }

      if(permission){
        navigation.navigate("Camera");
      }

    }

    
    
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: "row", flex: 1}}>
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
                  : <View style={{flex: 1, borderWidth: 1}} >
                      <TouchableRipple
                        onPress={() => openCamera()}
                        rippleColor="rgba(0, 0, 0, .32)"
                      >
                        <Image
                          source={require('../assets/no_photo.jpg')}
                          style={{width: '100%', height: '100%'}} 
                        />
                      </TouchableRipple>
                    </View>}
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
      flex: 1

    },
    mainTextInput: {
      marginTop: 15,
      marginBottom: 15,
      marginRight: 5,
      padding: 5,
      borderWidth: 1,
    },
    textInput: {
      marginTop: 25,
    }
  });

export default ReceiptForm;
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Image, Dimensions } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { Camera } from "expo-camera";
import DateTimePicker from '@react-native-community/datetimepicker';
import InsertReceipt from '../functions/InsertReceipt'
import EditReceipt from '../functions/EditReceipt';


function ReceiptForm({
                      navigation, 
                      recpInfo={},
                    edit}){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const [receiptName, setReceiptName] = useState(recpInfo.receipt_name);
    const [category, setCategory] = useState("");
    const [totalCost, setTotalCost] = useState(recpInfo.total_cost);
    const [totalTax, setTotalTax] = useState(recpInfo.total_tax);
    const [locationName, setLocationName] = useState(recpInfo.location_name);
    const [locationAddress, setLocationAddress] = useState(recpInfo.location_address);
    const [userDate, setUserDate] = useState(recpInfo.date);
    const [base64, setBase64] = useState(recpInfo.base64);

    const [datePickerDate, setDatePickerDate] = useState(new Date());


    //const [interpretedDate, setInterpretedDate] = useState(new Date());
    /*if(recpInfo.date !== undefined){
      setInterpretedDate(new Date(recpInfo.date).toString());
    }*/

    const [showDate, setShowDate] = useState(false);

    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    const db = SQLite.openDatabase('test4.db');

    const saveReceipt = () => {
      if(edit){
        // Update receipt
        let id = recpInfo.id;
        EditReceipt({db, receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64, id})

      }else{
        // Insert receipt
        InsertReceipt({db, receiptName, category, totalCost, totalTax, locationName, locationAddress, userDate, base64});
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
    const handleDateChange = (_, datePicked) => {
      setShowDate(false);
      setDatePickerDate(new Date(datePicked));
      setUserDate(datePickerDate.toDateString());
      
    };

    
    
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row", flex: 1, height: windowHeight*0.25}}>
          <View style={{flex: 1, justifyContent: 'space-evenly', marginRight: 10}}>
            <TextInput
              style={styles.textInput}
              placeholder="Receipt Name"
              value={receiptName}
              onChangeText={setReceiptName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
            />
          </View>
          <View style={{flex: 1, borderWidth: 1}} >
            <TouchableRipple
              onPress={() => openCamera()}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              {recpInfo.base64 ? 
                <Image
                  source={{ uri: `data:image/png;base64,${base64}`}}
                  style={{width: '100%', height: '100%', resizeMode: "stretch"}}
                  resizeMode={'cover'}
                />
                : 
                  <Image
                    source={{uri: 'https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png'}}
                    style={{width: '100%', height: '100%', resizeMode:"contain"}} 
                    resizeMode={'cover'}/>
                }
            </TouchableRipple>
          </View>
        </View>
        <View style={{justifyContent: 'space-evenly', height: windowHeight*0.55}}>
          <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <TextInput
                  style={[styles.textInput,{width: '45%'}]}
                  placeholder="Total Cost"
                  value={totalCost}
                  onChangeText={setTotalCost}
                />
            <TextInput
                style={[styles.textInput,{width: '45%'}]}
                placeholder="Total Tax"
                value={totalTax}
                onChangeText={setTotalTax}
              />
          </View>
          <TextInput 
               style={styles.textInput}
               placeholder="Location Name"
               value={locationName}
               onChangeText={setLocationName}
            />
            <TextInput 
               style={styles.textInput}
               placeholder="Location Address"
               value={locationAddress}
               onChangeText={setLocationAddress}
            />
            <View>
              <TextInput 
                style={styles.textInput}
                placeholder="Date"
                value={userDate}
                onChangeText={setUserDate}
              /> 
              <Button style={{alignItems: 'flex-start'}}icon="calendar" mode="text" onPress={() => setShowDate(true)}>Tap to select date</Button>
            </View>
            {showDate ? <DateTimePicker value={datePickerDate} onChange={handleDateChange}  /> : <></>}
          
        </View>
        
        <View>
          <Button icon="check" mode="contained" onPress={() => saveReceipt()}>
            Save Receipt
          </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgrey',
      padding: 15
    },
    maininfo: {
      flex: 1

    },
    textInput: {
      borderWidth: 1,
      padding: 5
    }
  });

export default ReceiptForm;
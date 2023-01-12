import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Image, Dimensions, Text } from 'react-native';
import { Button, TouchableRipple } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { Camera } from "expo-camera";
import DateTimePicker from '@react-native-community/datetimepicker';
import InsertReceipt from '../functions/InsertReceipt'
import EditReceipt from '../functions/EditReceipt';
import colours from '../config/colours';


function ReceiptForm({
                      navigation, 
                      recpInfo={},
                    edit}){

    // Use for relative sizing based on screen size:
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
  
    const db = SQLite.openDatabase('receipts.db');

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
            <View>
              <Text style={styles.textLabel}>Receipt Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g Small Tesco Shop"
                value={receiptName}
                onChangeText={setReceiptName}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Category</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g Grocery"
                value={category}
                onChangeText={setCategory}
              />
            </View>
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
            <View style={{flex: 1}}>
              <Text style={[styles.textLabel]}>Total Cost</Text>
              <TextInput
                style={[styles.textInput,{width: '95%'}]}
                placeholder="e.g 11.00"
                value={totalCost}
                onChangeText={setTotalCost}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.textLabel]}>Total Tax</Text>
              <TextInput
                style={[styles.textInput,{width: '100%'}]}
                placeholder="e.g 1.50"
                value={totalTax}
                onChangeText={setTotalTax}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.textLabel]}>Location Name</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="e.g Tesco"
              value={locationName}
              onChangeText={setLocationName}
            />
          </View>
          <View>
            <Text style={[styles.textLabel]}>Location Address</Text>
            <TextInput 
               style={styles.textInput}
               placeholder="e.g Winton"
               value={locationAddress}
               onChangeText={setLocationAddress}
            />
          </View>
            <View>
            <Text style={[styles.textLabel]}>Date</Text>
              <TextInput 
                style={styles.textInput}
                placeholder="e.g Thu Jaun 12 2023"
                value={userDate}
                onChangeText={setUserDate}
              /> 
              <Button textColor={colours.tertiaryCol} style={{alignItems: 'flex-start'}}icon="calendar" mode="text" onPress={() => setShowDate(true)}>Tap to select date</Button>
            </View>
            {showDate ? <DateTimePicker value={datePickerDate} onChange={handleDateChange}  /> : <></>}
          
        </View>
        
        <View>
          <Button buttonColor={colours.tertiaryCol}icon="check" mode="contained" onPress={() => saveReceipt()}>
            Save Receipt
          </Button>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colours.backgroundCol,
      padding: 15
    },
    maininfo: {
      flex: 1

    },
    textInput: {
      borderWidth: 1,
      padding: 5
    },
    textLabel: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 17
    }
  });

export default ReceiptForm;
import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import key from '../config/API_key';


export default function ReceiptCamera( { navigation } ) {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [media_permission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  let camera = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const extractData = (data) => {
    let receiptInformation = {
        "total_amount": data.totalAmount.data,
        "tax_amount": data.taxAmount.data,
        "date": data.date.data,
        "merchant": data.merchantName.data,
        "merchant_address": data.merchantAddress.data,
        "items": {}
    };
    const items = data.amounts;
    let price = "";
    let itemAndQuantityStr = "";
    let itemNameStr = "";
    const quantityRegex = /\d+/;
    const currencyUnits = ["£", "$", "€"];
    
    items.forEach((item, _) => {
      price = item.data.toString(); 
      // Often the price will not have decimal places as a price should.
      if(price.length == 1){ // Check now
        // Add decimal place
        price = price + ".";
      }
      while(price.length < 4){
        // Pad price with decimal places.
        // e.g 2. turns to 2.00, 2.0 into 2.00
        price = price + "0"
      }
      // Loop through every currency
      currencyUnits.forEach((unit, _) => {
        // If the item contains the currency unit and price
        if(item.text.includes(`${unit}${price}`)){
          // Remove the price from the item name
          itemAndQuantityStr = item.text.replace(`${unit}${price}`, "");
          // Grab the quantity from the item name
          quantity = itemAndQuantityStr.match(quantityRegex)
          // Now remove the quantity from item name
          itemNameStr = itemAndQuantityStr.replace(`${quantity}`, "");

          // Check if the quantity is a null value
          if(!Object.is(quantity, null) && quantity.length > 0){
            // Typically indicates this "item" has been read incorrectly by the OCR
            // It could be "Card" or "Total" money spent instead of a singular item.
            // Not null means it's OK to add
            receiptInformation.items[itemNameStr] = parseInt(quantity[0]);
          }
        }
        
      });

    });

    navigation.navigate("ViewReceipt", {receipt_information: receiptInformation});

  }

  // OCR libraries not currently supported with Expo Go
  // See: https://expo.canny.io/feature-requests/p/support-optical-character-recognition-ocr
  // Therefore I am, for now, forced to use an external API for OCR
  extractTextFromImage = async (base64) => {
    const config = {
      headers:{
          "apikey": key,
          "content-type": "application/json"
      }
    };
    await axios.post("https://api.taggun.io/api/receipt/v1/verbose/encoded", {
          "image": base64,
          "filename": "receipt.jpg",
          "contentType":"image/jpeg"},
          config
    ).then(res => extractData(res.data))
    .catch(err => console.log(err));

  }

  const takePicture = async () => {
    if (!permission) return;
    const photo = await camera.takePictureAsync(); //
    setPreviewVisible(true);
    setCapturedImage(photo);
    
    //if (media_permission)
    //{
    // MediaLibrary.saveToLibraryAsync(photo.uri);
    //}
    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`,{
      encoding: FileSystem.EncodingType.Base64,
    })
    await extractTextFromImage(imageBase64);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
        <Button onPress={requestMediaPermission} title="grant media permission" />
      </View>
    );
  }

  if (previewVisible && capturedImage) {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={{
            uri: capturedImage.uri,
          }}
          style={{
            flex: 1,
          }}
        />
        <Button onPress={() => setPreviewVisible(false)} title="Close" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ width: "100%", height: "100%" }}
        type={type}
        ref={(ref) => {
          camera = ref;
        }}
      >
        <View style={styles.cameraView}>
          <View style={styles.menuButtons}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              style={styles.buttonView}
            >
              <Text style={{ fontSize: 20 }}>
                Flip Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.buttonView}
            >
              <Text style={{ fontSize: 20 }}>
                Take Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraView: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  menuButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonView: {
    flex: 1,
    height: 50,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  }
});

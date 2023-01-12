import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button
} from "react-native";
import { Camera, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator, MD2Colors,IconButton, MD3Colors } from "react-native-paper";
import ExtractTextFromImage from "../functions/ExtractTextFromImage";
import ExtractData from "../functions/ExtractData";

export default function ReceiptCamera( { navigation } ) {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [media_permission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState(FlashMode.off);
  const toggleFlash = () => {
    if(flash == FlashMode.on){
      setFlash(FlashMode.off);
    }else{
      setFlash(FlashMode.on);
    }
  }

  

  let camera = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);


  const takePicture = async () => {
    if (!permission) return;
    const photo = await camera.takePictureAsync(); //
    setPreviewVisible(true);
    setCapturedImage(photo);
    setLoading(true);
    
    //if (media_permission)
    //{
    // MediaLibrary.saveToLibraryAsync(photo.uri);
    //}
    const imageBase64 = await FileSystem.readAsStringAsync(`${photo.uri}`,{
      encoding: FileSystem.EncodingType.Base64,
    })
    let resp = await ExtractTextFromImage(imageBase64);
    if(resp === "error"){
      //Error has occurred
      console.log("A networking error has occurred. Check API Key or try again later.");
      navigation.navigate("ViewReceipt");
    }else{
      navigation.navigate("Add", {title: "Create Receipt",recpInfo: ExtractData(resp.data, imageBase64)});
    }
    
    setPreviewVisible(false);
    setCapturedImage(null);
    setLoading(false);
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
        >
        <ActivityIndicator animating={loading} style={{height: '100%'}}size={60} color={MD2Colors.red800} />
        </ImageBackground>
        
        <Button onPress={() => setPreviewVisible(false)} title="Cancel" />
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
        flashMode={flash}
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
            >
              <IconButton
                icon="camera-switch"
                iconColor={"white"}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
            >
              <IconButton
                icon="camera"
                iconColor={"white"}
                size={50}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleFlash}
            >
              <IconButton
                icon={flash == FlashMode.on ? "flash-alert" : "flash"}
                iconColor={"white"}
                size={30}
              />
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
    justifyContent: "flex-end",
  },
  menuButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20
  },
  buttonView: {
    flex: 1,
    height: 50,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  }
});

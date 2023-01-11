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
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import ExtractTextFromImage from '../../ExtractTextFromImage';
import ExtractData from '../../ExtractData';


export default function ReceiptCamera( { navigation } ) {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [media_permission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const [loading, setLoading] = useState(false);

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
    navigation.navigate("Add", {recpInfo: ExtractData(resp.data, imageBase64)});
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

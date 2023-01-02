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


// OCR libraries not currently supported with Expo Go
// See: https://expo.canny.io/feature-requests/p/support-optical-character-recognition-ocr
// Therefore I am, for now, forced to use an external API for OCR

export default function ReceiptCamera() {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [media_permission, requestMediaPermission] = MediaLibrary.usePermissions();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  let camera = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (!permission) return;
    const photo = await camera.takePictureAsync();
    console.log(
      "finished taking photo here's the photo",
      photo
    );
    setPreviewVisible(true);
    setCapturedImage(photo);
    
    if (media_permission)
    {
     MediaLibrary.saveToLibraryAsync(photo.uri);
    }
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
    console.log(capturedImage);
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


import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { Camera } from "expo-camera";

import pickImageAsync from '../functions/PickImageAsync';
import ExtractTextFromImage from '../functions/ExtractTextFromImage';
import ExtractData from '../functions/ExtractData';

import colours from '../config/colours';



/**
   * Custom FABGroup from react-native-paper
   * Stays in the bottom-right corner of the screen. 
   * Press to open for animation and navigation options
   * <Portal> used to make FABGroup appear above other components
   * @param {Function} onToggleSnackBar  Function to toggle visibility of the snackbar
   * @param {Object} navigation           Used to navigate between screens.    
   * @return                              Returns the FABGroup component wrapped in a Portal
   * 
   * @link https://callstack.github.io/react-native-paper/fab-group.html
*/
const FABGroup = ( {navigation, onToggleSnackBar } ) => {
  const [state, setState] = React.useState({ open: false });

  const [permission, requestPermission] = Camera.useCameraPermissions();
  

  const onStateChange = ({ open }) => setState({ open });
  

  const { open } = state;  

  const chooseReceiptFromLibrary = async () => {
    // Open image picker
    const img = await pickImageAsync();

    if(img == null){
      // No image chosen
      onToggleSnackBar();
    }else{
      // Image chosen. Extract text and display in new screen
      let resp = await ExtractTextFromImage(img.base64);
      navigation.navigate("Add", {title: "Create Receipt",recpInfo: ExtractData(resp.data, img.base64)});
    }
  };

  const checkPermissionsBeforeCamera = async () => {
    if(!permission.granted){
      //Ask for permission before opening camera
      await requestPermission();
    }

    if(permission.granted){
      navigation.navigate("Camera")      
    }
  }


  
  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          fabStyle={{backgroundColor: colours.tertiaryCol}}
          color={"black"}
          icon={open ? 'close' : 'plus'}
          actions={[
            { 
              icon: 'pencil-plus', 
              label: 'Add Receipt [Manual]',
              color: "black",
              style: {backgroundColor: colours.tertiaryCol},
              onPress: () => navigation.navigate("Add", {title: "Create Receipt"}) },
            {
              icon: 'camera-plus',
              label: 'Add Receipt [Camera]',
              color: "black",
              style: {backgroundColor: colours.tertiaryCol},
              onPress: async () => await checkPermissionsBeforeCamera(),
            },
            {
              icon: 'image-plus',
              label: 'Choose Receipt [Library]',
              color: "black",
              style: {backgroundColor: colours.tertiaryCol},
              onPress: () => chooseReceiptFromLibrary(),
            }
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
  );
};

export default FABGroup;
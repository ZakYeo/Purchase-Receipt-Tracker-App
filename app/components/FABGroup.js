
import React from 'react';
import { Snackbar, FAB, Portal } from 'react-native-paper';
import pickImageAsync from '../functions/PickImageAsync';
import ExtractTextFromImage from '../functions/ExtractTextFromImage';
import ExtractData from '../functions/ExtractData';
import colours from '../config/colours';
const FABGroup = ( {navigation, onToggleSnackBar } ) => {
  const [state, setState] = React.useState({ open: false });
  

  const onStateChange = ({ open }) => setState({ open });
  

  const { open } = state;  

  const chooseReceiptFromLibrary = async () => {
    const img = await pickImageAsync();

    if(img == null){
      onToggleSnackBar();
    }else{
      let resp = await ExtractTextFromImage(img.base64);
      navigation.navigate("Add", {title: "Create Receipt",recpInfo: ExtractData(resp.data, img.base64)});
    }
  };


  
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
              onPress: () => navigation.navigate("Camera"),
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
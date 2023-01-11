
import React from 'react';
import { Modal, FAB, Portal } from 'react-native-paper';
import pickImageAsync from '../../PickImageAsync';
import ExtractTextFromImage from '../../ExtractTextFromImage';
import ExtractData from '../../ExtractData';
const FABGroup = ( {navigation } ) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;  

  const chooseReceiptFromLibrary = async () => {
    const img = await pickImageAsync();

    if(img == null){
      console.log("No image chosen.");
    }else{
      let resp = await ExtractTextFromImage(img.base64);
      navigation.navigate("Add", {recpInfo: ExtractData(resp.data, img.base64)});
    }
  };


  
  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            { 
              icon: 'pencil-plus', 
              label: 'Add Receipt [Manual]',
              onPress: () => navigation.navigate("Add") },
            {
              icon: 'camera-plus',
              label: 'Add Receipt [Camera]',
              onPress: () => navigation.navigate("Camera"),
            },
            {
              icon: 'image-plus',
              label: 'Choose Receipt [Library]',
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
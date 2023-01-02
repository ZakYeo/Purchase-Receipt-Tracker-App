
import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import pickImageAsync from '../../PickImageAsync';

const FABGroup = ( {navigation} ) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  

  

  //TODO
  // Add camera screen
  // Add Receipt [Manual] button sends to AddReceiptScreen
  // Receipt Details Screen?

  
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
              onPress: () => console.log('Pressed add') },
            {
              icon: 'camera-plus',
              label: 'Add Receipt [Camera]',
              onPress: () => navigation.navigate("Camera"),
            },
            {
              icon: 'image-plus',
              label: 'Choose Receipt [Library]',
              onPress: () => pickImageAsync(),
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
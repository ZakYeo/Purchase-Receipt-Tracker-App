
import React from 'react';
import { FAB, Portal } from 'react-native-paper';


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
              icon: 'pencil', 
              label: 'Add Receipt [Manual]',
              onPress: () => console.log('Pressed add') },
            {
              icon: 'camera',
              label: 'Add Receipt [Camera]',
              onPress: () => navigation.navigate("Camera"),
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

import React from 'react';
import { FAB, Portal } from 'react-native-paper';


const FABGroup = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  
  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'receipt' : 'plus'}
          actions={[
            { 
              icon: 'plus', 
              label: 'Add Receipt [Manual]',
              onPress: () => console.log('Pressed add') },
            {
              icon: 'camera',
              label: 'Add Receipt [Camera]',
              onPress: () => console.log('Pressed star'),
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
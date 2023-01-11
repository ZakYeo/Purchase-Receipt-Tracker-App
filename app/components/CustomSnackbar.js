

import { Snackbar, Portal } from 'react-native-paper';

const CustomSnackbar = ( {msg, visible, onDismissSnackBar} ) => {

    return (
        <Portal>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                label: 'Dismiss',
                }}>
                {msg}
            </Snackbar>
          </Portal>
    )

}

export default CustomSnackbar;


import { Snackbar, Portal } from 'react-native-paper';

/**
   * Simple Snackbar from react-native-paper to display a custom message
   * @param {String}   msg                The message to display
   * @param {Boolean}  visible           State variable to represent snackbar visibility
   * @param {Function} onDismissSnackBar Function once called hides visibility of the snackbar
   * @return                             Returns the Custom Snackbar
*/
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
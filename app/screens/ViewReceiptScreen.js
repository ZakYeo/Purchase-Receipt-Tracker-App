import React, { memo } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-native-paper';

import ReceiptList from '../components/ReceiptList';
import FABGroup from '../components/FABGroup';
import CustomSnackbar from '../components/CustomSnackbar';
import CustomDialog from '../components/CustomDialog';

import colours from '../config/colours';

//Memo for a performance boost (no unnecessary rerenders)
const CustomDlgMemo = memo(CustomDialog);

/**
   * Main screen holds the receipt list
   * From here you can navigate using the drawer, or FABGroup
   * You can press a list item for a detailed popup
   * You can also see a snackbar if using the imagepicker and don't choose an image
   * @param {Object} navigation Used to navigate between screens.  
*/
export default function ViewReceiptScreen( {navigation} ) {

  // Pop-up Snackbar State
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  // Pop-up Dialog State
  const [dlgVisible, setDlgVisible] = React.useState(false);

  const [dlgContent, setDlgContent] = React.useState({});
  const showDialog = () => setDlgVisible(true);
  const hideDialog = () => setDlgVisible(false);

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <CustomSnackbar msg={"No photo selected."} visible={visible} onDismissSnackBar={onDismissSnackBar}/>
        <FABGroup navigation={navigation} onToggleSnackBar={onToggleSnackBar}/>
        <ReceiptList setDlgContent={setDlgContent} showDialog={showDialog} />
        <CustomDlgMemo dlgVisible={dlgVisible} hideDialog={hideDialog} dlgContent={dlgContent} navigation={navigation}/>
      </SafeAreaView>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundCol,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black"
  },
  tinyLogo: {
    width: 50,
    height: 50,
  }
});
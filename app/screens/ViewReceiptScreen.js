import React from 'react';
import { StyleSheet, SafeAreaView, Image, Text } from 'react-native';
import ReceiptList from '../components/ReceiptList';
import colours from '../config/colours';
import { Provider, Dialog, Button} from 'react-native-paper';
import FABGroup from '../components/FABGroup';

import CustomSnackbar from '../components/CustomSnackbar';
import CustomDialog from '../components/CustomDialog';
export default function ViewReceiptScreen( {navigation, route} ) {

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
        <CustomDialog dlgVisible={dlgVisible} hideDialog={hideDialog} dlgContent={dlgContent} navigation={navigation}/>
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
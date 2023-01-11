import {Dialog, Button} from 'react-native-paper';
import { Text, Image, StyleSheet, View, ScrollView } from 'react-native';
import DeleteReceipt from '../functions/DeleteReceipt';
import * as SQLite from 'expo-sqlite';
const CustomDialog = ({dlgVisible, hideDialog, dlgContent, navigation}) => {

    const handleDelete = () => {
        const db = SQLite.openDatabase('test4.db');
        let id = dlgContent.id;
        DeleteReceipt({db, id});
        hideDialog();
    };
    

    return (
        <Dialog visible={dlgVisible} onDismiss={hideDialog} >
            <Dialog.Title>{dlgContent.receipt_name}</Dialog.Title>
            <Dialog.Content style={{height: '50%'}}>
                <ScrollView>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                        <Text style={{fontSize: 18}}>Total Cost</Text>
                        <Text style={{fontSize: 18}}>£{dlgContent.total_cost}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                        <Text style={{fontSize: 18}}>Total Tax</Text>
                        <Text style={{fontSize: 18}}>£{dlgContent.total_tax}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                        <Text style={{fontSize: 18}}>Category</Text>
                        <Text style={{fontSize: 18}}>{dlgContent.category}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                        <Text style={{fontSize: 18}}>{dlgContent.location_name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                        <Text style={{fontSize: 18}}>{dlgContent.location_address}</Text>
                    </View>
                    <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    {dlgContent.base64 ? <Image
                      source={{ uri: `data:image/png;base64,${dlgContent.base64}`}}
                      style={styles.recpImg}
                    /> : <></>}
                        </View>
                </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
              <Button onPress={() => navigation.navigate("Add", {recpInfo: dlgContent, edit: true})}>Edit</Button> 
              <Button onPress={() => handleDelete()}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
    )
}

const styles = StyleSheet.create({

    recpImg: {
      width: '100%',
      height: 300,
    }
  });

export default CustomDialog;
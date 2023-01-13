import React, { useState } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

/**
   * Renders a list of receipts from the SQLite database
   * Will render a message saying to add receipts if none are found.
   * Displays a custom receipt information dialog if an individiual list item is pressed
   * @param {Function} setDlgContent State variable to set the content of the receipt information dialog  
   * @param {Function} showDialog    State variable to show or hide the receipt information dialog
   * @return                         Returns a View a flat list or text
*/
function ReceiptList( { setDlgContent, showDialog } ){

    const [receipts, setReceipts] = useState("");

    const db = SQLite.openDatabase('receipts.db');

    const getReceipts = () => {
         // Grab receipts
        db.transaction(tx => {
          tx.executeSql(
            'select id,location_address,location_name,receipt_name,total_cost,total_tax,category,date from receipts',
            [],
            (_, { rows: { _array } }) => setReceipts(_array)
          );
        });
      };

    const getBase64 = async (item) => {
      // First grab base64 of this receipt
      db.transaction(tx => {
          tx.executeSql(
            'select base64 from receipts WHERE id=?',
            [item.id],
            (_, { rows: { _array } }) => handleDlg(item, _array[0].base64)
          );
        })
    };
    const handleDlg = (item, base64) => {
      // Now set base64 and handle dialog
      item.base64 = base64;
      setDlgContent(item);
      showDialog();
    }

    getReceipts();

    return (
      <View>
        {receipts == "" ? 
          <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "grey", fontStyle: 'italic'}}>Add a receipt to get started</Text>
          </View> : 
          <FlatList
            data={receipts}
            removeClippedSubviews={true}
            renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => getBase64(item)}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                <List.Item
                    title={item.receipt_name}
                    description={item.date}
                    left={props => <List.Icon {...props} icon="receipt" />}
                />
                </TouchableRipple>
                
            )}
            keyExtractor={item => item.id.toString()}
          />
        }
        </View>
    )
}

const styles = StyleSheet.create({
});

export default ReceiptList;
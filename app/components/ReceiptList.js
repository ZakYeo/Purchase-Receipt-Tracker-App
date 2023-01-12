import React, { useState } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { List, TouchableRipple } from 'react-native-paper';


function ReceiptList( { setDlgContent, showDialog } ){

    const [receipts, setReceipts] = useState("");

    const db = SQLite.openDatabase('receipts.db');

    const getReceipts = () => {
        db.transaction(tx => {
          tx.executeSql(
            'select id,location_address,location_name,receipt_name,total_cost,total_tax,category,date from receipts',
            [],
            (_, { rows: { _array } }) => setReceipts(_array)
          );
        });
      };

    const handleDlg = async (item) => {
      db.transaction(tx => {
          tx.executeSql(
            'select base64 from receipts WHERE id=?',
            [item.id],
            (_, { rows: { _array } }) => handleDlg2(item, _array[0].base64)
          );
        })
      
    };
    const handleDlg2 = (item, base64) => {
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
                  onPress={() => handleDlg(item)}
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
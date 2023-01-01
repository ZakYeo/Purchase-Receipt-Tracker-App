import React, { useState, useEffect } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { List, TouchableRipple, FAB, Portal, Provider } from 'react-native-paper';


function ReceiptList(){

    const [receipts, setReceipts] = useState("");
    const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

    const db = SQLite.openDatabase('test.db');

    const getReceipts = () => {
        db.transaction(tx => {
          tx.executeSql(
            'select * from receipts',
            [],
            (_, { rows: { _array } }) => setReceipts(_array)
          );
        });
      };

    getReceipts();

    return (
      <>
      <View>
        <FlatList
            data={receipts}
            renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => console.log('Pressed')}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                <List.Item
                    title={item.store_name}
                    description={item.purchase_date}
                    left={props => <List.Icon {...props} icon="receipt" />}
                />
                </TouchableRipple>
                
            )}
            keyExtractor={item => item.id.toString()}
        />
        
        </View>
        </>
    )
}

const styles = StyleSheet.create({
});

export default ReceiptList;
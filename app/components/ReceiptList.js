import React, { useState } from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { List, TouchableRipple } from 'react-native-paper';


function ReceiptList( { navigation } ){

    const [receipts, setReceipts] = useState("");

    const db = SQLite.openDatabase('test4.db');

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
                  onPress={() => navigation.navigate("Details", {store_name: item.store_name})}
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
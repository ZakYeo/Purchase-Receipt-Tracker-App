import React from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text } from 'react-native';
import ReceiptList from '../components/ReceiptList';
import colours from '../config/colours';
import { List, TouchableRipple, FAB, Portal, Provider } from 'react-native-paper';
import FABGroup from '../components/FABGroup';
export default function ViewReceiptScreen( {navigation, data} ) {

    return (
      <Provider>
        <SafeAreaView style={styles.container}>
          <FABGroup navigation={navigation} />
          <ReceiptList />
        </SafeAreaView>
      </Provider>
    );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.secondaryCol,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black"
  }
});
import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import ReceiptCamera from '../components/ReceiptCamera';


function ReceiptDetailsScreen( {route} ) {

    const example = {
        "store_name": "Tesco",
        "purchase_date": "02/01/2023",
        "total_amount": "£500.00",
        "note": ""
    }
 
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', paddingBottom: 50, paddingTop: 20}}>
                <Text style={{fontSize: 50}}>{example.store_name}</Text>
            </View>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 15}}>
                    <Text style={{fontSize: 20}}>Total Cost:</Text>
                    <Text style={{fontSize: 20}}>{example.total_amount}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20}}>Date:</Text>
                    <Text style={{fontSize: 20}}>{example.purchase_date}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingLeft: 20,
    paddingRight: 20
    
  }
  });

export default ReceiptDetailsScreen;
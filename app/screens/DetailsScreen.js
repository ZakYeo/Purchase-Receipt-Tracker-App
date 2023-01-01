import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';



function DetailsScreen( {route} ) {
 
    return (
        <View style={styles.container}>
          <Text>Hi</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1
  }
  });

export default DetailsScreen;
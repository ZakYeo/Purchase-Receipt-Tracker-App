import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { IconButton } from 'react-native-paper';

import colours from '../config/colours';

/**
   * Displays information about Receipt Ranger
*/
function AboutScreen() {
  return(
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <IconButton
            icon="receipt"
            iconColor={colours.tertiaryCol}
            size={200}
        />
        <Text style={{fontSize: 30, textDecorationLine: 'underline', paddingBottom: 20}}>Receipt Ranger</Text>
        <Text>Receipt Ranger is a mobile app written in React Native. Track any kind of expense or receipt easily via manual, camera, or library inputs. With this app, keeping track of your expenses and receipts has never been easier, and thanks to the optical character recognition features it's very easy to track receipts on-the-go!</Text>
      </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.backgroundCol
    
  }
});

export default AboutScreen;
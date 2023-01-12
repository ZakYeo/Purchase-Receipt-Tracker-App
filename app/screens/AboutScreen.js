import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import colours from '../config/colours';
import { IconButton, MD3Colors } from 'react-native-paper';
function AboutScreen({navigation, route}) {
 
  

    return (
      <ScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>
        <IconButton
            icon="receipt"
            iconColor={colours.tertiaryCol}
            size={200}
            onPress={() => console.log('Pressed')}
          />
          <Text style={{fontSize: 30, textDecorationLine: 'underline', paddingBottom: 20}}>Receipt Ranger</Text>
          <Text>Receipt Ranger is a mobile app written in React Native for the sole purpose of ...</Text>
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
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    useDrawerProgress
} from '@react-navigation/drawer';
import { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import {Avatar, Drawer} from 'react-native-paper';
import colours from '../config/colours';
import {Animated, interpolate } from 'react-native-reanimated';
export default function CustomDrawer({navigation}) {

    // Use for relative sizing based on screen size:
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const [active, setActive] = useState("first");

    const handleTransition = (act, screen) => {
        setActive(act);
        navigation.navigate(screen);
    }


    return (
            <>
                <View style={{backgroundColor: colours.headerCol, height: windowHeight*0.25, justifyContent: 'flex-end', marginBottom: 5}}>
                    <View style={{marginLeft: windowWidth*0.05}}>
                        <Avatar.Text style={{marginBottom: 10}} size={75} label="?" />
                        <Text style={{marginBottom: 10, fontStyle: 'italic'}}>You Are Not Logged In</Text>
                    </View>
                </View>
                <Drawer.Section>
                <Drawer.Item
                    label="My Receipts"
                    icon="receipt"
                    active={active === 'first'}
                    onPress={() => handleTransition("first", "ViewReceiptDrawerScreen")}
                />
                <Drawer.Item
                    label="Expense Analysis"
                    icon="finance"
                    active={active === 'second'}
                    onPress={() => handleTransition("second", "ExpenseAnalysisScreen")}
                />
                </Drawer.Section>
                <Drawer.Section>
                <Drawer.Item
                    label="About"
                    icon="information"
                    active={active === 'third'}
                    onPress={() => handleTransition("third", "AboutScreen")}
                />
                <Drawer.Item
                    label="Settings"
                    icon="cog"
                    active={active === 'fourth'}
                    onPress={() => handleTransition("fourth", "SettingsScreen")}
                />
                </Drawer.Section>
            </>
        
    );
}
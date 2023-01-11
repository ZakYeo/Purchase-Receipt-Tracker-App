
import * as ImagePicker from 'expo-image-picker';

export default async function pickImageAsync (){
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        base64: true,
        quality: 1,
    });

    if (!result.cancelled) {
        return result;
    } else {
        return null;
    }
};
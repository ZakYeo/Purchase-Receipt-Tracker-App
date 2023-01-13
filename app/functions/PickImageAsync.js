
import * as ImagePicker from 'expo-image-picker';

/**
   * Uses expo-image-picker to let the user choose an image from their camera roll
   * @return Object of the image chosen OR null if nothing chosen
*/
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
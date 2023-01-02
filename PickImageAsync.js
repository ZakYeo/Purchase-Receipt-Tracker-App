
import * as ImagePicker from 'expo-image-picker';

export default async function pickImageAsync (){
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
    });

    if (!result.cancelled) {
        console.log(result);
    } else {
        alert('You did not select any image.');
    }
};
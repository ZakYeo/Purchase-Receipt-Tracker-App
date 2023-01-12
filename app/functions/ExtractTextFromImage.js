import axios from "axios";
import key from '../config/API_key';


// OCR libraries not currently supported with Expo Go
// See: https://expo.canny.io/feature-requests/p/support-optical-character-recognition-ocr
// Therefore I am, for now, forced to use an external API for OCR
export default ExtractTextFromImage = async (base64) => {
    let resp = "";
    const config = {
        headers:{
            "apikey": key.key,
            "content-type": "application/json"
        }
    };
    await axios.post("https://api.taggun.io/api/receipt/v1/verbose/encoded", {
            "image": base64,
            "filename": "receipt.jpg",
            "contentType":"image/jpeg"},
            config
    ).then(res => resp = res)
    .catch(err => resp = "error");

    return resp;
}
import axios from "axios";
import key from '../config/API_key';

/**
   * Calls the taggun API with the given image in base64 format
   * Taggun API uses optical character recognition and natural language processing
   * OCR libraries not currently supported with Expo Go
   * Therefore I am, for now, forced to use an external API for OCR
   * @param {String}  base64  Base64 of image to extract information from
   * @return                  Axios response of the response OR "error" if error occurred
   * 
   * @link https://expo.canny.io/feature-requests/p/support-optical-character-recognition-ocr
*/
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
    .catch(_ => resp = "error");
    return resp;
}
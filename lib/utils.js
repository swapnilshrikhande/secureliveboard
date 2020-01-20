import Sha256 from "./Sha256.js"

function digestMessage(message) {
    try {

        let hashMessage = Sha256.hash(message);
        console.log('HashMessage=',hashMessage);
        return hashMessage;
        // const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        // const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        // const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        // const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        // return hashHex;
    } catch(exception){
        console.log("Crypto not supported!");
    }
}

export default digestMessage
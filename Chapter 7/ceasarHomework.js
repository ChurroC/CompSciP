function encryptOrDecrypt(encryptOrDecrypt, message, key){
    const message=message.toLowerCase().split("")

    encryptedMessage=""
    for (let i=0; i<message.length; i++){
        if ((/[a-z]/).test(message[i])){
            message[i]=message[i].charCodeAt()
            if (encryptOrDecrypt){
                message[i]=parseInt(message[i])+parseInt(key)
                if (message[i]>122){
                    message[i]=message[i]-26
                }
            }
            else{
                message[i]=parseInt(message[i])-parseInt(key)
                if (message[i]<97){
                    message[i]=message[i]+26
                }
            }
            message[i]=String.fromCharCode(message[i])
        }
        encryptedMessage+=message[i]
    }
    document.getElementById("output").value=encryptedMessage
}
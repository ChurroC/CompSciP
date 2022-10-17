function val(c){
    if (c >= '0'.charCodeAt() &&
        c <= '9'.charCodeAt())
        return (c - '0'.charCodeAt());
    else
        return (c - 'A'.charCodeAt() + 10);
}

// Javascript program to convert a number from any base to decimal To return value of a char. For example, 2 is returned for '2'. 10 is returned for 'A', 11 for 'B'
function toBaseNumbers(binaryNumber){
    //If the number is between 48 and 57 which is 0 and 7 in ASCII
    if (binaryNumber >= '0'.charCodeAt() && binaryNumber <= '9'.charCodeAt()){
        //if (binaryNumber.charCodeAt()>=48 && binaryNumber.charCodeAt()<=57)
        //This makes it to the number returns between 0-9
        return (binaryNumber-'0'.charCodeAt())
        //return (binaryNumber-48)
    }
    else{
        return (binaryNumber-'A'.charCodeAt() + 10)
        //return (binaryNumber-65 + 10)
    }
}
// Function to convert a number from given base 'b' to decimal
function toDecimal(str, base){
    let len = str.length;
    // Initialize
    // power of base
    let power = 1;
    // Initialize result
    let num = 0;
    let i;
    // Decimal equivalent is
    // str[len-1]*1 + str[len-2] *
    // base + str[len-3]*(base^2) + ...
    for(i = len - 1; i >= 0; i--)
    {
        // A digit in input number
        // must be less than
        // number's base
        if (val(str[i].charCodeAt()) >= base)
        {
            document.write("Invalid Number");
            return -1;
        }
        num += val(str[i].charCodeAt()) * power;
        power = power * base;
    }
    return num;
}








//https://www.geeksforgeeks.org/convert-base-decimal-vice-versa/
// Javascript program to convert a number from any base to decimal
// To return value of a char. For example, 2 is returned for '2'. 10 is returned for 'A', 11 for 'B'
function numberstoBaseNumbers(binaryNumber){
    //If the number is between 48 and 57 which is 0 and 7 in ASCII
    if (binaryNumber >= '0'.charCodeAt() && binaryNumber <= '9'.charCodeAt()){
        //if (binaryNumber.charCodeAt()>=48 && binaryNumber.charCodeAt()<=57)
        //This makes it to the number returns between 0-9
        return (binaryNumber-'0'.charCodeAt())
        //return (binaryNumber-48)
    }
    else{
        return (binaryNumber-'A'.charCodeAt() + 10)
        //return (binaryNumber-65 + 10)
    }
}
// Function to convert a number from given base 'b' to decimal
function toDecimal(str, base){
    let len = str.length;
    // Initialize power of base
    let power = 1;
    // Initialize result
    let num = 0;
    let i;
    // Decimal equivalent is str[len-1]*1 + str[len-2] * base + str[len-3]*(base^2) + ...
    for(i = len - 1; i >= 0; i--){
        // A digit in input number must be less than number's base
        if (val(str[i].charCodeAt()) >= base)
        {
            document.write("Invalid Number");
            return -1;
        }
        num += val(str[i].charCodeAt()) * power;
        power = power * base;
    }
    return num;
}
// Javascript Program to convert decimal to any given base
// To return char for a value. For example '2' is returned for 2. 'A' is returned for 10. 'B' for 11
function baseNumberToNumbers(num){
    if (num >= 0 && num <= 9)
        return String.fromCharCode(num + 48);
    else
        return String.fromCharCode(num - 10 + 65);
} 
// Function to convert a given decimal number to a base
function fromDecimal(base, inputNum) {
    let s = "";
    // Convert input number is given base by repeatedly dividing it by base and taking remainder
    while (inputNum > 0)
    {
        s += reVal(inputNum % base);
        inputNum = parseInt(inputNum / base, 10);
    }
    let res = s.split('');
    // Reverse the result
    res.reverse();
    return res.join("");
}



















function convertIntToRGB(input){
    input=String(input).split(",")

    if (input.length!==3){
        console.log("You must have 3 number seperated by 2 commas.")
    }
    else{
        for (var i=0; i<input.length; i++){
            var curLetter=parseFloat(input[i])
            if (0>curLetter || curLetter>255){
                console.log("You can only have a digit between 1-255 within each comma.")
            }
            else{
                hexString=changeBg(input[0], input[1], input[2])
                console.log("The rgb-value of this color is rgb("+input[0]+", "+input[1]+", "+input[2]+") and the hex-value of this color is "+hexString+".")
                return "("+input[0]+", "+input[1]+", "+input[2]+")"
            }
        }
    }
}

function changeBg(redHex, greenHex, blueHex){
    wordRedHex=decToHex(-redHex+255)
    redHex=decToHex(redHex)
    wordGreenHex=decToHex(-greenHex+255)
    greenHex=decToHex(greenHex)
    wordBlueHex=decToHex(-blueHex+255)
    blueHex=decToHex(blueHex)
    var hexString="#"+redHex+greenHex+blueHex;
    var wordHexString="#"+wordRedHex+wordGreenHex+wordBlueHex;
    console.log(hexString)
    console.log(wordHexString)
    document.body.style.background = hexString;
    document.body.style.color = wordHexString;
    return hexString
}
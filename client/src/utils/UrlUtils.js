const aes256 = require("aes256");
const base64 = require("base-64");
const { key, passphrase } = require("../config/config").base;
let { codeExample } = require("../config/config").examples;

// Function to generate shareable URL with encryption of code
module.exports.generateURL = (data) => {
  var urlContent = `?title=${data.title}&lang=${data.lang}&style=${
    data.syntaxStyle
  }&isProtected=false&code=${base64.encode(aes256.encrypt(key, data.code))}`;
  return urlContent;
};
// to generate  encrypted code
module.exports.generateEncryptedCode = (code) => {
  return base64.encode(aes256.encrypt(key, code));
};

// Function to generate password protected shareable URL with encryption of code
module.exports.generateURLwithPass = (data, pass) => {
  var urlContent = `?title=${data.title}&lang=${data.lang}&style=${
    data.syntaxStyle
  }&isProtected=true&code=${base64.encode(
    aes256.encrypt(
      pass,
      base64.encode(aes256.encrypt(key, data.code)) + passphrase
    )
  )}`;
  return urlContent;
};
// Function to decrypt code from URL
module.exports.decodeURL = (input, pass, isPassCorrectHandler) => {
  if (input) {
    if (pass) {
      try {
        // console.log("encryptedcode: ", input);
        // console.log("password: ", pass);
        const base64Decode = base64.decode(input);
        // console.log(base64Decode);
        const aes256Decode = aes256.decrypt(pass, base64Decode);
        // console.log(aes256Decode);
        const aes256DecodeWithoutPassphrase = aes256Decode.slice(0, -12);
        // console.log(aes256DecodeWithoutPassphrase);
        const base64Decode2 = base64.decode(aes256DecodeWithoutPassphrase);
        // console.log(base64Decode2);
        if (aes256Decode.slice(-12) !== passphrase) {
          isPassCorrectHandler(false);
          return codeExample;
        } else {
          isPassCorrectHandler(true);
          return aes256.decrypt(key, base64Decode2);
        }
        // console.log(aes256.decrypt(pass || key, base64.decode(input)));
      } catch (e) {
        isPassCorrectHandler(false);
        return codeExample;
      }
    } else {
      try {
        return aes256.decrypt(key, base64.decode(input));
      } catch (e) {
        console.log(e);
        return codeExample;
      }
    }
  } else return "";
};

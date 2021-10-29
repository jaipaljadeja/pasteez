const aes256 = require("aes256");
const base64 = require("base-64");
const { key, passphrase } = require("../config/config").base;

module.exports.generateURL = (data) => {
  var urlContent = `?title=${data.title}&lang=${data.lang}&style=${
    data.syntaxStyle
  }&code=${base64.encode(aes256.encrypt(key, data.code))}`;
  return urlContent;
};

module.exports.generateURLwithPass = (input, pass) =>
  base64.encode(
    aes256.encrypt(key, base64.encode(aes256.encrypt(pass, input)) + passphrase)
  );

module.exports.decodeURL = (input, pass) => {
  if (input) {
    try {
      return aes256.decrypt(pass || key, base64.decode(input));
    } catch (e) {
      return "";
    }
  } else return "";
};

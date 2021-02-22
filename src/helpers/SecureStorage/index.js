/* eslint-disable no-param-reassign */
import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";

const SECURESTORAGE_SECRET_KEY = process.env.REACT_APP_SECURESTORAGE_SECRET_KEY;

const secureStorage = new SecureStorage(sessionStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECURESTORAGE_SECRET_KEY);

        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECURESTORAGE_SECRET_KEY);

        data = data.toString();

        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECURESTORAGE_SECRET_KEY);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
    }
});

export default secureStorage;

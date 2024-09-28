import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  if (!encryptedData) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const getSessionUserData = () => {
  const encryptedData = sessionStorage.getItem("user_data");
  if (!encryptedData) {
    return null;
  }
  const userData = decryptData(encryptedData);
  return userData;
};
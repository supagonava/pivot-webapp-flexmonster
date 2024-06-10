/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const toThaiDateString = (date: Date) => {
  date.setTime(date.getTime() + 7 * 60 * 60 * 1000);
  const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม.', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

  const year = date.getFullYear() + 543;
  const month = monthNames[date.getMonth()];
  const numOfDay = date.getDate();

  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();
  // const second = date.getSeconds().toString();

  return `${numOfDay} ${month} ${year} ` + `เวลา ` + `${hour} นาฬิกา ${minutes} นาที`;
};

import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
export const encryptWithAES = (text, passphrase) => {
  return AES.encrypt(text, passphrase).toString();
};

export const decryptWithAES = (ciphertext, passphrase) => {
  const bytes = AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};

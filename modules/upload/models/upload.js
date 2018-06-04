'use strict';

const Promise = require('promise');
const fs = require('fs');
const webp = require('webp-converter');
const sprintf = require('sprintf-js').sprintf;

exports.uploadFile = async (fileName, file) => {
  // return fileName;
  fileName = await this.saveInJpg(fileName, file);
  await this.convertJpgToWebp(fileName);
  await this.deleteFile(fileName);
  return Promise.resolve(fileName);
};

exports.saveInJpg = (fileName, file) => {
  return new Promise((resolve, reject) => {
    console.log("1");
    let originalFileName = fileName;
    let fileCounter = 1;
    while (fs.existsSync(`public/uploads/${fileName}.webp`)){
      fileName = sprintf("%s(%d)", originalFileName, fileCounter++);
    }
    fs.writeFileSync(`public/uploads/${fileName}.jpg`, new Buffer(file.data));
    resolve(fileName);
  })
};

exports.deleteFile = (fileName) => {
  return new Promise((resolve, reject)=> {
    fs.unlink(`public/uploads/${fileName}.jpg`, function (err) {
      if (err) {
        console.log(err);
        reject(err);
      };
      resolve("JPG FILE DELETED");
    });
  })
  // return fs.unlink(`public/uploads/${file}`, function (err) {
  //   if (err) {
  //     return console.log(err);
  //     // reject(err);
  //   };
  //   console.log('jpg file deleted!');
  // });
};

exports.convertJpgToWebp = (fileName) => {
  return new Promise((resolve, reject)=> {
    webp.cwebp(`public/uploads/${fileName}.jpg`,`public/uploads/${fileName}.webp`,"-q 80",function(status)
    {
      //if exicuted successfully status will be '100'
      //if exicuted unsuccessfully status will be '101'
      console.log(status);
      resolve("CONVERTED");
    });
  })

  // return webp.cwebp(`public/uploads/${jpgImage}`,`public/uploads/${fileName}.webp`,"-q 80",function(status)
  // {
  //   //if exicuted successfully status will be '100'
  //   //if exicuted unsuccessfully status will be '101'
  //   // console.log(status);
  // });
};

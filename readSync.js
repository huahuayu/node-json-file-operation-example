"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("person.json");
let personObj = JSON.parse(rawdata);
let rawdataString = rawdata.toString();
console.log(rawdata); // data buffer
console.log(rawdataString); // data buffer to string
console.log(personObj); // javascript object
console.log(personObj.hobby); // javascript object element

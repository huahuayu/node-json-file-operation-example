"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("person.json");
let person = JSON.parse(rawdata);
console.log(rawdata);
console.log(person);
console.log(person.hobby);
"use strict";

const fs = require("fs");

let shiming = JSON.parse(fs.readFileSync("shiming.json"));
shiming.weight = 64;
fs.writeFileSync("new_shiming", JSON.stringify(shiming));

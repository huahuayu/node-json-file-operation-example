"use strict";

const fs = require("fs");

let person = {
  name: "shiming",
  gender: "male",
  weight: 62,
  occupation: "developer",
  hobby: ["coding", "reading", "traveling"],
  computer: { brand: "apple", model: "mac pro", system: "10.15.4" },
};

let data = JSON.stringify(person); // 单行json
// let data = JSON.stringify(person, null, 2); // 格式化json
fs.writeFile("shiming.json", data, (err) => {
  if (err) throw err;
  console.log("Data written to file");
});

console.log("This is after the write call");

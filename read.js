"use strict";

const fs = require("fs");

fs.readFile("person.json", (err, data) => {
  if (err) throw err;
  let person = JSON.parse(data);
  console.log(person);
});

console.log(person);
console.log("This is after the read call");

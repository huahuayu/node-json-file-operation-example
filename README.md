## 概述

在不同语言编写的应用程序之间交换信息的最佳方式之一是使用 JSON 格式。由于其统一性和简单性，JSON 几乎完全取代了 XML，成为软件中的标准数据交换格式，特别是在网络服务中，JSON 几乎完全取代了 XML。

鉴于 JSON 在软件应用中的广泛使用，尤其是基于 JavaScript 的应用，因此，了解如何在 Node.js 中读写 JSON 数据到文件中是非常重要的。在这篇文章中，我们将介绍如何实现这些功能。

本文的代码已放在 github: [https://github.com/huahuayu/node-json-file-operation-example](https://github.com/huahuayu/node-json-file-operation-example)

## 读 JSON 文件

首先新建一个项目目录，`node-json-file-operation-example`

然后在项目目录下创建一个 JSON 文件`person.json`，内容如下

```json
{
  "name": "shiming",
  "gender": "male",
  "weight": 62,
  "occupation": "developer",
  "hobby": ["coding", "reading", "traveling"],
  "computer": {
    "brand": "apple",
    "model": "mac pro",
    "system": "10.15.4"
  }
}
```

为了读取文件，我们可以使用 Node.js 的 `fs`模块。这个模块中有两个函数，`readFileSync` 和 `readFile` 都可以用来读取文件。区别看名字就知道，第一个是同步读，第二个为异步读。

### 同步读 - readFileSync

`readFileSync`函数以同步的方式从文件中读取数据。这个函数会阻止其余的代码执行，直到从文件中读出所有的数据。当你的程序必须先读完文件再执行后面的操作时（比如读取配置文件）这个函数特别有用。

让我们尝试使用这个函数读取我们之前创建的`person.json`文件。

在项目目录新建`readSync.js`，内容如下

```js
"use strict";

const fs = require("fs");

let rawdata = fs.readFileSync("person.json");
let person = JSON.parse(rawdata);
console.log(rawdata);
console.log(person);
console.log(person.hobby);
```

在上面的 Node.js 代码中，我们首先将 `fs` 模块加载到应用程序。接下来使用 `readFileSync` 函数，并将我们要读取的文件的相对文件路径传递给它。如果将对象 `rawdata` 打印到控制台，你会在控制台屏幕上看到十六进制数据。

在项目目录中执行`node readSync.js`的结果

```text
$ node readSync.js
<Buffer 7b 0a 20 20 22 6e 61 6d 65 22 3a 20 22 73 68 69 6d 69 6e 67 22 2c 0a 20 20 22 67 65 6e 64 65 72 22 3a 20 22 6d 61 6c 65 22 2c 0a 20 20 22 77 65 69 67 ... 177 more bytes>
{
  name: 'shiming',
  gender: 'male',
  weight: 62,
  occupation: 'developer',
  hobby: [ 'coding', 'reading', 'traveling' ],
  computer: { brand: 'apple', model: 'mac pro', system: '10.15.4' }
}
[ 'coding', 'reading', 'traveling' ]
```

`rawdata`为十六进制的数据，需要使用`JSON.parse()`函数处理后才能变为可读的内容。`JSON.parse()`的功能为将 JSON 转换为 JavaScript 对象。

### 异步读 - readFile

在 Node.js 读取 JSON 文件的另一种方法是使用 `readFile` 函数。与 `readFileSync` 函数不同，`readFile` 函数以异步的方式读取文件数据。当 `readFile` 函数被调用时，文件读取过程开始，不等文件被读取完，程序将立即执行剩余的代码。一旦文件被读取完毕，这个函数将调用指定的回调函数。这样就不会阻塞程序的执行。

在我们的例子中，`readFile` 函数需要两个参数。要读取的文件的路径和当文件被完全读取时要调用的回调函数。

下面举例说明如何使用 `readFile` 函数。

在项目目录新建`read.js`，内容如下

```js
"use strict";

const fs = require("fs");

fs.readFile("person.json", (err, data) => {
  if (err) throw err;
  let person = JSON.parse(data);
  console.log(person);
});

console.log("This is after the read call");
```

上面的代码与之前的`readSync.js`功能一样，但它是异步完成的。以下是一些不同之处：

- `(err, data) => {}`: 这是我们的回调匿名函数，在文件被完全读取后执行。

- `err`: 由于不能简单地使用异步代码的 try/catch，因此，如果出错了，函数会传入一个 `err` 对象。如果没有错误，它为`null`

- `console.log('This is after the read call')` 这句会先被打印

该代码的输出结果是这样的

```text
$ node read.js
This is after the read call
{
  name: 'shiming',
  gender: 'male',
  weight: 62,
  occupation: 'developer',
  hobby: [ 'coding', 'reading', 'traveling' ],
  computer: { brand: 'apple', model: 'mac pro', system: '10.15.4' }
}}
[ 'coding', 'reading', 'traveling' ]
```

## 写 JSON 文件

和读文件一样，写文件也分同步写`writeFileSync`和异步写`writeFile`

### 同步写 - writeFileSync

`writeFileSync`函数接受 2-3 个参数：1.文件路径，2.要写入的数据，3.可选的参数（文件编码之类）。

如果文件不存在，会为你创建一个新的文件。

如果文件存在，会覆盖写文件。

来看下例子`writeSync.js`

```js
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
fs.writeFileSync("shiming.json", data);
```

在上面的例子中，我们将 JSON 对象`person`存储到一个名为 `shiming.json`的文件中。注意，这里我们必须在保存数据之前使用 `JSON.stringify` 函数。`stringify`的作用为将一个 JavaScript 变量转换为 JSON 字符串。

默认将转换为单行 JSON 字符串。

执行上面的代码，打开`shiming.json`文件。你应该会在文件中看到以下内容。

```text
{"name":"shiming","gender":"male","weight":62,"occupation":"developer","hobby":["coding","reading","traveling"],"computer":{"brand":"apple","model":"mac pro","system":"10.15.4"}}
```

如果放开`let data = JSON.stringify(person, null, 2);`这行注释，可以将 JSON 格式化打印，看起来会更友好。

```json
{
  "name": "shiming",
  "gender": "male",
  "weight": 62,
  "occupation": "developer",
  "hobby": ["coding", "reading", "traveling"],
  "computer": { "brand": "apple", "model": "mac pro", "system": "10.15.4" }
}
```

### 异步写 - writeFile

`writeFile`函数是以异步的方式执行的，这意味着在向文件写入数据时不会被阻塞（在写大文件的时候特别有用）。而且就像之前的异步方法一样，我们需要向这个函数传递一个回调函数。

```js
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
```

以上程序的输出为

```text
This is after the write call
Data written to file
```

## 参考文档

[Reading and Writing JSON Files with Node.js](https://stackabuse.com/reading-and-writing-json-files-with-node-js/)

const inspect = require("util").inspect;
const ins = (x) => inspect(x, {depth: Infinity, colors: true});
const fetch = require("node-fetch"); // not needed in the browser or if node version is >= than18 
const WithTime = require("./with-time.js");

const withTime = new WithTime();

withTime.on('begin', (funName) => console.log('About to execute '+funName));

withTime.on('end', (funName) => console.log('Done with execution of '+funName));

withTime.on('result', (funName, data) => console.log('Function '+funName+' produced:\n'+ins(data)));
withTime.on('error', (funName, error) => console.log('Function '+funName+' error:\n'+ins(error)));

withTime.on('time', (funName, t) => console.log('Function '+funName+' took '+t+' nanoseconds'));

const readFile = (url, cb) => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      cb(null, data);
    })
    .catch(e => cb(`Buf! ${e}`));
}

withTime.execute(readFile, process.argv[2] || 'https://jsonplaceholder.typicode.com/posts/3');

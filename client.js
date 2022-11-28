const inspect = require("util").inspect;
const ins = (x) => inspect(x, {depth: Infinity, colors: true});
const fetch = require("node-fetch");
const WithTime = require("./with-time.js");

const withTime = new WithTime();

withTime.on('begin', (label) => console.log('About to execute '+label));

withTime.on('end', (label) => console.log('Done with execution of '+label));

withTime.on('result', (label, data) => console.log('Function '+label+' produced:\n'+ins(data)));
withTime.on('error', (label, error) => console.log('Function '+label+' error:\n'+ins(error)));

withTime.on('time', (label, t) => console.log('Function '+label+' took '+t+' nanoseconds'));

const readFile = (url, cb) => {
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      cb(null, data);
    })
    .catch(e => cb(`Buf! ${e}`));
}

withTime.execute(readFile, process.argv[2] || 'https://jsonplaceholder.typicode.com/posts/3');

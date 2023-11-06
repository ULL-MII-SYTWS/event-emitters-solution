// Example 2> Adapted and thanks to Sameer Buna
// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
const { EventEmitter } = require("events");

class WithTime extends EventEmitter {

  execute(asyncFunc, ...args) {
    let funName = asyncFunc.name;

    this.emit('begin', funName);
    let old = process.hrtime.bigint();
    asyncFunc(...args, (err, data) => {
      if (err) { 
        this.emit('error', funName, err); 
      } else {
        this.emit('result', funName, data);
        this.emit('time', funName, process.hrtime.bigint() - old);
        this.emit('end', funName);
      }
    });
  }

}

module.exports = WithTime;

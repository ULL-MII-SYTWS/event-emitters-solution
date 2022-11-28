// Example 2> Adapted and thanks to Sameer Buna
// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/
const { EventEmitter } = require("events");

class WithTime extends EventEmitter {

  // This function executes asyncFunc(...args)
  execute(asyncFunc, ...args) {
    let label = asyncFunc.name;

    this.emit('begin', label);
    let old = process.hrtime.bigint();
    asyncFunc(...args, (err, data) => {
      if (err) { 
        this.emit('error', label, err); 
      } else {
        this.emit('result', label, data);
        this.emit('time', label, process.hrtime.bigint() - old);
        this.emit('end', label);
      }
    });
  }

}

module.exports = WithTime;

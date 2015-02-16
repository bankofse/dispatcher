"use strict";

function spawn (generator) {
    var log = console.log;
    log("spawn called")
    return new Promise((accept, reject) => {
        var onResult = lastPromiseResult => {
            log("onResult: " + lastPromiseResult);
            let res = generator.next(lastPromiseResult);
            console.log(res);
            var value = res.value;
            var done = res.done;
            if (!done) {
                value.then(onResult, reject);
            }
            else accept(value);
        };
        onResult();
    });
}

module.exports = spawn;

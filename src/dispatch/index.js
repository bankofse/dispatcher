'use strict';

var process  = require('process'),
    kafka    = require('kafka-node'),
    Client   = kafka.Client,
    Producer = kafka.Producer,
    Consumer = kafka.Consumer,
    spawn    = require('./task')
;

class Dispatcher {
    constructor() {
        let zkNode = 'cluster1.student.rit.edu:49153';
        console.log("Connecting to ZK node: " + zkNode);
        this.client = new Client(zkNode);
        this.producer = new Producer(this.client);
        this.producer.on('ready', () => {
            console.log('ready')
        });
    }

}

class TransactionDispatcher extends Dispatcher {

    sendTransaction () {
        return new Promise((accept, reject) => {
            var trans = {
                    transaction: (new Date()).toISOString(),
                    amount: 50.0,
                    toAccount: 2132564,
                    fromAccount: 2135843
                }

            var payloads = [
                {
                    topic: 'transaction',
                    messages: trans,
                    partition: 0,
                    attributes: 0
                }
            ];
            this.producer.send(payloads, function (err, data) {
                accept();
                console.log("Sent transaction");
            });
        });
    }

}

module.exports = {
    TransactionDispatcher : TransactionDispatcher
}

// producer.on('ready', () => {
//     console.log("Producer ready");
//     console.dir(producer);

//     setInterval(function () {

//         var trans = {
//                     transaction: (new Date()).toISOString(),
//                     amount: 50.0,
//                     toAccount: 2132564,
//                     fromAccount: 2135843
//                 }

//         var payloads = [
//             {
//                 topic: 'transaction',
//                 messages: trans,
//                 partition: 0,
//                 attributes: 0
//             }
//         ];
//         producer.send(payloads, function (err, data) {
//             console.log("Sent");
//         });

//     }, 3000);

// });

// producer.on('error', (e) => {
//     console.log("ERROR", e);
//     producer.close();
//     process.exit(1);
// });



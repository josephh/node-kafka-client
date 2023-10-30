import { KafkaClient, Consumer, Admin } from 'kafka-node'

const client = new KafkaClient({kafkaHost: 'localhost:9092'})
const admin = new Admin(client)

/** 
 * https://github.com/SOHU-Co/kafka-node/#consumerclient-payloads-options
 * Consumer(client, payloads, options)
 * 
 */
let consumer = new Consumer( 
  // consume from topic as per following options...
  client, 
  [ { topic: 'demo', partition: 0, offset: "latest" /* offset defaults to 0 */ } ], 
  { autoCommit: true, groupId: 'kafka-node-joe' }
) 

admin.listGroups((err, res) => {
  console.log('consumerGroups', res);
});

consumer.on('message', function (message) {
    console.log(message);
})
 .on('error', function (err) {
     console.log(err)
})
 .on('offsetOutOfRange', function (err) {
    // etc
})

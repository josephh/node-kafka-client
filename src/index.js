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
  { autoCommit: true, groupId: 'kafka-demo-group' }
) 

// admin.listGroups((err, res) => {
//   console.log('consumerGroups', res);
// });

consumer.on('message', function (message) {
  var key = message.key, value = message.value
  console.log(`key = ${JSON.parse(key).payload}`)
  console.log(`value :: agent = ${JSON.parse(value).payload.agent}`)
  console.log(`value :: request = ${JSON.parse(value).payload.request}\n`)
})
 .on('error', function (err) {
     console.log(err)
})
 .on('offsetOutOfRange', function (err) {
    // etc
})

var Bucket = require('../../lib/bucket');

test('123',() =>{
    Bucket.listBucket()
    console.log(`All buckets in your name have been listed.`)
}, 10000)

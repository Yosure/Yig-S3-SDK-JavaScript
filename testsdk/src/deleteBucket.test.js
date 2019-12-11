var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Delete bucket', async () =>{
    const bucketName = bucketAndObject.bucketName
    await Bucket.createbucket(bucketName)

    await Bucket.deletebucket(bucketName)
    const bucketList = await Bucket.listBucket();
    const bucketsInfo = bucketList.Buckets;
    const bucket = bucketsInfo.filter(item => item.Name === bucketName);
    expect(bucket.length).toBe(0);
    console.log(`Bucket '${bucketName}' you created have deleted.`)    
}, 10000)
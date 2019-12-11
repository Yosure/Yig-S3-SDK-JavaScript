var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Create bucket', async () =>{
    const bucketName = bucketAndObject.bucketName
    await Bucket.createbucket(bucketName)
    const bucketList = await Bucket.listBucket();
    const bucketsInfo = bucketList.Buckets;
    const bucket = bucketsInfo.filter(item => item.Name === bucketName);
    expect(bucket.length).toBe(1);
    console.log(`Bucket '${bucketName}' created successfully.`)
    await Bucket.deletebucket(bucketName)
}, 10000)
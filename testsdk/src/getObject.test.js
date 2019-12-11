var Objects = require('../../lib/object');
var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Get object', async () =>{
    const bucketName = bucketAndObject.bucketName
        const objectName = bucketAndObject.objectName
        const objectBody = bucketAndObject.objectBody

        await Bucket.createbucket(bucketName)

        await Objects.putObject(objectBody, bucketName, objectName)
        const getMsg = await Objects.getObject(bucketName, objectName)
        const eTag = getMsg.ETag
        expect(eTag).toBeTruthy()
        console.log(`Object '${objectName}' in bucket '${bucketName}' get successfully.`)
        
        await Objects.deleteObject(bucketName, objectName)
        await Bucket.deletebucket(bucketName)
}, 10000)
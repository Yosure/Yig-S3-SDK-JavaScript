var Objects = require('../../lib/object');
var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Copy object', async () =>{
    const bucketName = bucketAndObject.bucketName
        const copyBucketName = bucketAndObject.copyBucketName
        const copyObjectName = bucketAndObject.copyObjectName
        const objectBody = bucketAndObject.objectBody
        
        await Bucket.createbucket(bucketName)
        await Bucket.createbucket(copyBucketName)

        await Objects.putObject(objectBody, copyBucketName, copyObjectName)
        await Objects.copyObject(bucketName, copyBucketName, copyObjectName)

        const objectList = await Objects.listObjects(bucketName)
        const myObject = objectList.filter(item => item.Key === copyObjectName)
        expect(myObject.length).toBe(1);

        console.log(`Object '${copyObjectName}' in bucket '${copyBucketName}' copy to bucket '${bucketName}' successfully.`);

        await Objects.deleteObject(bucketName, copyObjectName)
        await Objects.deleteObject(copyBucketName, copyObjectName)
        await Bucket.deletebucket(bucketName)
        await Bucket.deletebucket(copyBucketName)
}, 10000)
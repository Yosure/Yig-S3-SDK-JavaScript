var Objects = require('../../lib/object');
var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Multipart upload object', async () =>{
    const bucketName = bucketAndObject.bucketName
    const largeObjectName = bucketAndObject.largeObjectName
    const part = bucketAndObject.part
    const buffer = bucketAndObject.buffer
    
    await Bucket.createbucket(bucketName)
    let createData = await Objects.createmultipartupload(bucketName, largeObjectName)
    let parts = new Array()
    for(let i = 1; i <= part; i++) {
        let uploadData = await Objects.uploadPart(buffer, bucketName, largeObjectName, i, createData.UploadId)
        parts[i-1] = { ETag: uploadData.ETag, PartNumber: i}
    }

    await Objects.completeMultipartUpload(bucketName, largeObjectName, createData.UploadId, parts)

    const objectList = await Objects.listObjects(bucketName)
    const myObject = objectList.filter(item => item.Key === largeObjectName)
    expect(myObject.length).toBe(1);
    
    console.log(`Object '${largeObjectName}' multipart upload to bucket '${bucketName}' successfully.`)

    await Objects.deleteObject(bucketName, largeObjectName)
    await Bucket.deletebucket(bucketName)
}, 10000)
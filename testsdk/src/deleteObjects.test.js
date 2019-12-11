var Objects = require('../../lib/object');
var Bucket = require('../../lib/bucket');
var {bucketAndObject} = require ('../../lib/s3config')

test('Delete objects', async () =>{
    const bucketName = bucketAndObject.bucketName
    const objectName = bucketAndObject.objectName
    const objectName2 = 'dev.docx'
    const objectBody = bucketAndObject.objectBody
    
    await Bucket.createbucket(bucketName)

    await Objects.putObject(objectBody, bucketName, objectName)
    await Objects.putObject(objectBody, bucketName, objectName2)

    const originObjectList = await Objects.listObjects(bucketName)
    const ojectLength = originObjectList.length

    await Objects.deleteObjects(bucketName, objectName,objectName2)
    const objectList = await Objects.listObjects(bucketName)
    expect(objectList.length).toBe(ojectLength-2);

    console.log(`Objects '${objectName}' and '${objectName2}' in bucket '${bucketName}' delete successfully.`)
    await Bucket.deletebucket(bucketName)    
}, 10000)
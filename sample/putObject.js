var Objects = require('../lib/object');
var Bucket = require('../lib/bucket');
var {bucketAndObject} = require ('../lib/s3config')

class putObjectPage {

    async putObject() {
        const bucketName = bucketAndObject.bucketName
        const objectName = bucketAndObject.objectName
        const objectBody = bucketAndObject.objectBody
        
        await Bucket.createbucket(bucketName)

        const originObjectList = await Objects.listObjects(bucketName)
        const ojectLength = originObjectList.length
        await Objects.putObject(objectBody, bucketName, objectName)
        const objectList = await Objects.listObjects(bucketName)
        expect(objectList.length).toBeGreaterThanOrEqual(ojectLength);
        const myObject = objectList.filter(item => item.Key === objectName)
        expect(myObject.length).toBe(1);
        console.log(`Object '${objectName}' put to bucket '${bucketName}' successfully.`)
        
        await Objects.deleteObject(bucketName, objectName)
        await Bucket.deletebucket(bucketName)
    }

}
module.exports = new putObjectPage();
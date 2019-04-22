var Objects = require('../lib/object');
var Bucket = require('../lib/bucket');
var {bucketAndObject} = require ('../lib/s3config')

class deleteObjectPage {

    async deleteObject() {
        const bucketName = bucketAndObject.bucketName
        const objectName = bucketAndObject.objectName
        const objectBody = bucketAndObject.objectBody
        
        await Bucket.createbucket(bucketName)

        await Objects.putObject(objectBody, bucketName, objectName)
        const originObjectList = await Objects.listObjects(bucketName)
        const ojectLength = originObjectList.length
        await Objects.deleteObject(bucketName, objectName)
        const objectList = await Objects.listObjects(bucketName)
        expect(objectList.length).toBe(ojectLength-1);
        const myObject = objectList.filter(item => item.Key === objectName)
        expect(myObject.length).toBe(0);

        console.log(`Object '${objectName} in bucket '${bucketName}' delete successfully.`)
        await Bucket.deletebucket(bucketName)
    }

}
module.exports = new deleteObjectPage();
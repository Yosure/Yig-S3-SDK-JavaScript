var Objects = require('../lib/object');
var Bucket = require('../lib/bucket');
var {bucketAndObject} = require ('../lib/s3config')

class renameObjectPage {

    async renamedObject() {
        const bucketName = bucketAndObject.bucketName
        const objectName = bucketAndObject.objectName
        const rename = bucketAndObject.rename
        const objectBody = bucketAndObject.objectBody
        await Bucket.createbucket(bucketName)
        
        await Objects.putObject(objectBody, bucketName, objectName)

        // const originObjectList = await Objects.listObjects(bucketName)
        // const ojectLength = originObjectList.length
        const data = await Objects.renameObject( bucketName, rename, objectName)
        // const startPosition = data.NextPosition
        // const data2 = await Objects.appendObject(body2, bucketName, objectName, startPosition)
        // const objectList = await Objects.listObjects(bucketName)
        // expect(Number(data2.NextPosition)).toBe(body1.length + body2.length);
        // expect(objectList.length).toBe(ojectLength+1);
        // const myObject = objectList.filter(item => item.Key === objectName)
        // expect(myObject.length).toBe(1);
        // console.log(`Object '${objectName}' append to bucket '${bucketName}' successfully.`)
        
        // await Objects.deleteObject(bucketName, objectName)
        // await Bucket.deletebucket(bucketName)
    }

}
module.exports = new renameObjectPage();
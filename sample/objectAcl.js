var Objects = require('../lib/object');
var Bucket = require('../lib/bucket');
var {bucketAndObject} = require ('../lib/s3config')

class ObjectAclPage {

    async objectAcl() {
        const bucketName = bucketAndObject.bucketName
        const objectName = bucketAndObject.objectName
        const objectBody = bucketAndObject.objectBody
        const acl = bucketAndObject.objectACL
        
        await Bucket.createbucket(bucketName)

        await Objects.putObject(objectBody, bucketName, objectName)
        await Objects.putObjectAcl(bucketName, objectName, acl)

        const grants = await Objects.getObjectAcl(bucketName, objectName)
        if(acl === 'private')
        {
            const permission = grants[0].Permission;
            expect(permission).toBe('FULL_CONTROL');
        }
        else
        {
            const permission = grants[1].Permission;
            expect(permission).toBe('READ')
        }

        console.log(`Object's ACL lifecircle is normally.`)
        
        await Objects.deleteObject(bucketName, objectName)
        await Bucket.deletebucket(bucketName)
    }

}
module.exports = new ObjectAclPage();
var Bucket = require('../lib/bucket');
var {bucketAndObject} = require ('../lib/s3config')

class bucketAclPage {

    async bucketAcl() {
        const bucketName = bucketAndObject.bucketName
        const acl = bucketAndObject.bucketACL

        await Bucket.createbucket(bucketName)
        await Bucket.putBucketAcl(bucketName, acl)

        const grants = await Bucket.getBucketAcl(bucketName);
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

        console.log(`Bucket's ACL lifecircle is normally.`)
        await Bucket.deletebucket(bucketName)
    }

}
module.exports = new bucketAclPage();
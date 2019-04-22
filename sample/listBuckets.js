var Bucket = require('../lib/bucket');

class ListBucketPage {

    async listBucket() {
        await Bucket.listBucket()
        console.log(`All buckets in your name have been listed.`)
    }

}
module.exports = new ListBucketPage();
var {s3} = require ('./s3config')

class BucketPage {
        
 createbucket(bucketname) {
    return new Promise(function (resolve, reject) {
        let params = {
            Bucket: bucketname,
        };
        s3.createBucket(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject();
            }
            else {
                resolve(data);
            }
        })
    });
}

 putBucketAcl(bucket, acl) {
    return new Promise(function (resolve, reject) {
        var params = {
            Bucket: bucket,
            ACL: acl,
           };
           s3.putBucketAcl(params, function(err, data) {
             if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
              }
             else{
                resolve(data);
             }     
           });
    })
}

 getBucketAcl(bucket) {
    return new Promise(function (resolve, reject) {
        let params = {
            Bucket: bucket
        };
        s3.getBucketAcl(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject();
            }
            else {
                resolve(data.Grants);
            }
        })
    });
}

 listBucket() {
    return new Promise(function (resolve, reject) {
        s3.listBuckets(function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject();
            }
            else {
                resolve(data);
                //console.log(data)
            }
        })
    });
}

 deletebucket(bucketname) {
    return new Promise(function (resolve, reject) {
        let params = {
            Bucket: bucketname,
        };
        s3.deleteBucket(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}
}
module.exports = new BucketPage();
var CreateBucket = require('./sample/createBucket')
var BucketACL = require('./sample/bucketAcl')
var DeleteBucket = require('./sample/deleteBucket')
var ListBucket = require('./sample/listBuckets')
var PutObject = require('./sample/putObject')
var DeleteObject = require('./sample/deleteObject')
var CopyObject = require('./sample/copyObject')
var DeleteObjects = require('./sample/deleteObjects')
var GetObject = require('./sample/getObject')
var ObjectAcl = require('./sample/objectAcl')
var MultipartUpload = require('./sample/multipartUpload')
var AppendObject = require('./sample/appendObject')
// var RenameObject = require('./sample/renameObject')

const makeRequest = async () => {
    // await ListBucket.listBucket()
    // await CreateBucket.createBucket()
    // await BucketACL.bucketAcl()
    // await DeleteBucket.deleteBucket()
    // await PutObject.putObject()
    // await DeleteObject.deleteObject()
    // await CopyObject.copyObject()
    // await DeleteObjects.deleteObjects()
    // await GetObject.getObject()
    // await ObjectAcl.objectAcl()
    // await MultipartUpload.multipartUpload()
    await AppendObject.appendObject()
    //await RenameObject.renamedObject()
}

makeRequest()
    .catch(err => {
        console.log(err);
    })




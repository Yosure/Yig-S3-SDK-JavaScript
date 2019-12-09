var AWS = require('aws-sdk');
global.expect = require('jest-matchers');

AWS.config.endpoint = 'your-endpoint',
AWS.config.region = 'your-region';
AWS.config.accessKeyId = 'your-AK';
AWS.config.secretAccessKey = 'your-SK';
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// You can configure bucket and object information here as parameters of the s3 method.
// Bucket and Object information
var bucketAndObject = {
    // Bucket information
    bucketName: 'qatest001',
    bucketACL: 'public-read', // private|public-read
    copyBucketName: 'qatestcopy',

    // Object information
    objectName: 'test_.docx',
    resourceObjectName: '',
    rename: 'rename_object',
    objectACL: 'private', // private|public-read
    objectBody: new Buffer.alloc(2.5 * 1024 * 1024),
    buffer: new Buffer.alloc(50 * 1024 * 1024),
    copyObjectName: 'testcopy.docx',
    largeObjectName: 'largeFile.txt',
    part: 5
}

module.exports = {
    s3,
    bucketAndObject
}
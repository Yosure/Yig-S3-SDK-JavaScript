var AWS = require('aws-sdk');
global.expect = require('jest-matchers');

AWS.config.endpoint = 'hehehehehehehe',
AWS.config.region = 's3.test.com';
AWS.config.accessKeyId = 'hehehe';
AWS.config.secretAccessKey = 'hehehe';
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// You can configure bucket and object information here as parameters of the s3 method.
// Bucket and Object information
var bucketAndObject = {
    // Bucket information
    bucketName: 'qatest',
    bucketACL: 'public-read', // private|public-read
    copyBucketName: 'qatestcopy',
    
    // Object information
    objectName: 'test.docx',
    objectACL: 'private', // private|public-read
    objectBody: new Buffer.alloc(2.5 * 1024 * 1024),
    buffer: new Buffer.alloc(3 * 1024 * 1024),
    copyObjectName: 'testcopy.docx',
    largeObjectName: 'largeFile.txt',
    part: 3
}

module.exports = {s3, bucketAndObject}
var {
    s3
} = require('./s3config')

class ObjectPage {

    putObject(body, bucket, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Body: body,
                Bucket: bucket,
                Key: key
            };
            s3.putObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    appendObject(body, bucket, key, position) {
        return new Promise(function (resolve, reject) {
            let params = {
                Body: body,
                Bucket: bucket,
                Key: key,
                Position: position
            };
            s3.appendObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    renameObject(bucket, key, renameSourceKey) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
                Key: key,
                RenameSourceKey: renameSourceKey
            };
            s3.renameObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    copyObject(destinationbucket, sourceBucket, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: destinationbucket,
                CopySource: `/${sourceBucket}/${key}`,
                Key: key
            };
            s3.copyObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    getObject(bucket, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
                Key: key
            };
            s3.getObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    deleteObject(bucket, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
                Key: key
            };
            s3.deleteObject(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    deleteObjects(bucket, key1, key2) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
                Delete: {
                    Objects: [{
                            Key: key1
                        },
                        {
                            Key: key2
                        }
                    ],
                    Quiet: false
                }
            };
            s3.deleteObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data);
                }
            })
        });
    }

    listObjects(bucket) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
            };
            s3.listObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data.Contents);
                }
            })
        });
    }

    getObjectAcl(bucket, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucket,
                Key: key
            };
            s3.getObjectAcl(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject();
                } else {
                    resolve(data.Grants);
                }
            })
        });
    }

    createmultipartupload(bucketname, key) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucketname,
                Key: key
            };
            s3.createMultipartUpload(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }

    uploadPart(body, bucketname, key, pNum, uploadId) {
        return new Promise(function (resolve, reject) {
            let params = {
                Body: body,
                Bucket: bucketname,
                Key: key,
                PartNumber: pNum,
                UploadId: uploadId
            };
            s3.uploadPart(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }

    listMultipartUploads(bucketname) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucketname,
            };
            s3.listMultipartUploads(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    resolve(data);
                    console.log(data);
                }
            })
        });
    }

    completeMultipartUpload(bucketname, key, uploadId, parts) {
        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: bucketname,
                Key: key,
                MultipartUpload: {
                    Parts: parts
                },
                UploadId: uploadId
            };
            s3.completeMultipartUpload(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }

    putObjectAcl(bucketname, key, acl) {
        return new Promise(function (resolve, reject) {
            var params = {
                Bucket: bucketname,
                Key: key,
                ACL: acl,
            };
            s3.putObjectAcl(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}
module.exports = new ObjectPage();
const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
    variables: {
        AWS_S3_NAME,
        AWS_S3_REGION,
        AWS_S3_ACCESS_KEY,
        AWS_S3_SECRET_KEY
    }
} = require('../config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY

});

module.exports = {
    uploadFiles: (file, itemType, itemId) => {
        const { data, mimetype, name } = file;

        const fileName = _fileNameBuilder(name, itemType, itemId.toString());

        return bucket
            .upload({
                Bucket: AWS_S3_NAME,
                Body: data,
                Key: fileName,
                ContentType: mimetype

            })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    // const  fileTypeExtension = fileName.split('.').pop();
    const fileTypeExtension = path.extname(fileName);

    return path.posix.join(itemType, itemId, `${uuid()}${fileTypeExtension}`);
}

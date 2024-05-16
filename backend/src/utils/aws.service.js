import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "eu-north-1",
});

const s3 = new AWS.S3();

export async function uploadFile(bucketName, fileName, fileContent) {
    try {
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
        };

        const result = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${result.Location}`);
        return result;
    } catch (error) {
        console.error(`Error uploading file: ${error}`);
        throw error;
    }
}

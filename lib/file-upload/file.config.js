const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3 = new S3Client({
  region: 'auto', // R2 does not require region-specific settings
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
  },
});

const s3Uploader = async (file) => {
  try {
    // Generate a unique filename
    const filename = `${Date.now()}_${file.originalname}`;
    console.log('file',file)
    // Define upload parameters
    const uploadParams = {
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME, // R2 bucket name
      Key: filename, // Filename inside the bucket
      Body: file.buffer, // File content (buffered data from multer)
      ContentType: file.mimetype, // MIME type
    };
    
   
    // Create and send the PutObjectCommand
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    // Construct and return the file URL
    const fileUrl = `https://pub-${process.env.CLOUDFLARE_BUCKET_ID}.r2.dev/${filename}`;
    return fileUrl;
  } catch (err) {
    console.error('Error uploading file to R2:', err);
    throw new Error('File upload failed');
  }
};

module.exports = {s3, s3Uploader};

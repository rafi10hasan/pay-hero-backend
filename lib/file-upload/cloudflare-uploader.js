const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3.client.config");

const s3Uploader = async (file) => {
    try {
      // Generate a unique filename
      const freshFile = file.originalname.replace(/\s+/g, '_');
      const filename = `${Date.now()}_${freshFile}`;
  
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

  module.exports = {s3Uploader}
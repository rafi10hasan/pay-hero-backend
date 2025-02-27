// // const express = require('express');
// // const app = express()
// // app.use(express.json());  // To parse JSON bodies
// // app.use(express.urlencoded({ extended: true }));
// const s3 = require("./file.config");
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// require('dotenv').config();
// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//         // Ensure files are publicly accessible if needed
//       metadata: (_req, file, cb) => {
//         cb(null, { fieldName: file.fieldname });
//       },
//       key: (_req, file, cb) => {
//         const fileName = `${Date.now()}-${file.originalname}`;
//         cb(null, fileName);
//       },
//     }),
//     fileFilter: (_req, file, cb) => {
//       // Allow only images
//       if (
//         file.mimetype === 'image/jpeg' ||
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/gif'
//       ) {
//         cb(null, true); // Accept file
//       } else {
//         cb(new Error('Only JPEG, PNG, and JPG files are allowed!'), false); // Reject file
//       }
//     },
//     limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 5 MB
//   });
//   module.exports = upload

const multer = require('multer');
const upload = multer({
  limits:{
  fileSize: 2 * 1024 * 1024
  },
  fileFilter: (_req,file,done)=>{
    console.log('file',file)
     const fileTypes = file.mimetype;
     console.log('filetypes',fileTypes)
     if(fileTypes === 'image/png' || fileTypes === 'image/jpeg' || fileTypes === 'image/jpg'){
       done(null,true)
     }
     else{
       done(new Error('invalid file type'),false)
     }
  }
})

module.exports = upload
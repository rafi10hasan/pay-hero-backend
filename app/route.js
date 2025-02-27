const router = require('express').Router();

router.get('/health',(_req,res)=>{
    res.status(200).json({message:'success'})
})

router.get("/", (_req, res) => {
    res.send("Welcome to pay Hero API server");
  });

module.exports = router
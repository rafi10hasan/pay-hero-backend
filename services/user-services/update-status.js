const User = require("../../models/user-model");


const updateStatus = async(req,res,next)=>{
    const {id} = req.params;
    const {status} = req.body
  try {
     const account = await User.findById(id);
     if(account._id){
        if(status === "block"){
            account.isVerified = false
        }
        else{
            account.isVerified = true
        }
        res.status(200).json({message:"status changed successfully"})
     }
     await account.save()
  } catch (error) {
    next(error)
  }
}
module.exports = updateStatus

const User = require("../../models/user-model");
const Withdrawrequest = require("../../models/withdraw-request-model");


const getAllWithdrawRequest = async(_req,res,next)=>{
   try {
    const agentWithdrawRequests = await Withdrawrequest.find().populate({
        path: "agentId",
        model: User,
        select: "-pin_number"
      }).lean();
    res.status(200).json(agentWithdrawRequests)
   } catch (error) {
    next(error)
   }
}

module.exports = getAllWithdrawRequest
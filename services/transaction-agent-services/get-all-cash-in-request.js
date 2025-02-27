const Cashrequest = require("../../models/cash-request-model");
const User = require("../../models/user-model");


const getAllCashInRequest = async(_req,res,next)=>{
   try {
    const agentCashRequests = await Cashrequest.find().populate({
        path: "agentId",
        model: User,
        select: "-pin_number"
      }).lean();
      console.log(agentCashRequests)
    res.status(200).json(agentCashRequests)
   } catch (error) {
    next(error)
   }
}

module.exports = getAllCashInRequest
const { mongoose } = require("mongoose");
const Withdrawrequest = require("../../models/withdraw-request-model");

const withdrawRequest = async(req,res,next)=>{
    try {

        const { agentId,amount } = req.body;
        console.log(agentId)
    
        const newWithdrawRequest = await Withdrawrequest.create({
          agentId: new mongoose.Types.ObjectId(agentId),
          amount
        });
    
        await newWithdrawRequest.save();
        res.status(201).json({ message: "withdraw request send successfully!"});
      } catch (error) {
        next(error)
      }
}

module.exports = withdrawRequest
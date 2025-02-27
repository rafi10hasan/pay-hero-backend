const { mongoose } = require("mongoose");
const Cashrequest = require("../../models/cash-request-model");



const cashInRequest = async(req,res,next)=>{
    try {
        console.log('access')
        const { agentId } = req.body;
        console.log(agentId)
        // Validate if agentId is a valid MongoDB ObjectId
    
        const newRequest = await Cashrequest.create({
          agentId: new mongoose.Types.ObjectId(agentId), // Convert to ObjectId
        });
    
        await newRequest.save();
        res.status(201).json({ message: "Cash request send successfully!"});
      } catch (error) {
        next(error)
      }
}

module.exports = cashInRequest
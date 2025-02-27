
const User = require("../../models/user-model");
const Withdrawrequest = require("../../models/withdraw-request-model");

const withdrawRequestSuccess = async(req,res,next)=>{
    const {id} = req.params;
    const {status,amount} = req.body
    try {
    
        const account = await Withdrawrequest.findById(id);
        if (!account) {
           res.status(404).json({ message: "Account not found" });
        }
        account.status = status
        const agent = await User.findById(account.agentId);
        const admin = await User.findOne({role:"admin"});
        if (!agent) {
           res.status(404).json({ message: "Agent not found" });
        }
        let fee = 5
        const totalAmounts = amount + fee
        if(agent.balance < totalAmounts){
            res.status(400).json({message:"insufficient balance"})
        }
        admin.balance += fee
        agent.balance -= totalAmounts
        await agent.save();
        await account.save();
        await admin.save()
        return res.json({ message: "withdraw money successfully!" });
      } catch (error) {
        next(error)
      }
}

module.exports = withdrawRequestSuccess
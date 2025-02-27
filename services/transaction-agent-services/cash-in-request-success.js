
const Cashrequest = require("../../models/cash-request-model");
const User = require("../../models/user-model");

const cashInRequestSuccess = async(req,res,next)=>{
    const {id} = req.params;
    const {status} = req.body
    try {
    
        const account = await Cashrequest.findById(id);
        if (!account) {
          return res.status(404).json({ message: "Account not found" });
        }
        account.status = status
        const agent = await User.findById(account.agentId);
        const admin = await User.findOne({role:"admin"});
        if (!agent) {
           res.status(404).json({ message: "Agent not found" });
        }
        
        let fee = 5;
        if(agent.balance < fee){
            res.status(400).json({message:"insufficient balance"})
        }
         agent.balance = (agent.balance + 100000) - fee
         admin.balance += 5
        
        await agent.save();
        await account.save()
        await admin.save()
        res.json({ message: "Balance updated successfully" });

      } catch (error) {
        next(error)
      }
}

module.exports = cashInRequestSuccess
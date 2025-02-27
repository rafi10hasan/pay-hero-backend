const Transaction = require("../../models/transaction-model");
const User = require("../../models/user-model");


const getAllAccounts = async(_req,res,next)=>{
   try {
    const accounts = await User.find().populate({
        path: "transactions",
        model: Transaction,
      }).select(["-pin_number"]).lean();
    res.status(200).json(accounts)
   } catch (error) {
    next(error)
   }
}

module.exports = getAllAccounts
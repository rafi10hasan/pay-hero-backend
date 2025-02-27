const Transaction = require("../../models/transaction-model");
const User = require("../../models/user-model");


const getAccountById = async(req,res,next)=>{
    const {id} = req.params
   try {
    const accounts = await User.findById(id).populate({
        path: "transactions",
        model: Transaction,
      }).select(["-pin_number"]).lean();
    res.status(200).json(accounts)
   } catch (error) {
    next(error)
   }
}

module.exports = getAccountById
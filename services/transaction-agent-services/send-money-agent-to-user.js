const { mongoose } = require("mongoose");

const Transaction = require("../../models/transaction-model");
const User = require("../../models/user-model");


const sendMoneyAgentToUser = async (req, res, next) => {
  try {
    const { id, receiverPhone, amount } = req.body;
    const objectId = new mongoose.Types.ObjectId(id);

    if (amount <= 0) {
      res.status(400).json({ message: "Invalid amount" });
    }

    // Find agent
    const agent = await User.findById(objectId);
    console.log(agent)
    if (!agent || agent.role !== "agent") {
      res.status(400).json({ message: "Invalid agent" });
    }

    // Find user by mobile number
    const user = await User.findOne({ mobile_number: receiverPhone });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    // check user balance is sufficient
    if (agent.balance < amount) {
      res.status(400).json({ message: "Agent has insufficient balance" });
    }

    // Update balances
    agent.balance -= amount;
    user.balance += amount;
    
    const transaction = await Transaction.create({
        transactionId: new Date().getTime().toString(), 
        sender: agent.mobile_number,
        receiver: receiverPhone,
        amount,
        transactionType: "send_money",
      });
    
   
    await transaction.save();
    agent.transactions.unshift(transaction._id);
    user.transactions.unshift(transaction._id);
    await agent.save();
    await user.save();

    res.json({ message: "Cash-in successful", transactionId: transaction._id });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMoneyAgentToUser };

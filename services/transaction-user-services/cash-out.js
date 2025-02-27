const User = require("../../models/user-model");
const Transaction = require("../../models/transaction-model");
const bcrypt = require('bcrypt');

const cashOut = async (req, res, next) => {
  try {
    const { senderPhone, agentNumber, amount, pin_number } = req.body;

    if (amount < 100) {
      return res.status(400).json({ message: "Minimum cash-out amount is 100 Taka" });
    }

    const user = await User.findOne({ mobile_number: senderPhone, role: "user" });
    const agent = await User.findOne({ mobile_number: agentNumber, role: "agent" });
    const admin = await User.findOne({ role: "admin" });
     
    console.log(user)
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    if (!agent) {
      res.status(400).json({ message: "agent not found" });
    }
      const isMatch = await bcrypt.compare(pin_number, user.pin_number);
      if (!isMatch) {
        res.status(400).json({ message: "pin not match", match: false });
      } 

    // Calculate Fees
    const fee = amount * 0.015; // 1.5% of withdrawal amount
    const agentIncome = amount * 0.01;
    // 1% goes to agent
    const adminIncome = amount * 0.005; // 0.5% goes to admin
    const totalDeduction = amount + fee;

    if (user.balance < totalDeduction) {
      res.status(400).json({ message: "Insufficient balance" });
    }
   console.log(agentIncome)
    // Update Balances
    user.balance -= totalDeduction;
    agent.balance += amount + agentIncome; // Agent gets the withdrawn amount
    admin.balance += adminIncome; // Admin gets 0.5% fee

    // Create Transaction Record
    const transaction = await Transaction.create({
      transactionId: new Date().getTime().toString(),
      sender: senderPhone,
      receiver: agentNumber,
      amount,
      transactionType: "cash_out",
      fee,
    });

    // Store Transaction IDs in User, Agent, and Admin
    user.transactions.push(transaction._id);
    agent.transactions.push(transaction._id);

    // Save Updates
    await user.save();
    await agent.save();
    await admin.save();

    res.json({
      message: "Cash-out successful",
      transactionId: transaction._id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cashOut;

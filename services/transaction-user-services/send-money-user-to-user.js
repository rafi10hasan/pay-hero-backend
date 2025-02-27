const User = require("../../models/user-model");
const Transaction = require("../../models/transaction-model");

const sendMoneyUserToUser = async (req, res, next) => {
  try {
    console.log('access from send money')
    const { senderPhone, receiverPhone, amount } = req.body;
    
    if (amount < 50) {
      return res.status(400).json({ message: "Minimum send amount is 50 Taka" });
    }

    const sender = await User.findOne({mobile_number:senderPhone});
    const receiver = await User.findOne({ mobile_number: receiverPhone });
    const admin = await User.findOne({ role: "admin" });
    console.log(admin)
    
    if (!sender) {
        res.status(400).json({ message: "User not found" });
      }
      if(!receiver){
          res.status(400).json({ message: "agent not found" });
      }

    let fee = amount > 100 ? 5 : 0;
    if (sender.balance < amount + fee) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    
    sender.balance -= amount + fee;
    receiver.balance += amount;

    
    if (fee > 0) {
      admin.balance += fee;
    }

    // Create transaction
    const transaction = await Transaction.create({
      transactionId: new Date().getTime().toString(), 
      sender: senderPhone,
      receiver: receiverPhone,
      amount,
      transactionType: "send_money",
      fee,
    });

    // Add transaction ID to sender & receiver
    sender.transactions.unshift(transaction._id);
    receiver.transactions.unshift(transaction._id); 

    await sender.save();
    await receiver.save();
    await admin.save();

    res.json({ message: "Transaction successful", transactionId: transaction._id });
  } catch (error) {
    next(error);
  }
};

module.exports = sendMoneyUserToUser;

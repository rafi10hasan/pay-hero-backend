const { mongoose, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    transactionId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    sender: { 
        type: String, 
        ref: "User", 
        required: true 
    },
    receiver: { 
        type: String, 
        ref: "User", 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    transactionType: { 
        type: String, 
        enum: ["send_money", "cash_in", "cash_out"], 
        required: true 
    },
    fee: { 
        type: Number, 
        default: 0,
        required:false 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models.Transaction ?? mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;

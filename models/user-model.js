const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },

  email: {
    required: true,
    unique: true,
    type: String,
  },

  mobile_number: {
    required: true,
    unique: true,
    type: String,
  },

  pin_number: {
    required: true,
    type: String,
  },

  nid_number: {
    required: true,
    unique: true,
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "agent", "admin"],
  },
  isVerified: {
    type: Boolean,
    default: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },

  transactions: [
    { 
        type: Schema.ObjectId, 
        ref: "Transaction" 
    }
    ],
  otp: {
    required: false,
    type: Number,
  },
});

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

module.exports = User;

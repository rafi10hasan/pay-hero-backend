const { mongoose } = require("mongoose");
const User = require("../../models/user-model");
const Transaction = require("../../models/transaction-model");
const getUserOrAgentDataById = async (id) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createError("invalid object id", 400);
    }
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await User.findById(objectId)
      .populate({
        path: "transactions",
        model: Transaction,
      })
      .lean();
    return data;
  } catch (error) {
    if (!err.isOperational) {
      throw new Error(`Unexpected error in user or agent data service: ${err.message}`);
    }
    throw err;
  }
};

module.exports = { getUserOrAgentDataById };

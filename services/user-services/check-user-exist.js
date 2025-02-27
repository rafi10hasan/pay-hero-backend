const bcrypt = require("bcryptjs");
const User = require("../../models/user-model");
const { generateAccessToken } = require("../../utils/generate-token");
const { createError } = require("../../errors/create-error");

const checkUserExist = async (credentials) => {
  const { mobile_number, pin_number } = credentials;
  console.log(mobile_number);
  try {
    const isExistenceUser = await User.findOne({ mobile_number });

    if (!isExistenceUser) {
      throw createError("user not found", 404);
    }

    const isMatch = await bcrypt.compare(pin_number, isExistenceUser.pin_number);
    if (isMatch) {
      const finalUser = {
        id: isExistenceUser._id,
        name: isExistenceUser.name,
        role: isExistenceUser.role,
      };
      const accessToken = generateAccessToken(finalUser);
      console.log(accessToken);
      finalUser.accessToken = accessToken;

      return finalUser;
    } else {
      return null;
    }
  } catch (err) {
    if (!err.isOperational) {
      throw new Error("Unexpected error in user service:", err);
    }
    throw err;
  }
};

module.exports = { checkUserExist };

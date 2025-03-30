const User = require("../../models/user-model");
const bcrypt = require("bcryptjs");

const createUser = async (user) => {
  const { name, email, pin_number, mobile_number, nid_number, role } = user;
  console.log("🔹 Received user data:", user);

  try {
    // ✅ Hash PIN
    const hashedPassword = await bcrypt.hash(pin_number, 10);

    // ✅ Create User
    const newUser = await User.create({
      name,
      email,
      pin_number: hashedPassword,
      mobile_number,
      nid_number,
      role: role || "user",
    });

    if (!newUser._id) {
      throw new Error("User creation failed, ID not generated");
    }

    let balanceAmount = newUser.role === "agent" ? 100000 : 200;
    newUser.balance = balanceAmount;
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error(`Unexpected error in user service: ${err.message}`);
  }
};

module.exports = { createUser };

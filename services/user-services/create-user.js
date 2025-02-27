
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
      isVerified: role === "agent" ? false : true
    });

    console.log("✅ User created successfully:", newUser);

    // ✅ Verify newUser ID
    if (!newUser._id) {
      throw new Error("User creation failed, ID not generated");
    }

    // ✅ Check if Balance Exists
    let balanceAmount = newUser.role === "agent" ? 100000 : 40;
    newUser.balance = balanceAmount;
    await newUser.save();
    return newUser;
  } catch (err) {
  
    throw new Error(`Unexpected error in user service: ${err.message}`);
  }
};

module.exports = { createUser };

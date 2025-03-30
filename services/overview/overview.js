const User = require("../../models/user-model");


const getOverview = async (req, res) => {
  try {
    
    const totalUsers = await User.countDocuments({ role: "user" });

    // Fetch total money in the system
    const totalMoneyInSystem = await User.aggregate([
      { $group: { _id: null, totalBalance: { $sum: "$balance" } } },
    ]);

    // admin income
    const admin = await User.findOne({role:"admin"});
    const adminIncome = admin.balance.toLocaleString("en-BD", {
      currency: "BDT",
    })
    
    const formattedBDT = totalMoneyInSystem[0]?.totalBalance.toLocaleString("en-BD", {
      currency: "BDT",
    });

    res.json({
      balance:  formattedBDT || 0,
      totalUsers,
      adminIncome: adminIncome
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getOverview };

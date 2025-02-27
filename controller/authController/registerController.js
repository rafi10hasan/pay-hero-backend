const User = require("../../models/user-model");
const { createUser } = require("../../services/user-services/create-user");


const registerController = async (req, res, next) => {
  const userInfo = req.body;
  const {email,mobile_number,nid_number} = userInfo
  try {
    const isExistenceUser = await User.findOne({
      $or: [{ email }, { mobile_number }, {nid_number}],
    });
    if (isExistenceUser) {
      if (isExistenceUser.email === email) {
        return res.status(400).json({ message: "This email is already registered" });
      } else if (isExistenceUser.nid_number === nid_number) {
        return res.status(400).json({ message: "This NID number is already registered" });
      } else {
        return res.status(400).json({ message: "This Mobile number is already registered" });
      }
    }
    const user = await createUser(userInfo);
    // console.log(user)
    if (user) {
      res.status(201).json(({ message: "user has been created succesfully"}));
    } else {
      res.status(400).json({ message: "user already registered" });
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { registerController };

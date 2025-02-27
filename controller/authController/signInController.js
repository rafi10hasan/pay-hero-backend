const { checkUserExist } = require("../../services/user-services/check-user-exist");


const signInController = async(req,res,next)=>{
  const credentials = req.body;
  console.log(credentials)
  try {
    const user = await checkUserExist(credentials);
    console.log(user)
    if (user.id) {
        res.status(200).json(user);
    } else {
       res.json("Invalid username or password");
    }
  } catch (error) {
    next(error)
  }
}

module.exports = signInController
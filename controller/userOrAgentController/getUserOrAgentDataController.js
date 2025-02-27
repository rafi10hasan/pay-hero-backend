const { getUserOrAgentDataById } = require("../../services/user-data-services/get-user-data-services");


const getUserOrAgentDataController = async(req,res,next)=>{

    const {id} = req.params;
  try {
      const userOrAgentData = await getUserOrAgentDataById(id); 
      res.status(200).json(userOrAgentData);
  } catch (error) {
    next(error)
  }
}

module.exports = getUserOrAgentDataController
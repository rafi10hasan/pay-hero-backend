const User = require("../../models/user-model")
const bcrypt = require('bcrypt');

const verifyAgent = async(req,res,next)=>{
    const {pin_number,id} = req.body
    console.log(id,pin_number)
     try{
        const agent = await User.findById(id);
        console.log(agent)
        if(agent._id){
            const isMatch = await bcrypt.compare(pin_number, agent.pin_number);
            if(isMatch){
               res.status(200).json({message:"verified agent",match:true})
            }
            else{
                res.status(400).json({message:"pin not match",match:false})
            }
        }
       
     }catch(error){
         next(error)
     }

}

module.exports = verifyAgent
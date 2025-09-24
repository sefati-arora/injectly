const Models=require('../models/index');
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const helper=require('../helper/validation');

module.exports=
{
    notification:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            senderId:Joi.string().required(),
            receiverId:Joi.string().required(),
            title:Joi.string().required(),
            Description:Joi.string().required(),
            isNotification:Joi.number().valid(0,1).required(),
          });
          const payload=await helper.validationJoi(req.body,schema);
          const user=await Models.notificationModel.create({
            senderId:payload.senderId,
            receiverId:payload.receiverId,
            title:payload.title,
            Description:payload.Description,
            isNotification:payload.isNotification
          })
          return res.status(200).json({message:"Notification data enter",user});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR!!!!"});
        }
    },
    getnotification:async(req,res) =>
    {
       try
       {
        const {userId}=req.user.id;
        const notifications= await Models.notificationModel.findAll({receiverId:userId});
        if(!notifications)
        {
            return res.status(404).json({message:"No notification found"})
        }
        return res.status(200).json({message:"notification get"});
       }
       catch(error)
       {
        console.log(error);
        return res.status(500).json({message:"error in notification"})
       }
    },
    Clearnotification:async(req,res) =>
    {
        try
        {
           const user=await Models.notificationModel.destroy({where:{receiverId:req.user.id}});
           return res.status(200).json({message:"notification destroy",user});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR in nofication "})
        }
    }
}
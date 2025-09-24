const Models=require('../models/index');
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const helper=require('../helper/validation');
require("dotenv").config();
module.exports=
{
    subBuy:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            userId:Joi.string().required(),
            subId:Joi.string().required(),
          });
          const payload=await helper.validationJoi(req.body,schema);
          const subscription = await Models.subscriptionModel.findOne({where:{id:payload.subId}});
          console.log('Subscription:', subscription);
          if(!subscription)
          {           
            return res.status(404).json({message:"Subscription not found!"})
          }
          const startDate=new Date();
          const EndDate=new Date(startDate);
          if(subscription.SubscriptionType==0)
          {
           EndDate.setMonth(EndDate.getMonth() + 1);
          }
          else if(subscription.SubscriptionType==1)
          {
            EndDate.setFullYear(EndDate.getFullYear() +1);
          }
          else
          {
            return res.status(400).json({message:"Invalid subscription"})
          }
          const sub=await Models.subscriptionByModel.create({
            userId:payload.userId,
            subId:payload.subId,
            startDate:startDate,
            EndDate:EndDate,
          });
       
          return res.status(200).json({message:"Data subscription buy entered!",sub});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR "})
        }
    }
}
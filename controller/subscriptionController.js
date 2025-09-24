const Models=require('../models/index');
const Joi=require("joi");
const helper=require('../helper/validation');

module.exports=
{
    subscription:async(req ,res) =>
    {
        try
        {
        const schema=Joi.object(
            {
                title:Joi.string().required(),
                 SubscriptionType:Joi.number().valid(0,1).required(),
                 Amount:Joi.number().required(),
                 Description:Joi.string().required(),
            }
        );
          const payload=await helper.validationJoi(req.body,schema);
            const sub=await Models.subscriptionModel.create({
                title:payload.title,
                SubscriptionType:payload.SubscriptionType,
                Amount:payload.Amount,
                Description:payload.Description
            })
            return res.status(200).json({message:"subscription made successfully",sub});
    }
    catch(error)
    {
      console.log(error);
      return res.status(500).json({message:"ERROR"});
    }
    }
}
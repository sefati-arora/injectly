const Models = require("../models/index");
const Joi = require("joi");
const helper = require("../helper/validation");

module.exports=
{
    dosageStrength:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            title:Joi.string().required()
          })
          const payload=await helper.validationJoi(req.body,schema);
          const user=await Models.dosageStrengthModel.create({
            title:payload.title
          })
          return res.status(200).json({message:"Data dosageStrength ENTER!",user});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR"});
        }
    },
    Meditation:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            title:Joi.string().required()
          })
          const payload=await helper.validationJoi(req.body,schema)
          const user=await Models.meditaionNameModel.create({
            title:payload.title
          })
          return res.status(200).json({message:"MEDITATION DATA",user});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR IN MEDITATION "})
        }
    },
    InjectionSite:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            title:Joi.string().required(),
          })
          const payload=await helper.validationJoi(req.body,schema);
          const user=await Models.injectionSiteModel.create({
            title:payload.title
          })
          return res.status(200).json({message:"INJECTION SITE DATA",user})
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR "})
        }
    }
}
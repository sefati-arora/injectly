const Models=require('../models/index');
const Joi=require("joi");
const helper=require('../helper/validation');

module.exports=
{
    contactDetail:async(req,res) =>
    {
      try
      {
        const schema=Joi.object({
            Name:Joi.string().required(),
            Email:Joi.string().required(),
            phoneNumber:Joi.string().required(),
            Description:Joi.string().required()
        });
        const payload=await helper.validationJoi(req.body,schema);
        const contact=await Models.contactModel.create({
            Name:payload.Name,
            Email:payload.Email,
            phoneNumber:payload.phoneNumber,
            Description:payload.Description
        })
        return res.status(200).json({message:"Data Entered in contactTable"});
      }
      catch(error)
      {
        console.log(error);
        return res.status(500).json({message:"ERROR IN CONTACT API"})
      }
    }
}
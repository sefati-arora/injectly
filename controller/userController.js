const Models = require("../models/index");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const helper = require("../helper/validation");
const commonHelper = require("../helper/commonHelper");
require("dotenv").config();
const argon2 = require("argon2");
module.exports = {
  signUp: async (req, res) => {
    try {
      const schema = Joi.object({
        userName: Joi.string().required(),
        gender:Joi.number().valid(0,1).default(0),
        height: Joi.string().required(),
        weight: Joi.string().required(),
        age: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      });
      const payload = await helper.validationJoi(req.body, schema);
      const { password } = payload;
      const hashpasswords = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1,
      });
      const users=await Models.userModel.findOne({where:{email:payload.email}})
      if(users)
      {
        return res.status(404).json({message:"User already exist"})
      };
      const user = await Models.userModel.create({
        userName: payload.userName,
        gender:payload.gender,
        height: payload.height,
        weight: payload.weight,
        age: payload.age,
        email: payload.email,
        password: hashpasswords,
      });
        const token=jwt.sign({id:user.id},process.env.SECRET_KEY);
          console.log(">>>>>>",user);
      return res.status(200).json({ message: "Data enter successfully", user ,token});
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "ERROR!!!" });
    }
  },
  login: async (req, res) => {
    try
        {
            const schema=Joi.object({
                userName:Joi.string().required(),
                email:Joi.string().required(),
                password:Joi.string().required()
            });
            const payload=await helper.validationJoi(req.body,schema);
            const {password}=payload;
          //  const hashedpassword=await commonHelper.bcryptData(password,10);
          const hashedpassword=await argon2.hash(password,
            {
                type:argon2.argon2id,
                memoryCost:2 ** 16,
                timeCost:3,
                parallelism:1,
            }
          )
            const user=await Models.userModel.create({
                userName:payload.userName,
                email:payload.email,
                password:hashedpassword
            });
          return res.status(200).json({message:"password hashed successfullyy",user});
        }
        catch(error)
        {
            console.log(error);
            return res.status(400).json({message:"error while password hashing"});
        }
    },
  OtpVerify: async (req, res) => {
    try {
      const schema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: ["com", "net", "org", "in", "us"] } }).required().label("Email"),
      });
      const payload = await helper.validationJoi(req.body, schema);
      const { email } = payload;
      const userExist = await Models.userModel.findOne({ where: { email } });
      if (!userExist) {
        return res.status(404).json({ message: "User not found!!" });
      }
      const otp = Math.floor(1000 + Math.random() * 9000);
      const response = await Models.userModel.create({
        userName: payload.userName,
        email,
        otp,
        otpVerified: 0,
      });
      try {
        await commonHelper.otpSendLinkHTML(req, email, otp);
        console.log(`OTP send(${email}}):${otp}`);
      } catch (error) {
        await Models.userModel.destroy({ where: { id: response.id } });
        return res.status(400).json({ message: "Failed to send OTP" });
      }
      console.log(`Test Mode: OTP for email (${email}): ${otp}`);
      return res.status(200).json({ message: "OTP send successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "!!!!ERROR!!!!!" });
    }
  },
  otpCheck: async (req, res) => {
   try {
    console.log("/././././",req.body);
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
     const user = await Models.userModel.findOne({ where: { email,otp } });
    if (!user) {
       
      return res.status(404).json({ message: "User not found" });
    }
     if (user.otp !== otp) {
        console.log('.....///',user.otp)
      return res.status(400).json({ message: "Invalid OTP" });
    }
        await Models.userModel.update(
      { otpVerified: 1, otp: null },
      { where: { id: user.id } }
    );
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.status(200).json({message:"OTP verified",token})
    }
    catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } 
},
    addGoal:async(req ,res) =>
    {
        try
        {
          const schema=Joi.object({
            weight:Joi.string().required(),
            calories:Joi.string().required(),
            proteinIntake:Joi.string().required(),
            waterIntake:Joi.string().required(),
             userId:Joi.string().required(),
          });
          const payload=await helper.validationJoi(req.body,schema);
          const addGoal=await Models.addGoalModel.create(
            {
                
                weight:payload.weight,
                calories:payload.calories,
                proteinIntake:payload.proteinIntake,
                waterIntake:payload.waterIntake,
                userId:payload.userId,
            }
          )
          return res.status(200).json({message:"DATA OF ADDGOAL ENTER",addGoal});
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).json({message:"ERROR "});
        }
    },
    updateGoal:async(req,res) =>
    {
        try{
             const{id,weight,calories,proteinIntake,waterIntake}=req.body;
             const goal=await Models.addGoalModel.findOne({where:{id}});
             if(!goal)
             {
               return res.status(404).json({message:"Goal not found"});
              }
              await Models.addGoalModel.update({
                weight,
                calories,
                proteinIntake,
                waterIntake
              },
            {
              where:{id}
            })
             }
            catch(error)
        {
          console.log(error);
          return res.status(500).json({message:"ERROR"})
        }
        },
    EditGoal:async(req ,res) =>
    {
      try{
          const{userId}=req.body;
          const user=await Models.addGoalModel.findOne({where:{userId:userId}});
          console.log(",,,,,",user);
          return res.status(200).json({message:"data fetch!",user});
      }
      catch(error)
      {
        console.log(error);
        return res.status(500).json({message:"ERROR!"});
      }
    },
    clearGoal:async(req,res) =>
    {
       try
       {
          const user=await Models.addGoalModel.destroy({where:{userId:req.user.id}});
          return res.status(200).json({message:"DESTROY!",user});
       }
       catch(error)
       {
        console.log(error);
        return res.status(500).json({message:"ERROR"});
       }
    },
     addShort: async (req, res) => {
        try {
          const schema = Joi.object({
            Date: Joi.string().required(),
            time: Joi.string().required(),
            DosageStrengthId: Joi.string().required(),
            MeditationNameId:Joi.string().required(),
            InjectionSiteId: Joi.string().required(),
            shortNote: Joi.string().required(),
            userId: Joi.string().required(),
          });
          const payload = await helper.validationJoi(req.body, schema);
          const add = await Models.addShortModel.create({
            Date: payload.Date,
            time: payload.time,
            DosageStrengthId: payload.DosageStrengthId,
            MeditationNameId:payload.MeditationNameId,
            InjectionSiteId:payload.InjectionSiteId,
            shortNote: payload.shortNote,
            userId: payload.userId,
          });
          return res
            .status(200).json({ message: "DATA ENTER IN SHORT MODEL", add });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "ERROR IN ADD SHORT" });
        }
      },
      updateShort:async(req,res) =>
      {
         try
         {
           const{id,Date,time,shortNote}=req.body;
           const short=await Models.addShortModel.findOne({where:{id}});
           if(!short)
           {
            return res.status(404).json({message:"Short not found"});
           }
           await Models.addShortModel.update({
              Date,
              time,
              shortNote
           },
          {
            where:{id}
          })
          return res.status(200).json({message:"data updated!"});
         }
         catch(error)
         {
          console.log(error);
          return res.status(500).json({message:"ERROR!"})
         }
      },
       EditShort:async(req, res) =>
    {
      try{
        const{Date}=req.body;
        const user=await Models.addShortModel.findAll({where:{Date}});
        return res.status(200).json({message:"data get",user});
      }
      catch(error)
      {
        console.log(error);
        return res.status(500).json({message:"ERROR"})
      }
    },
      clearShort:async(req ,res) =>
      {
        try
        {
           const user=await Models.addShortModel.destroy({where:{userId:req.user.id}});
           return res.status(200).json({message:" destroy",user});
        }
        catch(error)
        {
          console.log(error);
          return res.status(500).json({message:"ERROR"})
        }
      },
      AccountDelete:async(req, res) =>
       {
        try{
        const user=await Models.userModel.destroy({where:{id:req.user.id}});
        return res.status(200).json({message:"user data DESTROY",user})
        }
         catch(error)
         {
          console.log(error);
          return res.status(500).json({message:"ERROR"})
         }
      }
};

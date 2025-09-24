const Sequelize= require("sequelize");
const sequelize= require('../config/connectDB').sequelize;

module.exports=
{
    userModel:require('./userModel')(Sequelize,sequelize,Sequelize.DataTypes),
    notificationModel:require('./notificationModel')(Sequelize,sequelize,Sequelize.DataTypes),
    contactModel:require('./contactModel')(Sequelize,sequelize,Sequelize.DataTypes),
    dosageStrengthModel:require('./dosageStrengthModel')(Sequelize,sequelize,Sequelize.DataTypes),
    meditaionNameModel:require('./meditaionNameModel')(Sequelize,sequelize,Sequelize.DataTypes),
    injectionSiteModel:require('./injectionSiteModel')(Sequelize,sequelize,Sequelize.DataTypes),
    addShortModel:require('./addShortModel')(Sequelize,sequelize,Sequelize.DataTypes),
    addGoalModel:require('./addGoalModel')(Sequelize,sequelize,Sequelize.DataTypes),
    subscriptionModel:require('./subscriptionModel')(Sequelize,sequelize,Sequelize.DataTypes),
    subscriptionByModel:require('./subscriptionByModel')(Sequelize,sequelize,Sequelize.DataTypes)
}


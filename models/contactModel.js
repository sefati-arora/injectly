module.exports=(Sequelize,sequelize,DataTypes) =>
{
     return sequelize.define(
        "contactTable",
        {
            ...require('./core')(Sequelize,DataTypes),
            Name:{
                type:DataTypes.STRING(50),
                allowNull:true,
            },
            Email:
            {
                type:DataTypes.STRING(50),
                allowNull:true,
            },
            phoneNumber:
            {
                type:DataTypes.STRING(50),
                allowNull:true,
            },
            Description:
            {
                type:DataTypes.TEXT,
                allowNull:true,
            }
        }
     )
}
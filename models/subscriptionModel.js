module.exports=(Sequelize,sequelize,DataTypes) =>
{
    return sequelize.define(
        "subscriptiontable",
        {
            ...require('./core')(Sequelize,DataTypes),
            title:
            {
                type:DataTypes.STRING(255),
                allowNull:true,
            },
            SubscriptionType:
            {
                type:DataTypes.INTEGER,
                allowNull:true,
                defaultValue:0   //0 for oneMonth and 1 for year
            },
            Amount:
            {
                type:DataTypes.DOUBLE,
                allowNull:false,
            },
            Description:
            {
                type:DataTypes.TEXT,
                allowNull:true,
            }
        },
        {
            tableName:"subscriptiontable"
        }
    )
}
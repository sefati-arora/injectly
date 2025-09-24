module.exports=(Sequelize,sequelize,DataTypes) =>
{
    return sequelize.define(
        "subscriptionBuy",
        {
            ...require('./core')(Sequelize,DataTypes),
            userId:
            {
                type:DataTypes.UUID,
                allowNull:false,
                references:
                {
                    model:"usertable",
                    key:"id"
                },
                onUpadte:"CASCADE",
                onDeleted:"CASCADE"
            },
            subId:
            {
                type:DataTypes.UUID,
                allowNull:false,
                references:
                {
                    model:"subscriptiontable",
                    key:"id"
                },
                onUpdate:"CASCADE",
                onDeleted:"CASCADE"
            },
            startDate:
            {
              type: DataTypes.DATE,
             defaultValue: DataTypes.NOW(0),   
             allowNull:true
            },
            EndDate:
            {
                 type: DataTypes.DATE,
             defaultValue: DataTypes.NOW(0),   
             allowNull:true
            }
        }
    )
}
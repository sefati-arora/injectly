module.exports=(Sequelize,sequelize,DataTypes) =>
{
    return sequelize.define(
        "dosageStrength",
        {
            ...require('./core')(Sequelize,DataTypes),
            title:
            {
                type:DataTypes.STRING(255),
                allowNull:true
            }
        },
        {
          tableName:"dosageStrength"
        }
    )
}
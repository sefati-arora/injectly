module.exports = (Sequelize, sequelize, DataTypes) => {
  return sequelize.define(
    "AddGoalstable",
    {
      ...require("./core")(Sequelize, DataTypes),
      weight: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      calories: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      proteinIntake: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      waterIntake: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
       userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "usertable",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "AddGoalstable",
    }
  );
};

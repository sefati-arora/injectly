module.exports = (Sequelize, sequelize, DataTypes) => {
  return sequelize.define("addShortTable", {
    ...require("./core")(Sequelize, DataTypes),
    Date: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    time: {
      type: DataTypes.STRING(255),
      allownULL: true,
    },
    DosageStrengthId:
    {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "dosageStrength",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
     },
     MeditationNameId:
     {
        type:DataTypes.UUID,
        allowNull:false,
        references:
        {
            model:"MeditationTable",
            key:"id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
     },
     InjectionSiteId:
     {
        type:DataTypes.UUID,
        allowNull:false,
        reference:
        {
            model:"injectiontable",
            key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
     },

    shortNote: {
      type: DataTypes.STRING(255),
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
  });
};

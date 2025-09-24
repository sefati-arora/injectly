const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("fitnesstable", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
const connectDB = async () => {
  try {
    await sequelize.authenticate().then(async () => {
      await sequelize.sync({ alter:false});
      console.log("db connected ans sync ");
    });
  } catch (error) {
    console.log("unable to connect", error);
  }
};

module.exports = {
  connectDB,
  sequelize,
};

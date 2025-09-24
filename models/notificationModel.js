module.exports=(Sequelize,sequelize,DataTypes) =>
{
   return sequelize.define(
    "notificationTable",
    {
        ...require('./core')(Sequelize,DataTypes),
        senderId:
        {
             type: DataTypes.UUID,
            allowNull: false,
           references: {
          model: "usertable",  
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        },
        receiverId:
        {
            type:DataTypes.UUID,
            allowNull:false,
            references:{
                model:"usertable",
                key:"id",
            },
            onUpdate:"CASCADE",
            onDelete:"CASCADE",
        },
        title:
        {
            type:DataTypes.STRING(100),
            allowNull:true,
        },
        Description:
        {
            type:DataTypes.TEXT,
            allowNull:true,
        },
        isRead:
        {
         type:DataTypes.INTEGER,
         allowNull:true,
         defaultValue:0    //0 for read and 1 for unread
       },
       isNotification:
       {
         type:DataTypes.INTEGER,
         allowNull:true,
         defaultValue:1   //0 for ON and 1 for notification OFF
       }
    }
   )
}
const sequelize  = require ('./db.js')
const {DataTypes}  = require('sequelize');




const User = sequelize.define(
  'users',
  {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    chatId: {
      type: DataTypes.INTEGER,
      unique: true,
    },

   
    username: {
      type: DataTypes.STRING,
      defaultValue: 0,

    },
     firstName: {
      type: DataTypes.STRING,
      defaultValue: 0,
     
    },
    lastRequestCardDay: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    lastRequestYoN: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    quantityAnswersYoN: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    invoiceMessageId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    PaidCategory: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    consultMessageId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }

  },
);

module.exports = User;


// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User);
// class User extends Model {}
// User.init(
//   {
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE,
//   },
//   { sequelize, modelName: 'user' },
// );

// (async () => {
//   await sequelize.sync();
//   const jane = await User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20),
//   });
//   console.log(jane.toJSON());
// })();
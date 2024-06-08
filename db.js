const { Sequelize} = require('sequelize');
module.exports =  new Sequelize({
  dialect: 'sqlite',
  storage: 'bot.db',
  // logging: (...msg) => console.log(msg)
});
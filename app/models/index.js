const env = process.env.NODE_ENV || 'development';

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
   process.env.DB,
   process.env.USER,
   process.env.PASSWORD,
  {
    host:  process.env.HOST,
    dialect:  "postgres"
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);


module.exports = db;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
    username: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
    name: {
            type: Sequelize.STRING
          },
    gender: {
        type: Sequelize.STRING
      },

    }, {
      timestamps: false,
      
  });
  
    return User;
  };
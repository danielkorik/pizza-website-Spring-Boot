'use strict';

const Sequelize= require('sequelize');
module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
     User.init({
         username: {
             type: Sequelize.STRING,
             allowNull: false,
             unique: true,
             validate: {
                 // Username length between 3 and 20 chara
                 len: [3, 20],
             },
         },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                // Password length between 5 and 20 char
                len: [5, 20],
            },
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },{
         sequelize
     });

    return User;
};


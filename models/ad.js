'use strict';

const Sequelize= require('sequelize');
module.exports = (sequelize) => {
    class Ad extends Sequelize.Model {}

    Ad.init({
        title: {
            type: Sequelize.STRING(20),
            allowNull: false,
            validate: {
                // Title length limited to 20 char
                len: [1, 20]
            }
        },
        description: {
            type: Sequelize.STRING(200),
            allowNull: true,
            validate: {
                // Description limited to 200 char
                len: [0, 200]
            }
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                min: 0 // Price is a number >= 0
            }
        },
        phoneNumber: {
            type: Sequelize.STRING(20),
            allowNull: true,
            validate: {
                isValidPhoneNumber(value) {
                    if (value && !/^(\d{2}-\d{7}|\d{3}-\d{7})$/.test(value)) {
                        throw new Error('Invalid phone number format. Please use the format XX-XXXXXXX or XXX-XXXXXXX.');
                    }
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true // Valid email format
            }
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
        },
        {
        sequelize
    });
    return Ad;
};

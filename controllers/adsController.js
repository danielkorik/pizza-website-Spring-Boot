const db = require("../models");
const {User} = require("../models");
const Ad = require('../models').Ad;
//get approved ads
const getApprovedAds = async (req, res) => {
    try {
        // Implement logic to fetch approved ads
        const ads = await Ad.findAll({ where: { approved: true } });
        res.json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
//---------------------------------------------get all ads
const getAllAds = async (req, res) => {
    try {
        // Implement logic to fetch all ads
        const ads = await Ad.findAll();
        res.json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const createAd = async (adData) => {
    try {
        await Ad.sequelize.sync(); // This won't drop existing tables
        const newAd = await Ad.create(adData);
        return newAd;
    } catch (error) {
        // Handle specific validation error for phone number
        if (error.name === 'SequelizeValidationError' && error.errors[0].validatorKey === 'isValidPhoneNumber') {
            throw new Error('Invalid phone number format. Please use the format XX-XXXXXXX or XXX-XXXXXXX.');
        }
        // If it's not a specific validation error, rethrow the original error
        throw error;
    }
};
module.exports = {
    getApprovedAds,
    getAllAds,
    createAd,
};

const expressAsyncHandler = require('express-async-handler');
const route = require('express').Router();

const { activator } = require('./activator.js');

const activatorBattle = expressAsyncHandler(async (req, res) => {
    try {
        console.log('Start Cron Job Process...');
        await activator();
        console.log('Stop Cron Job Process...');
        res.status(200).json({
            status: "success",
            message: "Cron Job Process completed!",
        });
    } catch (error) {
        console.log('Error in th Cron Job process:', error);
        res.status(500).json({
            status: "error",
            message: "Error in the Cron Job process!",
        });
    }
});

route.get('/activator', activatorBattle);

module.exports = route;
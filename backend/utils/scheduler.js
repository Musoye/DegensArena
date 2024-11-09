const cron = require('node-cron');
const { activator } = require('./activator.js');

// Schedule a task to log a message  2 minutes
cron.schedule('*/1 * * * *', async () => {
  try {
    console.log('Start Cron Job Process...');
    await activator();
    console.log('Stop Cron Job Process...');
  } catch (error) {
    console.log('Error in th Cron Job process:', error);
  }
});
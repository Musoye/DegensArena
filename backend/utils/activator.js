const Battle = require('../models/battleModel.js')
const { declareWinner } = require('../controller/tokens/birdeye.js')
const moment = require('moment');


const activator = async () => {
    const currentTime = moment();
    const battles = await Battle.find({ status: { $in: ['live', 'future'] } });
    console.log(`current time: ${currentTime}`);

    for (const battle of battles) {
        const battleTime = moment(battle.time);
        // const battleTime = moment("2024-10-15T23:02:46.057+01:00");


        const hoursDifference = battleTime.diff(currentTime, 'hours');
        const minutesDifference = battleTime.diff(currentTime, 'minutes');
        const seconddiff = battleTime.diff(currentTime, 'seconds');
        console.log(`Hours difference: ${hoursDifference}`);
        console.log(`Minutes difference: ${minutesDifference}`);
        console.log(`Seconds difference: ${seconddiff}`);

        if (seconddiff < 10  && minutesDifference <= 0 && hoursDifference <= 0 && battle.status === 'future') {
            console.log('battle is live');
            battle.status = 'live';
        } else if (hoursDifference <= -1 && minutesDifference <= -60 && battle.status === 'live') {
            console.log('battle is over');
            battle.status = 'past';
            try {
                await declareWinner(battle._id);
            } catch (error) {
                console.log(`Error in declareWinner function ${error}`);
                continue;

            }
        }

        await battle.save();
    }
}



module.exports = { activator }
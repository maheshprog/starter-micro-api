const mineflayer = require('mineflayer');

let bot;
let joinCount = 0;

function joinAndLeave() {
    if (!bot) {
        bot = mineflayer.createBot({
            host: 'gn2.slicehosting.tech',
            port: '31098',
            username: 'PingBot',
            auth: 'offline'
        });

        bot.on('spawn', () => {
            console.log(`Join ${joinCount + 1}: Successfully spawned.`);
            setTimeout(() => {
                bot.quit();
                bot = null;
                joinCount++;

                if (joinCount < 3) {
                    setTimeout(joinAndLeave, 2000); // 2 seconds before next join
                } else {
                    console.log('Cycle complete. Waiting for next cycle...');
                    joinCount = 0;
                    setTimeout(joinAndLeave, 180000); // 3 minutes (180000 milliseconds) before next cycle
                }
            }, 2000); // 2-second delay before quitting
        });

        bot.on('error', (err) => {
            console.log(`Join ${joinCount + 1}: Error - ${err}`);
            bot.quit();
            bot = null;
            joinCount++;

            if (joinCount < 3) {
                setTimeout(joinAndLeave, 2000); // 2 seconds before next join
            } else {
                console.log('Cycle complete. Waiting for next cycle...');
                joinCount = 0;
                setTimeout(joinAndLeave, 540000); // 3 minutes (180000 milliseconds) before next cycle
            }
        });
    }
}

joinAndLeave();

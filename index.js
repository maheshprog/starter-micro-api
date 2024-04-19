const http = require('http');
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'gn2.slicehosting.tech',
    port: '31098',
    username: 'Belldong',
    auth: 'offline'
});

let isMovingForward = true;

function moveThreeBlocks() {
    if (isMovingForward) {
        bot.setControlState('forward', true);
        setTimeout(() => {
            bot.setControlState('forward', false);
            isMovingForward = false;
        }, 3000); // Move forward for 3 seconds
    } else {
        bot.setControlState('back', true);
        setTimeout(() => {
            bot.setControlState('back', false);
            isMovingForward = true;
        }, 3000); // Move backward for 3 seconds
    }
}

bot.on('spawn', () => {
    setTimeout(() => {
        bot.chat('/login Belldong123');
        bot.chat('helo im working');
    }, 50); 

    setInterval(moveThreeBlocks, 6000); // Execute moveThreeBlocks every 6 seconds
});

bot.on('login', () => {
    console.log('Successfully logged in!');
});

bot.on('kicked', (reason) => {
    console.log(`Kicked for: ${reason}`);
});

http.createServer((req, res) => {
    console.log(`Just got a request at ${req.url}!`);
    
    if (bot && bot.entity) {
        res.write(`Bot is now moving in a pattern!`);
    } else {
        res.write('Fix');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

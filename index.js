const http = require('http');
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'gn2.slicehosting.tech',
    port: 31098,
    username: 'Belldong',
    auth: 'offline'
});

bot.on('spawn', () => {
    setTimeout(() => {
        bot.chat('Hello im working');
    }, 5000); // 5-second delay before attempting to login
    moveInCircle();
});

bot.on('login', () => {
    console.log('Successfully logged in!');
});

bot.on('kicked', (reason) => {
    console.log(`Kicked for: ${reason}`);
});

function moveInCircle() {
    let phi = 0;
    setInterval(() => {
        phi += Math.PI / 20;
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);
        bot.setControlState('sneak', false);
        bot.look(Math.cos(phi) * 0.5, Math.sin(phi) * 0.5, false);
    }, 50);
}

http.createServer((req, res) => {
    console.log(`Just got a request at ${req.url}!`);
    
    if (bot && bot.entity) {
        res.write(`Bot is now moving in a circle at ${bot.entity.position}!`);
    } else {
        res.write('Bot is not in game.');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

const http = require('http');
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'gn2.slicehosting.tech',
    port: '31098',
    username: 'Belldong',
    auth: 'offline'
});

bot.on('spawn', () => {
    setTimeout(() => {
        bot.chat('/login Belldong123');
        bot.chat('helo im working');
    }, 50); // 5-second delay before attempting to login
    digAtCoordinate(-134, 71, -237);  // Example coordinates
});

bot.on('login', () => {
    console.log('Successfully logged in!');
});

bot.on('kicked', (reason) => {
    console.log(`Kicked for: ${reason}`);
});

function digAtCoordinate(x, y, z) {
    const targetBlock = bot.blockAt(new mineflayer.vec3(x, y, z));
    
    bot.dig(targetBlock, (err) => {
        if (err) {
            console.log('Error:', err);
            return;
        }
        
        console.log(`Successfully mined block at ${x}, ${y}, ${z}`);
    });
}

http.createServer((req, res) => {
    console.log(`Just got a request at ${req.url}!`);
    
    if (bot && bot.entity) {
        res.write(`Bot is now digging at ${bot.entity.position}!`);
    } else {
        res.write('Fix');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

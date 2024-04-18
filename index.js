var http = require('http');
var mineflayer = require('mineflayer');

var bot = mineflayer.createBot({
    host: 'bksmp.hbmc.net',
    port: 31098,
    username: 'belldong' // You can set the version if needed
});

bot.on('spawn', () => {
    bot.chat('/log Belldong123');
    moveInCircle(); // Move the function call here
});

function moveInCircle() {
    var phi = 0;
    setInterval(() => {
        phi += Math.PI / 20;
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);
        bot.setControlState('sneak', false);
        bot.look(Math.cos(phi) * 0.5, Math.sin(phi) * 0.5, false);
    }, 50); // Use setInterval to continuously move
}

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    
    // Check if the bot is spawned
    if (bot && bot.entity) {
        res.write(`Bot is now moving in a circle at ${bot.entity.position}!`);
    } else {
        res.write('Bot is not in game.');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

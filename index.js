var http = require('http');
var mineflayer = require('mineflayer');

var bot = mineflayer.createBot({
    host: 'bksmp.hbmc.net',
    port: 31098,
    username: 'Belldong' // You can set the version if needed
});

bot.on('spawn', () => {
    bot.chat('/log Belldong123') // Replace '/your_command_here' with the command you want to run
});

function moveInCircle() {
    var phi = 0;
    bot.on('physicTick', () => {
        phi += Math.PI / 20;
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);
        bot.setControlState('sneak', false);
        bot.look(Math.cos(phi) * 0.5, Math.sin(phi) * 0.5, false);
    });
}

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`);
    
    // Check if the bot is spawned
    if (bot && bot.entity) {
        moveInCircle();
        res.write(`Bot is now moving in a circle at ${bot.entity.position}!`);
    } else {
        res.write('Bot is not in game.');
    }
    
    res.end();
}).listen(process.env.PORT || 3000);

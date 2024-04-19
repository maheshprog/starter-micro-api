const mineflayer = require('mineflayer');

let moving = true;

const bot = mineflayer.createBot({
    host: 'gn2.slicehosting.tech',
    port: '31098',
    username: 'Belldong',
    auth: 'offline'
});

bot.on('spawn', () => {
    setTimeout(() => {
        bot.chat('/login Belldong123');
        bot.chat('Ready to move!');
        startMoving();
    }, 50);
});

bot.on('login', () => {
    console.log('Successfully logged in!');
});

bot.on('kicked', (reason) => {
    console.log(`Kicked for: ${reason}`);
});

bot.on('playerJoined', (player) => {
    console.log(`${player.username} joined the game.`);
    stopMoving();
    bot.quit();
});

bot.on('playerLeft', () => {
    console.log('No players online. Reconnecting...');
    bot.quit();
    setTimeout(() => {
        bot.connect();
    }, 5000); // Reconnect after 5 seconds
});

function startMoving() {
    moving = true;
    moveBackAndForth();
}

function stopMoving() {
    moving = false;
}

function moveBackAndForth() {
    let direction = 1;
    let distance = 0;

    setInterval(() => {
        if (moving) {
            if (distance < 3 && direction === 1) {
                bot.setControlState('forward', true);
                distance += 1;
            } else if (distance > 0 && direction === -1) {
                bot.setControlState('back', true);
                distance -= 1;
            } else {
                direction *= -1;
            }
        } else {
            bot.clearControlStates();
        }
    }, 1000); // Adjust the interval as needed
}

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
    }, 2000); // 2-second delay before login
});

bot.on('login', () => {
    console.log('Successfully logged in!');
});

bot.on('kicked', (reason, loggedIn) => {
    console.log(`Kicked for: ${reason}`);
    console.log(`Logged in: ${loggedIn}`);
});

bot.on('playerJoined', (player) => {
    console.log(`${player.username} joined the game.`);
    stopMoving();
    setTimeout(() => {
        bot.connect(); // Automatically reconnects after disconnecting
    }, 5000); // Reconnect after 5 seconds
});

bot.on('playerLeft', () => {
    console.log('No players online. Reconnecting...');
    stopMoving();
    setTimeout(() => {
        bot.connect(); // Automatically reconnects after disconnecting
    }, 5000); // Reconnect after 5 seconds
});

bot.on('error', (err) => {
    console.log('Error:', err);
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

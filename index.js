const mineflayer = require('mineflayer');

const host = process.env.HOST;
const username = process.env.USERNAME || process.env.BOT_USERNAME;
const password = process.env.PASSWORD;

function createBot() {
  console.log('Попытка подключения...');

  const bot = mineflayer.createBot({
    host: pashasmp.mcsh.io,
    port: 25565,
    username: "afkbot,
    version: "1.21.11",
    auth: "offline"
  });

  bot.on('spawn', () => {
    console.log('✅ Бот успешно зашёл на сервер!');

    // Авто /login один раз после спавна
    setTimeout(() => {
      bot.chat('/login ' + "pashoks");
      console.log('Отправлена команда: /login');
    }, 2500);
  });

  // Анти-AFK
  setInterval(() => {
    if (!bot.entity) return;
    
    bot.look(Math.random() * Math.PI * 2, Math.random() * 0.6 - 0.3);
    
    if (Math.random() < 0.35) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 280);
    }
  }, 6500);

  bot.on('end', (reason) => {
    console.log('Бот отключился. Причина:', reason);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Ошибка:', err.message);
  });

  bot.on('kicked', (reason) => {
    console.log('Кикнут:', reason);
  });
}

createBot();

const mineflayer = require('mineflayer');

const host = process.env.HOST;
const username = process.env.USERNAME || process.env.BOT_USERNAME;
const password = process.env.PASSWORD;

function createBot() {
  const bot = mineflayer.createBot({
    host: "pashasmp.mcsh.io",
    port: 25565,
    username: "afkbot",
    version: "1.21.11",
    auth: "offline"
  });

  bot.on('spawn', () => {
    console.log('✅ Бот зашёл на сервер!');

    setTimeout(() => {
      bot.chat('/login ' + String(pashoks));   // ← Исправлено
      console.log('Отправлена команда /login');
    }, 3000);
  });

  // Анти-AFK
  setInterval(() => {
    if (!bot.entity) return;
    bot.look(Math.random() * Math.PI * 2, Math.random() * 0.6 - 0.3);
    
    if (Math.random() < 0.4) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }
  }, 6000);

  bot.on('end', (reason) => {
    console.log('Отключился:', reason);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Ошибка:', err.message));
  bot.on('kicked', (reason) => console.log('Кикнут:', reason));
}

createBot();

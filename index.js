const mineflayer = require('mineflayer');

function createBot() {
  console.log('Запуск бота...');

  const bot = mineflayer.createBot({
    host: "pashasmp.mcsh.io",   // твой айпи
    port: 25565,
    username: "afkbot",         // ник бота
    version: "1.21.1",
    auth: "offline"
  });

  bot.on('spawn', () => {
    console.log('✅ Бот успешно зашёл на сервер!');

    // Авто логин
    setTimeout(() => {
      bot.chat('/login "pashoks');
      console.log('✅ Команда /login отправлена');
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
    console.log('Бот отключился:', reason);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Ошибка:', err.message));
  bot.on('kicked', (reason) => console.log('Кикнут:', reason));
}

createBot();

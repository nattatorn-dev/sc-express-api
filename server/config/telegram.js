import TelegramBot from 'node-telegram-bot-api';
import config from './env';

const bot = new TelegramBot(config.telegram.token, {polling: true});

export default bot;

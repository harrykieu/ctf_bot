require('dotenv').config();
const Handler = require('./handler/handler.js');
const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents:[
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent
]});

const finder = 0;
client.on('ready',() => {
    console.log('bot is ready');
});

client.on('messageCreate',(message) => {
    Handler.handle(client,message,finder);
})

client.login(process.env.DISCORD_TOKEN);
const find = require('../commands/find');

require('dotenv').config();

module.exports = {
    async handle(client, message, finder) {
        const raw_msg = message.content;
        if (!raw_msg.startsWith(process.env.PREFIX) || message.author.bot) {
            return;
        }
        const command = raw_msg.split(" ")[0].substring(process.env.PREFIX.length);
        const args = raw_msg.split(" ").slice(1).join(" ");

        if (command == 'find') {
            const Find = require('../commands/find');
            Find.execute(message,client,finder,args);
        }
    }
}
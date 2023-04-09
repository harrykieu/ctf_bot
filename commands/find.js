const { EmbedBuilder  } = require('discord.js');

module.exports = {
    name: 'find',
    description: 'find ctf',

    async execute(message, client, finder, args){
        let list_msg = [];
        let date = 0;
        if (args == "today") {date = Date.now();}
        else {
            const [day, month, year] = args.split("/");
            console.log(day,month,year);
            const dateObj = new Date(`${year}-${month}-${day}`);
            date = dateObj.getTime()/1000; //convert date to timestamp
        }
        console.log(date)
        let url = `https://ctftime.org/api/v1/events/?limit=10&start=${date}&finish=${date+1000000}`
        console.log(url);
        await fetch(url)
        .then((response) => response.json())
        .then((data) => { 
            for (var x = 0; x<data.length; x++){
                var event = data[x];
                if (event.onsite == false){
                    let msg = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(event.title)
                    .setTimestamp();
                    if (event.description) msg.setDescription(event.description);
                    if (event.ctftime_url) msg.setURL(event.ctftime_url);
                    if (event.logo) msg.setThumbnail (event.logo);
                    list_msg.push(msg);
                }
            }
        });
        console.log(list_msg);
        if (list_msg.length!=0){
            message.channel.send("Here is your results:");
            message.channel.send({embeds:list_msg});
        }
        else message.channel.send("No events available!")
    }
} 

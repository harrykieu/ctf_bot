const { EmbedBuilder  } = require('discord.js');

module.exports = {
    name: 'find',
    description: 'find ctf',

    async execute(message, client, finder, args){
        let timezoneOptions = { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
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
        let url = `https://ctftime.org/api/v1/events/?limit=10&start=${date}&finish=${date+100000}`
        console.log(url);
        await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            try{
            for (var x = 0; x<data.length; x++){
                var event = data[x];
                if (event.onsite == false){
                    let msg = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(event.title)
                    .setTimestamp();
                    if (event.description) msg.setDescription(event.description.substring(0, 100) + "..."); // avoid embed description too long
                    if (event.start && event.finish) {
                        let startDate = new Date(Date.parse(event.start));
                        let finishDate = new Date(Date.parse(event.finish));
                        let formattedStartDate = new Intl.DateTimeFormat('vi-VN', timezoneOptions).format(startDate);
                        let formattedFinishDate = new Intl.DateTimeFormat('vi-VN', timezoneOptions).format(finishDate);
                        msg.addFields(
                        {
                            name: 'Duration', value: `${formattedStartDate} - ${formattedFinishDate}`
                        });
                    if (event.ctftime_url) msg.setURL(event.ctftime_url);
                    if (event.logo) msg.setThumbnail (event.logo);
                    list_msg.push(msg);
                }
            }}}
            catch (error) {
                console.log(error);
            }
        });
        console.log(list_msg);
        console.log()
        if (list_msg.length!=0){
            message.channel.send("Here is your results:");
            message.channel.send({embeds:list_msg});
        }
        else message.channel.send("No events available!")
    }
} 

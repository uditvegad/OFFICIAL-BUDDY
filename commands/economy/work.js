const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: "work",
  category: "economy",
  description: "work to earn money",
  aliases : ["wr"],
run: async (bot, message, args) => {
    
    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTitle(message.author.username)
        .setColor("RED")
        .setDescription(`❌  You have already worked 
🔮Try again in ${time.minutes}m ${time.seconds}s `)
        .setTimestamp()
      message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(message.author.username)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setDescription(`☑️ You worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}
}



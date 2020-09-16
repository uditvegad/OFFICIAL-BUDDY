const snekfetch = require('snekfetch');
const token = require('../../config.json').arcadia;

module.exports = {
  name:"triggered",
  description:"trigger some one",
  category:"fun",
  aliases:["tg"],
run: async (bot, message, args) => {

    let target = message.mentions.users.first() || message.guild.members.get(args[0]).user || message.author;
    let profilepic = target.avatarURL;
    let url = `https://arcadia-api.xyz/api/v1/triggered?url=${profilepic}`;

    message.channel.startTyping();

    snekfetch.get(url, {
        headers: {
            "Authorization": token
        }
    }).then(async res => {
        await message.channel.send({
           files: [{
               attachment: res.body,
               name: `${target.tag}-triggered.gif`
           }]
        }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

}
};
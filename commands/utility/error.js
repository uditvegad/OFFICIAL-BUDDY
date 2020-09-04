const { MessageEmbed } = require("discord.js")

/**

 * Easy to send errors because im lazy to do the same things :p

 * @param {String} text - Message which is need to send

 * @param {TextChannel} channel - A Channel to send error

 */

module.exports = {
  name:"",
  category: "utility",
  run: async (text, channel) => {

    let embed = new MessageEmbed()

    .setColor("RED")

    .setDescription(text)

    .setFooter("Oops something went wrong :(")

    await channel.send(embed)

}
  }
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addrole",
  category: "Administration",
  usage: "addrole <mention> <role name (don't mention the role)>",
  description: "Adds a role to the mentioned member.",
  aliases: ["add"],
  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member)
      return message.channel.send('Please mention a user or provide a valid user ID');
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('You cannot add a role to someone with an equal or higher role');

    const role = message.mentions.roles.first(); 

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (!role)
      return message.channel.send('Please mention a role or provide a valid role ID');
    else if (member.roles.cache.has(role.id))
      return message.channel.send('User already has the provided role');
    else {
      try {

        await member.roles.add(role);
        const embed = new MessageEmbed()
          .setTitle('Add Role')
          .setDescription(`${role} was successfully added to ${member}.`)
          .addField('Moderator', message.member, true)
          .addField('Member', member, true)
          .addField('Role', role, true)
          .addField('Reason', reason)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);


      } catch (err) {
        return message.channel.send('Please check the role hierarchy');
      }
    }  
  }
};


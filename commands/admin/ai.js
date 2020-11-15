const   db = require('quick.db');

module.exports = {

  name: "setaichannel",

  category: "utility",

  aliases: ["ai"],

  description: "Set a custom ai channel",

  run: async (client, message, args) => {

    if (!message.member.permissions.any(["MANAGE_GUILD", "ADMINISTRATOR"])) {

        return message.channel.send("You don't have **Manage Server** permissions to do this.");

    }

    let toggling = ["disable", "enable"];

    if (!toggling.includes(args[0])) {

        return message.channel.send("Please provide a valid options. Either **disable** or **enable** it.");

    }

    if (args[0] === "enable") {

        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send("Please provide the channel that you want to make it as an audit log.");

        await db.set(`ai.${message.guild.id}.modlog.toggle`, true);

        await db.set(`ai.${message.guild.id}.modlog.channel`, channel.id);

        return message.channel.send(`The Ai chat channel has been enabled for <#${channel.id}>`);

    }

    if (args[0] === "disable") {

        let toggle = db.get(`moderation.${message.guild.id}.modlog.toggle`);

        if (!toggle || toggle == false) return message.channel.send("I guess, the Mod logs has already been disabled before.");

        await db.set(`ai.${message.guild.id}.modlog.toggle`, false);

        await db.delete(`ai.${message.guild.id}.modlog.channel`);

        return message.channel.send("The Ai chat has been disabled.");

    }

}

  }


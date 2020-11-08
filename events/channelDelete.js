
const { MessageEmbed } = require("discord.js");

const db = require("quick.db");

const Color = `RANDOM`;

 
module.exoprts.run= async(client, message, channel) => {
  if (
    channel.type === "category" ||
    channel.type === "dm" ||
    channel.type === "unknown"
  )
    return;

  let Channel = await db.fetch(`Logging_${channel.guild.id}`);
  if (Channel === null) return;

  let Typed;
  if (channel.type === "text") {
    Typed = "Text";
  } else if (channel.type === "voice") {
    Typed = "Voice";
  } else if (channel.type === "news") {
    Typed = `News`;
  } else {
    Typed = `Store`;
  }

  let Nsfw;
  let Limit;

  if (channel.type !== "voice") {
    Nsfw = channel.nsfw ? "Yes" : "No";
  } else {
    Limit = channel.userLimit > 0 ? channel.userLimit : "Unlimited";
  }

  let Pos;
  if (channel.position === "-1") {
    Pos = `Last`;
  } else {
    Pos = channel.position + 1;
  }

  let Embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`Channel Deleted!`)
    .setDescription(`A Channel Is Deleted!`)
    .addField(`Name`, channel.name, true)
    .addField(`Type`, Typed, true)
    .addField(`ID`, channel.id, true)
    .addField(`Category`, channel.parent, true)
    .addField(`Position`, Pos, true)
    .addField(
      `${channel.type !== "voice" ? "Nsfw" : "Users Limit"}`,
      `${channel.type !== "voice" ? Nsfw : Limit}`
    )
    .addField(
      `${channel.type !== "voice" ? "Topic" : "Created Date"}`,
      `${
        channel.type !== "voice"
          ? channel.topic || "No Topic!"
          : channel.createdAt.toDateString()
      }`
    )
    .setTimestamp();

  return client.channels.cache.get(Channel).send(Embed);
});
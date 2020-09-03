

module.exports = {
  
    name: "skip",
    description: "To skip the current music",
    usage: "",
    aliases: ["s"],
  
  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to play music!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return message.channel.send("There is nothing playing that I could skip for you.", message.channel);
    serverQueue.connection.dispatcher.end("Skiped the music");
    message.react("✅")
  },
};

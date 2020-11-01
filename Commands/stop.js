const Discord = require('discord.js')


module.exports = {
    name: "stop",
    execute(client, message, args) {

        const serverQueue = message.client.queue.get(message.guild.id);
        const { channel } = message.member.voice;
        console.log(`[SISTEMA] - Stop utilizado`.brightCyan)
        if(!channel) {
            return message.channel.send(`Você precisa estar em um canal de voz.`);
        }

        if(!serverQueue) {
            message.channel.send(`Não há nenhuma música tocando.`)
        } else {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["stop"]
}
exports.help = {
    nome: "stop",
    descrição: "",
    uso: "Aumenta ou diminiu o volume",
    categoria: "Música"
}
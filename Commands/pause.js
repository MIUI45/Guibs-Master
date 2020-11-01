const Discord = require('discord.js')


module.exports = {
    name: "pause",
    execute(client, message, args) {
        const { channel } = message.member.voice
        const serverQueue = message.client.queue.get(message.guild.id)
        console.log(`[SISTEMA] - Pause utilizado`.brightCyan)
        if(!channel) {

            return message.channel.send(`Você precisa estar em um canal de voz.`);
        }

        
        if(!serverQueue) {

            message.channel.send(`Não há nenhuma música tocando.`)
        } else if(serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause(true)
            message.channel.send(`A música foi pausada com sucesso.`)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["pausar"]
}
exports.help = {
    nome: "pause",
    descrição: "Pausa a música",
    uso: "pause",
    categoria: "Música"
}

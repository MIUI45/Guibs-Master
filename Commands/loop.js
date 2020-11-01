const Discord = require('discord.js')


module.exports = {
    name: "loop",
    execute(client, message, args) {

        const serverQueue = message.client.queue.get(message.guild.id);
        const { channel } = message.member.voice;

        if(!channel) {
            return message.channel.send(`Você precisa estar em um canal de voz.`);
        }

        if(!serverQueue) {
            message.channel.send(`Não há nenhuma música tocando.`)
        } else {
            serverQueue.songs[0].loop = !serverQueue.songs[0].loop
            console.log(`[SISTEMA] - loop utilizado`.brightCyan)
            message.channel.send(`O loop agora está ${serverQueue.songs[0].loop ? 'ativado' : 'desativado'}.`)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["repeat"]
}
exports.help = {
    nome: "loop",
    descrição: "Da loop na música ou na queue",
    uso: "loop",
    categoria: "Música"
}
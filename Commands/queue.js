const Discord = require('discord.js')
const { config } = require('..')


module.exports = {
    name: "queue",
    execute(client, message, args) {

        const serverQueue = message.client.queue.get(message.guild.id)

        if(!serverQueue) {
            message.channel.send(`Não há nenhuma música tocando.`)
        } else {
            let queueSongs = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('LISTA DE MÚSICAS')
            .setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ". " + `[${song.title}](${song.url})`)
                .join("\n")}`,
              { split: true })
            .setThumbnail(serverQueue.songs[0].thumbnail)
            .setFooter(`Tocando agora: ${serverQueue.songs[0].title}`)
            console.log(`[SISTEMA] - Queue utilizado`.brightCyan)
            message.channel.send(queueSongs)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["q", "fila"]
}
exports.help = {
    nome: "queue",
    descrição: "Mostra a fila de música",
    uso: "queue",
    categoria: "Música"
}

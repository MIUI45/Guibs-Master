const Discord = require('discord.js');
const { config } = require('..');


module.exports = {
    name: "np",
    execute(client, message, args) {

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue) {
            message.channel.send(`Não há nenhuma música tocando.`)
        } else {
            let playingNow = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle('TOCANDO AGORA')
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
            .setThumbnail(serverQueue.songs[0].thumbnail)
            .setFooter(`${message.author.tag} - Guibs`, message.author.avatarURL())
            .setTimestamp()
            console.log(`[SISTEMA] - np utilizado`.brightCyan)
            message.channel.send(playingNow)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["np", "playingnow"]
}
exports.help = {
    nome: "nowplaying",
    descrição: "Mostra a música tocando agora",
    uso: "nowplaying",
    categoria: "Música"
}

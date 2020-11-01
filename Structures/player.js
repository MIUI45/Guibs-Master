const ytdlDiscord = require("ytdl-core-discord");
const Discord = require("discord.js")
console.log("[PLAYER] - Player carregado com sucesso.".brightCyan);
const config = require("../config.json")

module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
    
      return queue.textChannel.send('A lista de músicas acabou.')
    }

    try {
      var stream = await ytdlDiscord(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send('Essa música contém Copyright.')
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream, { type: "opus" })
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);
  
    dispatcher.setVolumeLogarithmic(queue.volume / 100); 

    let startingPlayEmbed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setTitle('TOCANDO AGORA')
    .setDescription(`[${song.title}](${song.url})\n\nCanal: **${song.owner}**\nCurtidas: **${song.likes}**\nNão gostei: **${song.dislikes}**\nDuração: **${song.duration}**\nPublicado em: **${song.published}**`)
    .setFooter(`Clique na reação para adicionar a música aos favoritos.`)
    .setTimestamp()
    .setThumbnail(song.thumbnail)

    await queue.textChannel.send(startingPlayEmbed).then(msg => {
      msg.react('750149748471758909')
      

      let filtro = (reaction, usuario) => reaction.emoji.id  === '750149748471758909' && usuario.id === message.author.id
      let coletor = msg.createReactionCollector(filtro, {max: 1})
      coletor.on('collect', cp => {
        queue.textChannel.send(`${message.author} você adicionou a música aos favoritos, deixei ela guardada na sua DM.`)
        
        let membroAmei = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('FAVORITOS')
        .setDescription(`[${song.title}](${song.url})\n\nCanal: **${song.owner}**\nCurtidas: **${song.likes}**\nNão gostei: **${song.dislikes}**\nDuração: **${song.duration}**\nPublicado em: **${song.published}**`)
        .setFooter(`${message.author.tag} - Guibs`, message.author.avatarURL())
        .setTimestamp()
        .setThumbnail(song.thumbnail)
        message.author.send(membroAmei).catch(err => {"Não foi possivel adicionar a música ao seus favoritos."})
      })
    })
  }
};
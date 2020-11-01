const Discord = require("discord.js")
const QUEUE_LIMIT = "10"
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI("AIzaSyBicEEIxgDmMy2DLnqXc1cD-A5n4hwbKmI");
const { play } = require("../Structures/player.js");
const config = require("../config.json")


module.exports = {
  name: 'play',
  async execute(client, message, args) {

    if (!args.length) {
      return message.channel.send('Você precisa me dizer o nome ou link da música.');
    }
    console.log(`[SISTEMA] - Play utilizado`.brightCyan)
    const { channel } = message.member.voice;
        
    if (!channel) {
      return message.channel.send("Você precisa estar em um canal de voz.");
    }

    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send('Não encontrei essa música ou playlist.');
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };
    
    const voteConstruct = {
      vote: 0,
      voters: []
    }

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0]);
      
        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: songData.videoDetails.lengthSeconds,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
          owner: songData.videoDetails.ownerChannelName,
          published: songData.videoDetails.publishDate,
          likes: songData.videoDetails.likes,
          dislikes: songData.videoDetails.dislikes
        };
      } catch (error) {
        if(message.include === "copyright") {
            return message.channel.send('Essa música contém Copyright.')
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
          
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songData = await ytdl.getInfo(result[0].url);
      
        song = {
          title: songData.videoDetails.title,
          url: songData.videoDetails.video_url,
          duration: songData.videoDetails.lengthSeconds,
          thumbnail: songData.videoDetails.thumbnail.thumbnails[3].url,
          owner: songData.videoDetails.ownerChannelName,
          published: songData.videoDetails.publishDate,
          likes: songData.videoDetails.likes,
          dislikes: songData.videoDetails.dislikes
        };
      } catch (error) {
        console.log(error)
        if(error.errors[0].domain === "usageLimits") {
          return message.channel.send('RATE LIMIT')
        }
      }
    }

    if (serverQueue) {
        if(serverQueue.songs.length > Math.floor(QUEUE_LIMIT- 1) && QUEUE_LIMIT !== 0) {
        
        return message.channel.send(`Não é possivel adicionar mais de **${QUEUE_LIMIT}** músicas a fila.`)
  }
       
      serverQueue.songs.push(song);
      let addQ = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle('**NOVA MÚSICA NA FILA**')
      .setDescription(`**[${song.title}](${song.url})**\n\nCanal: **${song.owner}**\nCurtidas: **${song.likes}**\nNão gostei: **${song.dislikes}**\nDuração: **${song.duration}**\nPublicado em: **${song.published}**`)
      .setFooter(`${message.author.tag} - Guibs`, message.author.avatarURL())
      .setTimestamp()
      .setThumbnail(song.thumbnail)

      return message.channel.send(addQ)

    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);
       message.client.vote.set(message.guild.id, voteConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();

        return message.channel.send('Desculpe, ocorreu um erro em meu sistema.')
        .catch(console.error)
      }
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: ["p"]
}
exports.help = {
  nome: "play",
  descrição: "",
  uso: "toca musica",
  categoria: "Música"
}
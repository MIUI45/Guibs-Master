const Discord = require("discord.js")


module.exports = {
  name: "skip",
  execute(client, message, args) {

  const { channel } = message.member.voice;
  const serverQueue = message.client.queue.get(message.guild.id);
  const vote = message.client.vote.get(message.guild.id)
  console.log(`[SISTEMA] - Skip utilizado`.brightCyan)
    if(!channel) {
        return message.channel.send(`Você precisa estar em um canal de voz.`);
    }

    if(!serverQueue) {

        message.channel.send(`Não há nenhuma música tocando.`)
    } 
    
    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)

    console.log(message.guild.me.voice.channel.members.size)

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        if(vote.vote >= okie) {
        serverQueue.connection.dispatcher.end();

        message.channel.send(`A música foi pulada com sucesso.`)
    }
       
    if(vote.voters.includes(message.author.id)) {

        message.channel.send(`Você já votou para pular essa música.`)
    } else {
        vote.vote++
        vote.voters.push(message.author.id)

        if(Math.floor(vcvote - vote.vote) === 0) return;

        message.channel.send(`Você votou para pular essa música, é preciso mais **${Math.floor(vcvote - vote.vote)}** votos para eu pular a música.`)
      }
    }

    if(message.member.hasPermission('ADMINISTRATOR')) {
        serverQueue.connection.dispatcher.end();


        message.channel.send(`A música foi pulada com sucesso.`)
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: ["pular"]
}
exports.help = {
  nome: "skip",
  descrição: "Pula uma música",
  uso: "skip",
  categoria: "Música"
}

const { MessageEmbed } = require('discord.js')
const config = require("../config.json")


module.exports = {
  name: "avatar",
  execute(client, message, args) {

let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

let avatar = user.avatarURL({ format: 'png', dynamic: true, size: 2048 });

    let embed = new MessageEmbed()
      .setColor(config.color)
      .setDescription(`**Avatar de** **${user.username}** [Link direto para download](${avatar})`)
      .setImage(avatar)
      .setFooter(`Pedido por: ${message.author.tag}`)
      console.log(`[SISTEMA] - Avatar utilizado`.brightCyan)
    message.channel.send(embed)
    }
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliase: ["av"]
}
exports.help = {
  nome: "avatar",
  descrição: "Mostra o avatar",
  uso: "avatar [ID, MENÇÃO]",
  categoria: "Outros"
}

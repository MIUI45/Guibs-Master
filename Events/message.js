const {client} = require("../index.js");
const config = require("../config.json");
const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

client.on("message", async message => {

if(message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) {

    embed.setTitle("**INFO**")
    embed.setThumbnail(client.user.avatarURL())
    embed.setColor(config.color)
    embed.setDescription(`Meu prefixo é: \`\`${config.prefix}\`\` \nPara mais ajuda use \`\`${config.prefix}ajuda\`\`.`)
    embed.setFooter(`${message.author.tag} - Manutenção: Desativado`)
    return message.channel.send(embed)
}
})

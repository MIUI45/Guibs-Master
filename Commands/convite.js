const {client} = require("..");
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()


module.exports = {
    name: "convite",
    execute(client, message, args) {
		embed.setTitle("**Convide o Guibs**")
        embed.setColor(config.color)
        embed.setThumbnail(client.user.avatarURL())
        embed.setTimestamp()
        embed.setDescription(`Ajude seu servidor me adicionando!\n**Guibs Invite Link:**\n[Clique Aqui](${(config.invite)})`)
        console.log(`[SISTEMA] - Convite utilizado`.brightCyan)
		return message.channel.send(embed)
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["convidar"]
}
exports.help = {
    nome: "convite",
    descrição: "",
    uso: "convide o guibs",
    categoria: "Outros"
}
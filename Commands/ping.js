const {client} = require("..");
const config = require("../config.json")
const { MessageEmbed } = require('discord.js')
const embed = new MessageEmbed()

module.exports = {
    name: "ping",
    execute(client, message, args) {
		embed.setTitle("🧐 **|** Guibs Ping")
		embed.setColor(config.color)
        embed.setDescription(`**Latência:** \`${client.ws.ping}ms\`\n**API:** \`${Date.now()-message.createdTimestamp}ms\``)
        console.log(`[SISTEMA] - Ping utilizado`.brightCyan)
        return message.channel.send(embed)
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["ping"]
}
exports.help = {
    nome: "ping",
    descrição: "",
    uso: "veja a latencia do bot",
    categoria: "Outros"
}
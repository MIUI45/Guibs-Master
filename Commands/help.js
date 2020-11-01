const config = require("../config.json")
const { MessageEmbed } = require('discord.js') 


module.exports = {
    name: "ajuda",
    execute(client, message, args) {
		
	var embed = new MessageEmbed()
	embed.setColor(config.color)
	embed.setDescription(`Comandos no total: \`${client.commands.size}\`\nCriado por: \`${client.users.cache.get("709883330472050768").tag}\`\nPrefixo: \`${(config.prefix)}\``)
	embed.setAuthor(`${client.user.username}`, `${client.user.avatarURL()}`)
	embed.setTimestamp()
	embed.setFooter(`Não inclua <> ou [], isso significa <> é necessário e [] é opcional" | Guibs ${config.versão}`);
	embed.addField(`Outros`, `\`avatar | botinfo | convite | ajuda   ping | userinfo | say | clear | fake   rbug | updates\``)
	embed.addField(`Música`, `\`play | stop | pause | queue | loop   skip | volume | np\``)
	embed.addField(`Economia`, `\`daily | work | loja | buy | weekly   perfil | sell | depositar | saldo | pay | sacar\``)
	embed.addField(`Desenvolvedor`, `\`eval\``)
	console.log(`[SISTEMA] - Ajuda utilizado`.brightCyan)
	message.channel.send(embed)
}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["ajuda", "comandos", "cmds"]
}
exports.help = {
    nome: "help",
    descrição: "Mostra os comandos do bot",
    uso: "help [COMANDO]",
    categoria: "Outros"
}
const Discord = require('discord.js')
const config = require("../config.json")



module.exports = {
    name: "e",
    async execute(client, message, args) {
if(config.EVAL.includes(message.author.id) == false) {
    return message.channel.send("Sem perm irmão")
}
        try {
            if(!args.join(' ')) return message.reply('Escreve ai')
            let code = await eval(args.join(" "));
            if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
            let embed = new Discord.MessageEmbed()
            .setTitle("**Eval**")
            .setColor(config.color)
            .addField('📩 Entrada', `\`\`\`js\n${args.join(" ")}\`\`\``)
            .addField('🚩 Saída', `\`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
            if(code.length > 1010) embed.addField('🚩 Continuação do Resultado', `\`\`\`js\n${code.slice(1010, 2020)}\n\`\`\``)
            message.reply({embed})
        } catch(e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["e"]
}
exports.help = {
    nome: "eval",
    descrição: "",
    uso: "only for dev",
    categoria: "Desenvolvedor"
}
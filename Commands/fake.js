const Discord = require("discord.js");

module.exports = {
    name: 'fake',
    execute(client, message, args) {
    message.delete()
    try {
    let user;

    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
  
    } else if(args[0]) {
        user = client.users.get(args[0]);

    }
    let botmessage = args.slice(1).join(' ')

    if (args[0] == null) {return message.channel.send(`${message.author}, **Mencione um usuário !**`)}


    if (args[1] == null) {return message.channel.send(`${message.author}, **Diga algo !**`)}
    message.channel.createWebhook(user.username, {avatar: user.displayAvatarURL(), reason: 'Comando fake'}).then(async function (w) {
        w.send(botmessage);
        w.delete();
    })

    } catch (err) {
        message.reply('**Eu não tenho permissão para criar um Webhook neste servidor, ou não encontrei este usuário.**')
    }
}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["fake"]
}
exports.help = {
    nome: "fake",
    descrição: "",
    uso: "finja ser outra pessoa",
    categoria: "Outros"
}
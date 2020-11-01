module.exports = {
    name: 'say',
    execute(client, message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Você não tem permissão para usar este comando.");
    
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o => { });
    message.channel.send(sayMessage);
    
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["diz"]
}
exports.help = {
    nome: "say",
    descrição: "",
    uso: "digite o que quer que o bot fale",
    categoria: "Outros"
}
const Discord = require('discord.js');
const config = require("../config.json");


module.exports = {
    name: 'volume',
    async execute(client, message, args) {

        const serverQueue = message.client.queue.get(message.guild.id);
        const { channel } = message.member.voice;
        let volume = args[0]
        console.log(`[SISTEMA] - Volume utilizado`.brightCyan)
        if(!channel) {
            return message.channel.send("Você precisa estar em um canal de voz.");
        }

        if(!serverQueue) {
           return message.channel.send(`Não há nenhuma música tocando.`)
        } 

        if(!args[0]) {
            message.channel.send('Você precisa me informar o volume entre **0** a **200**.')
        } else if(isNaN(args[0])) {
            message.channel.send('O volume precisa ser um número.')
        } else if(args[0] < 0 || args[0] > 200) {
            message.channel.send('Você precisa me informar o volume entre **0** a **200**.')
        } else {
            serverQueue.volume = args[0]
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
            
            message.channel.send(`O volume foi definido para **${args[0]}**.`)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["vol"]
}
exports.help = {
    nome: "volume",
    descrição: "",
    uso: "Aumenta ou diminiu o volume",
    categoria: "Música"
}
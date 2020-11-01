const Discord = require('discord.js');
const { config } = require('..');
const os = require("os");

module.exports = {
    name: "botinfo",
    execute(client, message, args) {
        let dias = 0;
        let semanas = 0;

        let uptime = ``;
        let totalSegundos = (client.uptime / 1000);
        let horas = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = Math.floor(totalSegundos % 60);

        if(horas > 23) {
            dias = dias + 1;
            horas = 0;
        }

        if (dias == 7){
        dias = 0;
        semanas = semanas +1;
        }

        if(semanas > 0){
            uptime += `${semanas} semanas, `;
        }

        if(minutos > 60) {
            minutos = 0;
        }

        uptime += `${dias}d ${horas}h ${minutos}m ${segundos}s`;

        let botinfoEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('**Minhas informações | Guibs**')
        .setTimestamp()
        .setFooter(`${message.author.tag} - Guibs`, message.author.avatarURL())
        .addField(`**ID**`, `\`\`\`${(config.CLIENT_ID)}\`\`\`` , false)
        .addField(`**Criador**`, `\`\`\`${client.users.cache.get("709883330472050768").tag}\`\`\`` , false)
        .addField(`Sistema Operacional`, `\`\`\`${os.platform()}\`\`\``, false)
        .addField(`Processador`, `\`\`\`${os.cpus()[0].model.toString().trim()}\`\`\``, false)
        .addField(`**CPU**`, `\`\`\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``, false)
        .addField(`**Memória RAM**`, `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`\`\``, false)
        .addField(`**Versão**`, `\`\`\`${(config.versão)}\`\`\``, false)
        .addField(`**Servidores**`, `\`\`\`${client.guilds.cache.size}\`\`\``, false)
        .addField(`**Usuários**`, `\`\`\`${client.users.cache.size}\`\`\``, false)
        .addField(`**Canais**`, `\`\`\`${client.channels.cache.size}\`\`\``, false)
        .addField(`**Ping**`, `\`\`\`${Math.round(client.ws.ping)}\`\`\``, false)
        .addField(`**Uptime**`, `\`\`\`${uptime}\`\`\``, false)
        .addField(`**Prefixo**`, `\`\`\`${(config.prefix)}\`\`\``, false)
        console.log(`[SISTEMA] - Botinfo utilizado`.brightCyan)
        message.channel.send(botinfoEmbed)
    }
}
exports.config = {
    aliases: ["bot", "botinfo"]
}

exports.help = {
    nome: "botinfo",
    descrição: "Mostra informaçoes do bot",
    uso: "",
    categoria: "Outros"
}
const color = require("colors");
console.log("[LOGIN] - Iniciando conexão".brightCyan)
const Discord = require("discord.js"); 
const config = require("./config.json");
const fs = require("fs");
const votosZuraaa = require('./Structures/Extensions/votosZuraaa.js');
require('dotenv').config();

const client = new Discord.Client({ disableMentions: 'everyone', ws: { properties: { $browser: 'Discord Android' } } })
client.queue = new Map();
client.vote = new Map();

fs.readdir("./Events/", (err, files) => {
    if(err)
        console.error(err);
    const eventsFiles = files.filter(file => file.split(".").pop() == "js");
    if(eventsFiles.length <= 0)
        return console.warn("[EVENTS] - Não existem eventos para serem carregados".brightCyan);
    console.log("[EVENTS] - Eventos carregados.".brightCyan);
    eventsFiles.forEach((file, i) => {
        require("./Events/" + file);
    });
  });

client.on('message', message => {
    votosZuraaa.verificaVotos(message, (user) => {
        user.send('Obrigado por votar em mim!');
        console.log("[VOTE] O Guibs recebeu um voto!".brightCyan)
    });
})

client.login(process.env.TOKEN);

module.exports = {
    client,
   config,
  }

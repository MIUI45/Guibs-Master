const fs = require("fs");
const {Collection} = require("discord.js");
const config = require("../config.json")
const {client} = require("../index.js");

client.commands = new Collection();

const cmds = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for(const file of cmds){
    const cmd = require("../Commands/" + file);
    client.commands.set(cmd.name , cmd);
}

console.log("[COMANDOS] - Comandos carregados.".brightCyan);

client.on("message", message => {

    if(!message.content.startsWith(config.prefix) || message.author.bot)
        return
    
    const args  = message.content.slice(config.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(!client.commands.has(cmd))
        return;
 
    try{
        client.commands.get(cmd).execute(client, message, args);
    } catch(err){
        console.error(err);
    }
})

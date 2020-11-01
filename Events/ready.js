const { client } = require("../index");
const color = require("colors");
const config = require("../config.json");


client.on("ready", () => {
    console.log(`[LOGIN] - Bot iniciado em ${client.guilds.cache.size} servidores`.brightCyan);
    console.log(`[LOGIN] - Memoria usada ${(process.memoryUsage().rss/1024/1024).toFixed(2)}MB`.bold.brightCyan)
    var presences = [
        {name: `Versão atual: [${(config.versão)}]`, type: 'PLAYING'},
        {name: 'Quer reportar algum bug? Use gb.rbug', type: 'PLAYING'}
]
function setPresence(){
 var altpresence = presences[Math.floor(Math.random() * presences.length)]
 client.user.setActivity(altpresence)
}

setPresence();
setInterval(() => setPresence(), 50000)
})

const channel = (await client.channels.fetch('769583303689764865'))
const message = await channel.message.fetch('')
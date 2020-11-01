const { client } = require("../index");
const { MessageEmbed } = require("discord.js")
const config = require("../config.json");

client.on("guildDelete", guild => {
  client.channels.cache.get(config.LOG_GUILD).send(`❌ Guild: \`${guild.name}\`(\`${guild.id}\`)! Usuários:**${guild.members.cache.filter(m => !m.user.bot).size}** | Bots:**${guild.members.cache.filter(m => m.user.bot).size}** | Região:**${guild.region}**`)
})

module.exports = {
   name: "clear",
   execute(client, message, args) {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) { 
       return message.channel.send("Você não pode executar este comando, falta permissão.") 
    }
 
    if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
       return message.channel.send("Eu não posso fazer isso, não tenho permissão.")
    }
 
     if(!args[0] || isNaN(args[0])) {
 
        return message.channel.send("Você precisa dizer uma quantidade de mensagens que deseja ser apagadas.")
 
        }
 
  if(args[0] < 2 || args[0] > 100) {
        return message.channel.send("Escolha um número entre 2 a 100.")
 
     }
   
 message.channel.bulkDelete(args[0])
 message.delete().catch(O_o => { });
 message.channel.send(`Foram removidas ${args[0]} mensagens pelo ${message.author}`)
 console.log(`[SISTEMA] - Clear utilizado`.brightCyan)
    }
   }
 exports.conf = {
   enabled: true,
   guildOnly: true,
   aliase: ["limpar"]
}
exports.help = {
   nome: "clear",
   descrição: "",
   uso: "limpe o chat",
   categoria: "Outros"
}
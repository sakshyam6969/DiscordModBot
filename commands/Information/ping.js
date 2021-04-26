const {Message , Client} = require('discord.js')

module.exports = {
    name: 'ping' , 
    aliases: [] , 
    guildOnly: false , 
    permissions: "" , 
    args: 0 , 
    usage:"" , 
    cooldown: 5 , 
    description: "Used to find the latency" , 
     async execute(client , message , args  ){
        const msg = await message.channel.send("Pinging....")
        message.channel.send(`🏓Pong\`${msg.createdTimestamp - message.createdTimestamp}ms\``)
        msg.delete()
        message.channel.send(`API latency is \`${client.ws.ping}\``)
    }
}
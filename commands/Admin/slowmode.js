const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'slowmode' , 
    aliases: [] , 
    guildOnly: true , 
    permissions: "" , 
    args: 0 , 
    usage:"" , 
    cooldown: 5 , 
    description: "Makes an embed" ,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client , message , args){
        if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set the slowmode of this channel too **${args[0]}** `
    );
         

    }
}
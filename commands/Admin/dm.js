const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'dm' , 
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
        if (!message.member.permissions.has('ADMINISTRATOR'))
        return message.channel.send("You do not have enough permissions!");
        
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `You did not mention a user, or you gave an invalid id`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("You did not specify your message");
      user.user
        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send("That user could not be DMed!"))
        .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
         

    }
}
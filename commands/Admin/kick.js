const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'kick' , 
    aliases: [] , 
    guildOnly: true , 
    permissions: "" , 
    args: 0 , 
    usage:"" , 
    cooldown: 5 , 
    description: "Kicks a member" ,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client , message , args){
        let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
    // If we have a user mentioned
    if (user) {
      
      const member = message.guild.member(user);
  
      if (member) {
        
        member
          .kick()
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
       
        message.reply("That user isn't in this guild!");
      }
     
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  

    }
}
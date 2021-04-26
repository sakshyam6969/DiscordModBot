const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'ban' , 
    aliases: [] , 
    guildOnly: true , 
    permissions: "" , 
    args: 0 , 
    usage:"" , 
    cooldown: 5 , 
    description: "bans a member" ,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client , message , args){
        const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        
        member
          .ban({reason:'You are bad'})
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
          });
      } else {
       
        message.reply("That user isn't in this guild!");
      }
     
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  

    }
}
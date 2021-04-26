const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'lock' , 
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
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.channel.send("You don't have enough Permissions")
            }
           let role = message.guild.id

           message.channel.updateOverwrite(role , {SEND_MESSAGES: false , ADD_REACTIONS: false})
           const embed = new MessageEmbed()
            .setTitle("Channel Updates")
            .setDescription(`🔒 ${message.channel} has been locked`)
            .setColor("RED");
            await message.channel.send(embed);
            message.delete();
         

    }
}
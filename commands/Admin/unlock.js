const {Message , Client , MessageEmbed} = require('discord.js')


module.exports = {
    name:'unlock' , 
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
        if (!message.member.hasPermission('MANAGE_CHANNELS')){
            return message.channel.send("You don't have enough Permissions")
        }
           let role = message.guild.id

           message.channel.updateOverwrite(role , {SEND_MESSAGES: true , ADD_REACTIONS: true})
            const embed = new MessageEmbed()
            .setTitle("Channel Updates")
            .setDescription(`🔓 ${message.channel} has been Unlocked`)
            .setColor("GREEN");
            await message.channel.send(embed);
            message.delete();
         

    }
}
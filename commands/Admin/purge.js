const {Message , Client } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'purge' , 
    aliases: [''] , 
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
       if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have enough permissions")
       if(!args[0]) return message.channel.send("Please preovide a number from 1 to 99")
       if(isNaN(args[0])) return message.channel.send("Please provide a valid number from 1 to 99")
       if(args[0] > 99) return message.channel.send("Please provide a number from 1 to 99")
       if(args[0] < 1) return message.channel.send("Please provide a vali number above 1 to 99")

       await message.channel.messages.fetch({limit: args[0]}).then(messages => {
           message.channel.bulkDelete(messages)
       })

    }
}
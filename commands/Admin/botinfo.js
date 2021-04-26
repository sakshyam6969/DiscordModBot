const {Message , Client, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'botinfo' , 
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
      message.react("♥")
      const embed = new MessageEmbed()
      .setTitle(`My name is ${client.user.username}`)
      .addField("Made by" , "<@!566904426909007872>")
      .addField("version" , "1.0")
      .setColor("BLUE")
      .setTimestamp()
      message.channel.send(embed)

    }
}
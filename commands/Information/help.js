const prefix = '-'
const {MessageEmbed} = require('discord.js')
const  {readdirSync} = require('fs')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(client , message, args) {
		if (!args[0]) {
            let categories = [];
      
            readdirSync("./commands/").forEach((dir) => {
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                file.endsWith(".js")
              );
      
              const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);
      
                if (!file.name) return "No command name.";
      
                let name = file.name.replace(".js", "");
      
                return `\`${name}\``;
              });
      
              let data = new Object();
      
              data = {
                name: dir.toUpperCase(),
                value: cmds.length === 0 ? "In progress." : cmds.join(" "),
              };
      
              categories.push(data);
            });
      
            const embed = new MessageEmbed()
              .setTitle(`RoNorth`)
              .addFields(categories)
              .setDescription(
                "Need help ❓❓, Here are all my commands"
              )
              .setFooter(
                `${client.user.username}`
              )
              .setTimestamp()
              .setColor("GREEN");
            return message.channel.send(embed);
	}
    }
}
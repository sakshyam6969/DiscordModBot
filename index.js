const {Message , Client , Collection } = require('discord.js')
const client = new Client()
const fs = require('fs')
const config = require('./config.json')

const prefix = "-"


client.commands = new Collection()
client.cooldowns = new Collection()

const command_folders = fs.readdirSync("./commands")

for(const folder of command_folders){
  const command_files =   fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"))
  for(const file of command_files){
      const command = require(`./commands/${folder}/${file}`)
      console.log(`Loaded ${file}`)
      client.commands.set(command.name , command)
  }

}

client.on('ready' , () => {
    console.log(`Logged in as ${client.user.username}`)
})

client.on('message' , message => {
    if(message.author.bot) return

	if(!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command_name = args.shift().toLowerCase()
    
    const command = client.commands.get(command_name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name))
    if(!command) return

    if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute( client , message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	

	


})





client.login(config.token)


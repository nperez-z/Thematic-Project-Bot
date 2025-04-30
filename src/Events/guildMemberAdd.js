module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
      const channel = member.guild.systemChannel || member.guild.channels.cache.find(ch => ch.name === 'general');
      if (!channel) return;
  
      channel.send(`👋 Hello there and welcome to the server, ${member.user.tag}!`);
    },
  };
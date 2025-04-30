module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
      const channel = member.guild.systemChannel || member.guild.channels.cache.find(ch => ch.name === 'general');
      if (!channel) return;
  
      channel.send(`😢 ${member.user.tag} has left the server.`);
    },
  };
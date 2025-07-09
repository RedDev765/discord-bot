module.exports = {
  name: "tempmute",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageRoles")) return message.channel.send("❌ Permission refusée.");
    const user = message.mentions.members.first();
    const duration = parseInt(args[1]) * 1000;
    const role = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!user || isNaN(duration) || !role) return message.channel.send("❗ Utilisation: !tempmute @user <secondes>");
    await user.roles.add(role);
    message.channel.send(`${user.user.tag} a été mute pendant ${args[1]} secondes.`);
    setTimeout(async () => {
      await user.roles.remove(role);
      message.channel.send(`${user.user.tag} a été unmute.`);
    }, duration);
  }
};

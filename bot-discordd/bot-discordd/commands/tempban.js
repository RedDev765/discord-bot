module.exports = {
  name: "tempban",
  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) return message.channel.send("❌ Permission refusée.");
    const user = message.mentions.members.first();
    const duration = parseInt(args[1]) * 1000;
    const reason = args.slice(2).join(" ") || "Aucune raison donnée";
    if (!user || isNaN(duration)) return message.channel.send("❗ Utilisation: !tempban @user <secondes> [raison]");
    try {
      await user.send(`Tu es temporairement banni de **${message.guild.name}** pour ${args[1]}s. Raison : ${reason}`);
    } catch {}
    await user.ban({ reason });
    message.channel.send(`${user.user.tag} a été banni pour ${args[1]} secondes.`);
    setTimeout(async () => {
      await message.guild.members.unban(user.id);
      message.channel.send(`${user.user.tag} a été débanni.`);
    }, duration);
  }
};

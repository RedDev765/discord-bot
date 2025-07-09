module.exports = {
  name: "report",
  execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ") || "Aucune raison donnée";
    if (!user) return message.channel.send("❗ Mentionne un utilisateur à signaler.");
    const logChannel = message.guild.channels.cache.find(c => c.name === "mod-logs");
    if (!logChannel) return message.channel.send("❌ Salon 'mod-logs' introuvable.");
    logChannel.send(`🚨 **Signalement** par ${message.author.tag} contre ${user.tag} : ${reason}`);
    message.channel.send("✅ Le signalement a été envoyé.");
  }
};

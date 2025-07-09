module.exports = {
  name: "ban",
  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) {
      return message.channel.send("❌ Tu n'as pas la permission de bannir.");
    }
    const user = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Aucune raison fournie";
    if (!user) return message.channel.send("❗ Mentionne un utilisateur.");
    if (user.id === message.author.id)
      return message.channel.send("❌ Tu ne peux pas te bannir.");
    try {
      await user.send(
        `Tu as été banni du serveur **${message.guild.name}**. Raison : ${reason}`,
      );
    } catch {}
    await user.ban({ reason });
    await message.channel.send(
      `${user.user.tag} a été banni. Raison : ${reason}`,
    );
  },
};

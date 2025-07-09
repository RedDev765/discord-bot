module.exports = {
  name: "kick",
  async execute(message, args) {
    // 1. Vérifier les permissions
    if (!message.member.permissions.has("KickMembers")) {
      return message.channel.send("❌ Tu n'as pas la permission de faire cela.");
    }

    // 2. Récupérer le membre mentionné
    const user = message.mentions.members.first();
    if (!user) {
      return message.channel.send("❗ Tu dois mentionner un utilisateur à kick.");
    }

    // 3. Récupérer la raison
    const reason = args.slice(1).join(" ") || "Aucune raison fournie";

    // 4. Empêcher de se kick soi-même ou de kicker le bot
    if (user.id === message.author.id) {
      return message.channel.send("❌ Tu ne peux pas te kick toi-même.");
    }
    if (user.id === message.client.user.id) {
      return message.channel.send("❌ Tu ne peux pas me kick.");
    }

    try {
      // 5. Envoyer un message privé à l'utilisateur
      await user.send(`🚫 Tu as été kick du serveur **${message.guild.name}**.\n📄 Raison : ${reason}`);

      // 6. Kick avec la raison
      await user.kick(reason);

      // 7. Confirmation dans le salon
      await message.channel.send(`✅ L'utilisateur **${user.user.tag}** a été kick.\n📄 Raison : ${reason}`);
    } catch (err) {
      console.error(err);
      await message.channel.send("❌ Une erreur s'est produite pendant le kick.");
    }
  }
};

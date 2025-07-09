module.exports = {
  name: "mute",
  async execute(message, args) {
    // Vérifie que l'auteur a la permission de mute
    if (!message.member.permissions.has("MuteMembers")) {
      return message.channel.send("Tu n'as pas la permission de mute des membres.");
    }

    // Récupère le membre mentionné à mute
    const member = message.mentions.members.first();
    if (!member) {
      return message.channel.send("Tu dois mentionner un utilisateur à mute.");
    }

    // Vérifie que le membre n'est pas l'auteur ou le bot
    if (member.id === message.author.id) {
      return message.channel.send("Tu ne peux pas te mute toi-même.");
    }
    if (member.id === message.client.user.id) {
      return message.channel.send("Je ne peux pas me mute moi-même.");
    }

    // Cherche le rôle "Muted" sur le serveur
    let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

    // Si le rôle n'existe pas, on le crée et configure ses permissions
    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Muted",
          color: "#555555",
          permissions: []
        });

        // Pour chaque salon, on enlève la permission d'envoyer des messages au rôle Muted
        for (const [, channel] of message.guild.channels.cache) {
          await channel.permissionOverwrites.edit(muteRole, {
            SendMessages: false,
            AddReactions: false,
            Speak: false
          });
        }
      } catch (error) {
        console.error(error);
        return message.channel.send("Une erreur est survenue lors de la création du rôle Muted.");
      }
    }

    // Ajoute le rôle Muted au membre
    if (member.roles.cache.has(muteRole.id)) {
      return message.channel.send("Cet utilisateur est déjà mute.");
    }

    try {
      await member.roles.add(muteRole);
      message.channel.send(`${member.user.tag} a été mute avec succès.`);
    } catch (error) {
      console.error(error);
      message.channel.send("Impossible de mute cet utilisateur.");
    }
  }
};

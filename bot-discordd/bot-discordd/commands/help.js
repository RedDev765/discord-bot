const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle("📖 Commandes modération")
      .setDescription("Voici les commandes disponibles pour les modérateurs.")
      .setColor("DarkRed")
      .addFields(
        {
          name: "🚪 `!kick @utilisateur`",
          value: "Expulse un membre du serveur.",
        },
        { name: "🔨 `!ban @utilisateur`", value: "Bannit un utilisateur." },
        {
          name: "🧹 `!clear <nombre>`",
          value: "Supprime entre 1 et 100 messages dans un salon.",
        },
        {
          name: "🤐 `!mute @utilisateur`",
          value: "Donne le rôle 'Muted' à un utilisateur.",
        },
        {
          name: "⏱️ `!tempmute @utilisateur <secondes>`",
          value: "Mute temporairement un membre.",
        },
        {
          name: "⛔ `!tempban @utilisateur <secondes> [raison]`",
          value: "Ban temporaire d’un utilisateur.",
        },
        {
          name: "🔒 `!lock`",
          value: "Verrouille le salon (empêche d’envoyer des messages).",
        },
        {
          name: "📩 `!dm @utilisateur <message>`",
          value: "Envoie un message privé à un utilisateur.",
        },
        {
          name: "⚠️ `!warn @utilisateur [raison]`",
          value: "Ajoute un avertissement à un utilisateur.",
        },
        {
          name: "📋 `!warns @utilisateur`",
          value: "Affiche tous ses avertissements.",
        },
        {
          name: "🕵️ `!report @utilisateur [raison]`",
          value: "Signale un utilisateur au staff.",
        },
      )
      .setFooter({
        text: `Demandé par ${message.author.username}`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

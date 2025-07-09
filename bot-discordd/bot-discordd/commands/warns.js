const warns = new Map();
module.exports = {
  name: "warns",
  execute(message, args) {
    const user = message.mentions.members.first();
    if (!user) return message.channel.send("❗ Mentionne un utilisateur.");
    const userWarns = warns.get(user.id) || [];
    if (userWarns.length === 0) return message.channel.send("✅ Aucun avertissement.");
    const list = userWarns.map((w, i) => `${i + 1}. ${w.reason} (par ${w.by})`).join("\\n");
    message.channel.send(`⚠️ Avertissements pour ${user.user.tag} :\n${list}`);
  }
};

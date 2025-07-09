const warns = new Map();
module.exports = {
  name: "warn",
  execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) return message.channel.send("❌ Permission refusée.");
    const user = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Aucune raison donnée";
    if (!user) return message.channel.send("❗ Mentionne un utilisateur.");
    const id = user.id;
    if (!warns.has(id)) warns.set(id, []);
    warns.get(id).push({ reason, by: message.author.tag });
    message.channel.send(`${user.user.tag} a été averti. Raison : ${reason}`);
  }
};

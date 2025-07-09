module.exports = {
  name: "lock",
  async execute(message) {
    if (!message.member.permissions.has("ManageChannels")) return message.channel.send("❌ Permission refusée.");
    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false });
    message.channel.send("🔒 Ce salon est maintenant verrouillé.");
  }
};

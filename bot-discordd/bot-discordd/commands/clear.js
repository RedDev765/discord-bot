module.exports = {
    name: "clear",
    async execute(message, args) {
        if (!message.member.permissions.has("ManageMessages")) {
            return message.channel.send("Tu ne peux pas faire ça.");
        }

        const amount = parseInt(args[0]);

        if (isNaN(amount) || amount < 1 || amount > 100) {
            return message.channel.send("Le nombre doit être entre 1 et 100!");
        }

        try {
            await message.channel.bulkDelete(amount, true);
            const confirmation = await message.channel.send(
                `${amount} messages ont été supprimés.`,
            );
            setTimeout(() => {
                confirmation.delete();
            }, 3000);
        } catch (err) {
            console.error(err);
            await message.channel.send("Il y a eu une erreur.");
        }
    },
};

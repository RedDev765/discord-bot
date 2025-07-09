require("./keep-alive");

// === PARTIE EXPRESS (serveur web) ===
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Bot en ligne !");
});

const PORT = 3000;
app.listen(PORT, () => {
  const replURL = process.env.REPL_SLUG && process.env.REPL_OWNER
    ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    : "🔗 URL publique non trouvée (lancer depuis Replit)";

  console.log(`🌐 Serveur web lancé sur le port ${PORT}`);
  console.log(`🔗 URL publique : ${replURL}`);
});


// === PARTIE DISCORD ===
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// === Chargement des commandes ===
const commands = new Map();
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.name && typeof command.execute === "function") {
    commands.set(command.name, command);
  } else {
    console.warn(`⚠️ La commande ${file} est invalide.`);
  }
}

// === Bot prêt ===
client.once("ready", () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

// === Message reçu ===
client.on("messageCreate", async message => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send("❌ Une erreur est survenue.");
  }
});

// === Connexion à Discord ===
client.login(process.env.TOKEN);
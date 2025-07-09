const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot en ligne !");
});

app.listen(3000, () => {
  console.log("✅ Serveur web lancé sur le port 3000");
});


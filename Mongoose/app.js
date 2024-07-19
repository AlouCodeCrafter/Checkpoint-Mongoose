const express = require("express");
const connectDB = require("./dataBase"); // Assure-toi que le chemin est correct
const personRoutes = require("./add");

const app = express();

// Connexion à la base de données
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Utilisation des routes définies dans 'personRoutes'
app.use("/api", personRoutes);

const port = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(port, () => console.log(`Serveur lancé au port : ${port}`));

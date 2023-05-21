const express = require("express");
const { success, getUniqueId } = require("./helper");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const favicon = require("serve-favicon");
let pokemons = require("./mock-pokemon");

const app = express();
const port = 3000;

// pas besoin de next ici car morgan & serve favicon le gère en interne
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) =>
  res.send("Hello, Express & Bienvenue dans ce pokédex!😎")
);

// On retourne la liste des pokémons au format JSON, avec un message :
app.get("/api/pokemons", (req, res) => {
  const message = "La liste des pokémons a bien été récupérée.";
  res.json(success(message, pokemons));
});

// On utilise la liste de pokémons dans notre point de terminaison
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Un pokémon a bien été trouvé.";
  //deux param le msg descriptif confirmation & les données du pokémon
  res.json(success(message, pokemon));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le Pokémon ${pokemonCreated.name} a bien été ajouté au pokédex.`;
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

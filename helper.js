exports.success = (message, data) => {
  return {
    message,
    data,
  };
};

//Le code exporte une fonction appelée "getUniqueId" qui prend en entrée un tableau d'objets Pokémon. Il extrait les identifiants des Pokémon à partir des objets et trouve l'identifiant maximal à l'aide de la méthode "reduce".
//Ensuite, il calcule un identifiant unique en ajoutant 1 à l'identifiant maximal. Enfin, il renvoie l'identifiant unique.
exports.getUniqueId = (pokemons) => {
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;

  return uniqueId;
};

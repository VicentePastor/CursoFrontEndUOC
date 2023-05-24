const pokemonListElement = document.getElementById("pokemon-list");
const initialPokemons = [];
const themeSelector = document.querySelector(".selectortema");
const bodyElement = document.querySelector("body");

const pokemonSearchInput = document.getElementById("pokemon-search");
let pokemonCards = []; // Variable para almacenar las tarjetas de Pokémon y usarla en la busqueda.



//Barra de búsqueda
pokemonSearchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();
  
    pokemonCards.forEach(card => {
      const pokemonName = card.querySelector("h3").textContent.toLowerCase();
  
      if (pokemonName.indexOf(searchText) === 0) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  
});


//Selector de Tema
themeSelector.addEventListener("change", function () {
  var inputs = document.getElementsByName("theme");
  var theme;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      theme = inputs[i].value;
      break;
    }
  }

  bodyElement.className = theme === "dark" ? "temadark" : "";
});

//LLamada a la API para generar un Pokemon
function getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 902) + 1;
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(response => response.json())
      .then(data => {
        const pokemon = {
          id: data.id,
          name: data.name,
          imageFront: data.sprites.front_default,
          imageBack: data.sprites.back_default,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types[0].type.name
        };
        //Comprobamos que no este ya en la lista
        if (!isPokemonDuplicate(pokemon)) {
          initialPokemons.push(pokemon);
          displayPokemon(pokemon);
        } else {
        // Si ya esta en la lista, llamamos de nuevo a getRandomPokemon
          getRandomPokemon();
        }
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }
//Función para comprobar si esta duplicado
function isPokemonDuplicate(pokemon) {
    for (let i = 0; i < initialPokemons.length; i++) {
        if (initialPokemons[i].name === pokemon.name) {
            return true; // Está duplicado
        }
    }
    return false; // No está duplicado
}


//Muestra las tarjetas
function displayPokemon(pokemon) {
  const pokemonCard = document.createElement("div");
  pokemonCard.className = "pokemon-card";
  pokemonCard.innerHTML = `
    <img src="${pokemon.imageFront}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
  `;

  pokemonCard.addEventListener("click", () => {
    showPokemonDetails(pokemon);
  });

  pokemonListElement.appendChild(pokemonCard);
  pokemonCards.push(pokemonCard);
}
//Muestra los detalles de un Pokemon
function showPokemonDetails(pokemon) {
  while (pokemonListElement.firstChild) {
    pokemonListElement.firstChild.remove();
  }

  //Boton para volver al listado de Pokemons
  const backButton = document.createElement("button");
  backButton.textContent = "Volver al inicio";
  backButton.style.display = "center";
  backButton.addEventListener("click", showInitialPokemons);

  const pokemonDetails = document.createElement("div");
  pokemonDetails.className = "pokemon-details";
  pokemonDetails.innerHTML = `
    <img src="${pokemon.imageFront}" alt="${pokemon.name}">
    <img src="${pokemon.imageBack}" alt="${pokemon.name} (Trasera)">
    <h3>${pokemon.name}</h3>
    <p>Ataque: ${pokemon.attack}</p>
    <p>Defensa: ${pokemon.defense}</p>
    <p>Tipo: ${pokemon.type}</p>
  `;

  pokemonDetails.appendChild(backButton);
  pokemonListElement.appendChild(pokemonDetails);

  // Actualizar la URL con la ID del Pokémon que está mostrando
  const pokeID = pokemon.id;
  const newURL = `index.html?pokeID=${pokeID}`;
  history.pushState(null, null, newURL);
}

//Función para volver al listado de Pokemons
function showInitialPokemons() {
  while (pokemonListElement.firstChild) {
    pokemonListElement.firstChild.remove();
  }

  initialPokemons.forEach(pokemon => {
    displayPokemon(pokemon);
  });
  // Cambiar la URL a "index.html"
  history.pushState({}, "", "index.html");
}


//Creación de los 10 Pokemons
for (let i = 0; i < 10; i++) {
  getRandomPokemon();
}

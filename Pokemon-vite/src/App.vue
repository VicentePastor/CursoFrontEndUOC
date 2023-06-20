<template>
  <div id="cuerpo">
    <!-- Título -->
    <h1>POKEDEX</h1>

    <div class="selectortema">
    <input type="radio" id="temalight" name="theme" value="light" v-model="selectedTheme">
    <label for="temalight">Claro</label>
    <input type="radio" id="temadark" name="theme" value="dark" v-model="selectedTheme">
    <label for="temadark">Oscuro</label>
  </div>


    <input type="search" id="pokemon-search" placeholder="Buscar Pokémon..." v-model="searchText">

    <div id="pokemon-list">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.name" class="pokemon-card" :class="{ temadark: theme === 'dark' }">
        <img :src="pokemon.imageFront" :alt="pokemon.name">
        <h3>{{ pokemon.name }}</h3>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      initialPokemons: [],
      theme: 'light',
      searchText: '',
      pokemonCards: [],
      selectedTheme: 'light' // Valor inicial del tema seleccionado
    };
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.getRandomPokemon();
    }
  },
  methods: {
    getRandomPokemon() {
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

          if (!this.isPokemonDuplicate(pokemon)) {
            this.initialPokemons.push(pokemon);
            this.displayPokemon(pokemon);
          } else {
            this.getRandomPokemon();
          }
        })
        .catch(error => {
          console.log("Error:", error);
        });
    },
    isPokemonDuplicate(pokemon) {
      for (let i = 0; i < this.initialPokemons.length; i++) {
        if (this.initialPokemons[i].name === pokemon.name) {
          return true; // Está duplicado
        }
      }
      return false; // No está duplicado
    },
    displayPokemon(pokemon) {
      const pokemonCard = document.createElement("div");
      pokemonCard.className = "pokemon-card";
      pokemonCard.innerHTML = `
        <img src="${pokemon.imageFront}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
      `;

      pokemonCard.addEventListener("click", () => {
        this.showPokemonDetails(pokemon);
      });

      this.pokemonCards.push(pokemonCard);
    },
    
  },
  computed: {
    filteredPokemons() {
      const searchText = this.searchText.toLowerCase().trim();

      return this.initialPokemons.filter(pokemon => {
        const pokemonName = pokemon.name.toLowerCase();
        return pokemonName.indexOf(searchText) === 0;
      });
    }
  }
};
</script>

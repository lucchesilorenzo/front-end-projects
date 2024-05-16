// Select DOM elements
const pokemonSubmit = document.querySelector("#pokemon-submit");
const pokemonForm = document.querySelector("#pokemon-form");
const pokemonInput = document.querySelector("#pokemon-input");
const pokemonInfo = document.querySelector("#pokemon-info");

// Function to retrieve Pokémon data from the API
async function retrievePokemon(pokemon) {
  try {
    // Fetch Pokémon data from the PokeAPI
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Throw an error if the request fails
    if (!res.ok) {
      throw new Error("Request Failed");
    }

    // Remove any existing error message
    const existingErrorDiv = document.querySelector(".error-div");
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }

    // Destructure the required data from the API response
    const { sprites, forms, types } = await res.json();

    // Display the Pokémon information
    pokemonInfo.innerHTML = `
      <div id="pokemon-sprites">
        <img src="${sprites.front_default}" alt="${
      forms[0].name.charAt(0).toUpperCase() + forms[0].name.slice(1)
    }" />
        <img src="${sprites.back_default}" alt="${
      forms[0].name.charAt(0).toUpperCase() + forms[0].name.slice(1)
    }" />
      </div>
      <div id="pokemon-description">
        <div id="pokemon-name">Name: ${
          forms[0].name.charAt(0).toUpperCase() + forms[0].name.slice(1)
        }</div>
        <div id="pokemon-type">Type: ${types
          .map(
            (type) =>
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
          )
          .join(" / ")}</div>
      </div>
    `;
  } catch (error) {
    // Clear the Pokémon information
    pokemonInfo.innerHTML = "";

    // Remove any existing error message
    const existingErrorDiv = document.querySelector(".error-div");
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }

    // Display an error message
    const div = document.createElement("div");
    div.className = "error-div";
    div.innerHTML = `<strong>Sorry, couldn't find any Pokémon!<strong>`;
    pokemonForm.insertAdjacentElement("afterend", div);
  }
}

// Function to handle form submission and search for a Pokémon
function searchPokemon(e) {
  e.preventDefault(); // Prevent form submission

  const newPokemon = pokemonInput.value.trim().toLowerCase(); // Get and trim the input value

  if (newPokemon === "") {
    alert("Please add a Pokémon"); // Alert if input is empty
    return;
  }

  retrievePokemon(newPokemon); // Retrieve Pokémon data
  pokemonInput.value = ""; // Clear input
}

// Event listener for form submission
pokemonForm.addEventListener("submit", searchPokemon);

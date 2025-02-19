document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("pokemonInput");
  const searchButton = document.getElementById("searchButton");
  const randomButtom = document.getElementById("randomPokemon")

  searchButton.addEventListener("click", () => {
    fetchData(input.value);
  });  
  randomButtom.addEventListener("click", () => {
    fetchRandomPokemon();
  });

  input.addEventListener("keydown", function(e) {
    if(e.key === "Enter"){
    fetchData(input.value)
  }
});
})

async function fetchData(query) {
  
  if (!query) {
    alert("Please enter pokemon name or id");
    return;
  }
  try {

    const response = await fetch(`http://localhost:3000/pokemon?name=${query}`)

    if (!response.ok) {
      throw new Error("Could not find your pokemon")
    }

    const data = await response.json()
    
    displayPokemon(data);
  }
  catch (error) {
    console.log(error)
  }
}

async function fetchRandomPokemon() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  try {
    const response = await fetch(`https://main-website-2oms.onrender.com/pokemon/random?id=${randomId}`);

    if (!response.ok) {
      throw new Error("Could not fetch random pokemon")
      console.error(`ERROR ${response.status}: ${response.statusText}`);
    }

    const data = await response.json()
    displayPokemon(data);
  }
  catch (error) {
    console.log(error)
    alert("failed to find pokemon")
  }
}

function displayPokemon(data) {
  const pokemonContainer = document.getElementById("pokemonContainer");
  pokemonContainer.innerHTML = 
    `
    <h1>${data.name}</h1>
    <img src=${data.sprites.front_default} alt="Sprite of ${data.name}">
    `
  console.log(data.sprites.other.home.front_default)

}



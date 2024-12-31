
        
//fetch("https://api.openweathermap.org/data/2.5/weather?lat=33.1983&lon=-96.6389&appid=880fb3736ebc11c78939e57aedc7c43d")
  //  .then(response => response.json())
    //.then(data => console.log(data))
    //.catch(error => console.log(error))
    


async function fetchData() {
  try {

    const pokemonName = document.getElementById("pokemonName").value.toLowerCase()
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    

    if (!response.ok) {
      throw new Error("Could not find your pokemon")
    }

    const data = await response.json()
    const sprite = data.sprites.front_default;
    const imgElement = document.getElementById("sprite");

    imgElement.src = sprite;
    imgElement.style.display = "block";

  }
  catch (error) {
    console.log(error)
  }
}



const searchInput = document.getElementById('searchInput');
const characterList = document.getElementById('characterList');
const apiKey = 'c4709f6c01c243f2aeecd6f67ac0ac68'; 

// Función para realizar una búsqueda de personaje en la API de Marvel.
async function searchCharacter() {
    const searchQuery = searchInput.value.trim();
    if (searchQuery === '') {
        return;
    }

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&apikey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Mostrar resultados en la lista de personajes.
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error al buscar personaje:', error);
    }
}

// Función para mostrar los personajes en la lista.
function displayCharacters(characters) {
    characterList.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.innerHTML = `
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <h2 class="character-name">${character.name}</h2>
            <p class="character-description">${character.description || 'No hay descripción disponible.'}</p>
        `;

        characterList.appendChild(characterCard);
    });
}


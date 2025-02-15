const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

// Add power-on animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const pokemonCard = document.querySelector('.pokemon-card');
    pokemonCard.style.animation = 'power-on 1s ease-in-out';
});

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) return;

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        updatePokemonData(data);
    } catch (error) {
        alert('Pokémon not found');
        clearPokemonData();
    }
});

// Enhance the updatePokemonData function
function updatePokemonData(data) {
    document.body.style.cursor = 'wait';
    const pokemonCard = document.querySelector('.pokemon-card');
    pokemonCard.style.opacity = '0.7';
    
    setTimeout(() => {
        // Update name and ID
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = data.id.toString().startsWith('#') ? data.id : `#${data.id}`;
        
        // Update sprite
        const spriteElement = document.getElementById('sprite');
        if (spriteElement) {
            spriteElement.src = data.sprites.front_default;
        } else {
            const newSprite = document.createElement('img');
            newSprite.id = 'sprite';
            newSprite.src = data.sprites.front_default;
            document.querySelector('.pokemon-image').appendChild(newSprite);
        }
    
        // Clear and update types
        types.innerHTML = '';
        data.types.forEach(type => {
            const typeElement = document.createElement('span');
            typeElement.textContent = type.type.name.toUpperCase();
            typeElement.className = 'type';
            typeElement.style.backgroundColor = typeColors[type.type.name];
            types.appendChild(typeElement);
        });
    
        // Update measurements (without "Weight:" and "Height:" prefixes)
        weight.textContent = data.weight;
        height.textContent = data.height;
    
        // Update stats with exact values
        const statsMap = {
            'hp': hp,
            'attack': attack,
            'defense': defense,
            'special-attack': specialAttack,
            'special-defense': specialDefense,
            'speed': speed
        };
        
        data.stats.forEach(stat => {
            if (statsMap[stat.stat.name]) {
                statsMap[stat.stat.name].textContent = stat.base_stat;
            }
        });
        
        // Add scan line effect
        const existingScanline = pokemonCard.querySelector('.scanline');
        if (existingScanline) {
            existingScanline.remove();
        }
        
        const scanLine = document.createElement('div');
        scanLine.className = 'scanline';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            animation: scanline 2s linear infinite;
        `;
        pokemonCard.appendChild(scanLine);
        
        // Reset loading state
        document.body.style.cursor = 'default';
        pokemonCard.style.opacity = '1';
        
        // Add sound effect
        const beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        beep.volume = 0.1;
        beep.play();
    }, 500);
}

// Enhance the clearPokemonData function
function clearPokemonData() {
    pokemonName.textContent = 'POKEMON NAME';
    pokemonId.textContent = '#00';
    types.innerHTML = ''; // Ensure types are cleared
    weight.textContent = '0';
    height.textContent = '0';
    hp.textContent = '0';
    attack.textContent = '0';
    defense.textContent = '0';
    specialAttack.textContent = '0';
    specialDefense.textContent = '0';
    speed.textContent = '0';
    
    const sprite = document.getElementById('sprite');
    if (sprite) {
        sprite.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
    }
    
    const scanLines = document.querySelectorAll('.scanline');
    scanLines.forEach(line => line.remove());
}

// Add input validation
searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 20) {
        e.target.value = value.slice(0, 20);
    }
    // Only allow letters, numbers and hyphen
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
});

// Enable search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// script.js

const characters = [
    'Character_1', 'Character_2', 'Character_3', 'Character_4', 'Character_5', 'Character_6',
    'Character_7', 'Character_8', 'Character_9', 'Character_10', 'Character_11', 'Character_12',
    'Character_13', 'Character_14', 'Character_15', 'Character_16', 'Character_17', 'Character_18',
    'Character_19', 'Character_20', 'Character_21', 'Character_22', 'Character_23', 'Character_24'
];

const formats = ['jpg', 'png', 'jpeg', 'webp', 'avif'];
const gameBoard = document.getElementById('game-board');

// Fonction pour générer le plateau de jeu
function generateBoard() {
    const shuffledCharacters = shuffle([...characters]); // Mélange des personnages
    gameBoard.innerHTML = ''; // Efface le contenu précédent

    shuffledCharacters.forEach(character => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character';

        const img = document.createElement('img');
        img.alt = character;

        getImageSrc(character.toLowerCase(), img);

        charDiv.appendChild(img);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'character-name';
        nameDiv.textContent = character; // Nom du personnage
        charDiv.appendChild(nameDiv);

        charDiv.addEventListener('click', () => {
            charDiv.classList.toggle('flipped'); // Effet de retournement
        });

        gameBoard.appendChild(charDiv);
    });
}

// Fonction pour obtenir le chemin de l'image avec différents formats
function getImageSrc(character, imgElement) {
    let formatIndex = 0;

    function tryNextFormat() {
        if (formatIndex >= formats.length) {
            imgElement.src = 'image_mc/placeholder.jpg'; // Assurez-vous d'avoir une image de remplacement
            return;
        }

        const src = `image_mc/${character}.${formats[formatIndex]}`;
        formatIndex++;

        fetch(src).then(response => {
            if (response.ok) {
                imgElement.src = src;
            } else {
                tryNextFormat();
            }
        }).catch(tryNextFormat);
    }

    tryNextFormat();
}

// Fonction de mélange d'un tableau
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Ajout des écouteurs d'événements pour les boutons
document.getElementById('reset-btn').addEventListener('click', () => {
    const allCharacters = document.querySelectorAll('.character');
    allCharacters.forEach(character => {
        character.classList.remove('flipped'); // Réinitialiser les cases retournées
    });
});

document.getElementById('refresh-btn').addEventListener('click', () => {
    location.reload(); // Recharger la page
});

// Générer le plateau de jeu au chargement de la page
window.onload = generateBoard;

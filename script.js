// Función para abrir el modal con el juego
function openGameModal(gameTitle, gameUrl) {
    const modal = document.getElementById("gameModal");
    const gameTitleElement = document.getElementById("gameTitle");
    const gameFrame = document.getElementById("gameFrame");

    // Configurar el título y la URL del iframe
    gameTitleElement.textContent = gameTitle;
    
    // Ajustar el tamaño del iframe
    gameFrame.style.width = '100%';
    gameFrame.style.height = '90vh';
    
    // Configurar la URL del juego
    gameFrame.src = gameUrl;

    // Mostrar el modal
    modal.style.display = "block";
}

// Función para cerrar el modal
function closeGameModal() {
    const modal = document.getElementById("gameModal");
    const gameFrame = document.getElementById("gameFrame");

    // Detener el juego limpiando el iframe
    gameFrame.src = '';
    
    // Ocultar el modal
    modal.style.display = "none";
}

// Cerrar el modal cuando se hace clic en la X
document.querySelector('.close').onclick = function() {
    closeGameModal();
}

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("gameModal");
    if (event.target == modal) {
        closeGameModal();
    }
}
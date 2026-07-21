const words = ['ALITAS', 'ROLES', 'ESPINDOLA', 'CHULA', 'INGENIERIA', 'DERECHO', 'DTODO', 'CHIKIS', 'UÑAS', 'LIBNI', 'HAMBURGUESA', 'TULIPANES', 'ROSAS', 'KAI', 'AMOR', 'GUITARRA', 'BTS'];
const timers = [180, 240, 420]; // 3:00, 4:00, 7:00
let currentTimerIndex = 0;
let timeRemaining = timers[currentTimerIndex];
let interval;
let wordsFound = 0;

const grid = document.getElementById('grid');
const wordsList = document.getElementById('words-list');
const timerElements = [
    document.getElementById('timer1'),
    document.getElementById('timer2'),
    document.getElementById('timer3')
];
const messageElement = document.getElementById('message');
const endButtons = document.getElementById('end-buttons');
const restartButton = document.getElementById('restart-button');
const nextButton = document.getElementById('next-button');

// Nuevas variables para el control de arrastre (Drag)
let isDragging = false;
let startCell = null;
let currentHighlighted = [];
let currentGridSize = 0;

// Función para calcular el tamaño de la cuadrícula
function calculateGridSize() {
    const maxWordLength = Math.max(...words.map(word => word.length));
    const gridSize = Math.ceil(Math.sqrt(words.length * maxWordLength));
    // Agregamos un poco de margen extra para que no quede tan apretado
    return gridSize + 2; 
}

function canPlaceWord(cells, word, start, direction, gridSize) {
    let row = Math.floor(start / gridSize);
    let col = start % gridSize;
    for (let i = 0; i < word.length; i++) {
        const cellIndex = row * gridSize + col;
        if (row >= gridSize || col >= gridSize || col < 0 || row < 0 || (cells[cellIndex] && cells[cellIndex] !== word[i])) {
            return false;
        }
        // Expandimos para aceptar diagonales (Mejora nivel 2)
        if (direction === 'H') col++;
        else if (direction === 'V') row++;
        else if (direction === 'D') { col++; row++; } // Diagonal
    }
    return true;
}

function placeWord(cells, word, start, direction, gridSize) {
    let row = Math.floor(start / gridSize);
    let col = start % gridSize;
    for (let i = 0; i < word.length; i++) {
        const cellIndex = row * gridSize + col;
        cells[cellIndex] = word[i];
        if (direction === 'H') col++;
        else if (direction === 'V') row++;
        else if (direction === 'D') { col++; row++; }
    }
}

function generateGrid(gridSize) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const cells = Array(gridSize * gridSize).fill(null);
    const directions = ['H', 'V', 'D'];

    words.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 200) {
            const start = Math.floor(Math.random() * (gridSize * gridSize));
            const direction = directions[Math.floor(Math.random() * directions.length)];
            
            if (canPlaceWord(cells, word, start, direction, gridSize)) {
                placeWord(cells, word, start, direction, gridSize);
                placed = true;
            }
            attempts++;
        }
        if (!placed) console.error(`No se pudo colocar la palabra: ${word}`);
    });

    return cells.map(cell => cell || letters[Math.floor(Math.random() * letters.length)]);
}

function renderGrid(cells, gridSize) {
    grid.innerHTML = '';
    // MEJORA: Ajustar las columnas del CSS dinámicamente según el cálculo
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 30px)`;

    cells.forEach((letter, index) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = letter;
        cell.dataset.index = index;
        cell.dataset.row = Math.floor(index / gridSize);
        cell.dataset.col = index % gridSize;
        
        // MEJORA: Eventos de arrastre en lugar de clics
        cell.addEventListener('mousedown', startDrag);
        cell.addEventListener('mouseenter', drag);
        
        grid.appendChild(cell);
    });
    
    // Escuchar el mouseup en todo el documento para evitar que se quede pegado
    document.addEventListener('mouseup', endDrag);
}

function renderWordsList() {
    wordsList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.dataset.word = word;
        wordsList.appendChild(li);
    });
}

function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    // Restaurar estilos de temporizadores
    timerElements.forEach(el => el.style.backgroundColor = '#eee');
    timerElements[currentTimerIndex].style.backgroundColor = '#ffd700'; // Resaltar nivel actual
    timerElements[currentTimerIndex].textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeRemaining <= 0) {
        clearInterval(interval);
        alert('¡Perdiste una estrella!');
        currentTimerIndex++;
        if (currentTimerIndex < timers.length) {
            timeRemaining = timers[currentTimerIndex];
            updateTimer();
            startTimer();
        } else {
            endGame(false);
        }
    }
}

function startTimer() {
    interval = setInterval(() => {
        timeRemaining--;
        updateTimer();
    }, 1000);
}

// ==========================================
// NUEVA LÓGICA DE SELECCIÓN (EL NÚCLEO)
// ==========================================

function startDrag(event) {
    if (event.button !== 0) return; // Solo click izquierdo
    isDragging = true;
    startCell = event.target;
    currentHighlighted = [startCell];
    startCell.classList.add('selected');
}

function drag(event) {
    if (!isDragging) return;
    const currentCell = event.target;

    const startRow = parseInt(startCell.dataset.row);
    const startCol = parseInt(startCell.dataset.col);
    const currRow = parseInt(currentCell.dataset.row);
    const currCol = parseInt(currentCell.dataset.col);

    const diffRow = currRow - startRow;
    const diffCol = currCol - startCol;

    // Validación estricta: Solo permitir líneas rectas
    if (diffRow !== 0 && diffCol !== 0 && Math.abs(diffRow) !== Math.abs(diffCol)) {
        return; 
    }

    // Limpiar selección temporal anterior
    document.querySelectorAll('.cell.selected').forEach(cell => {
        if (!cell.classList.contains('highlight')) {
            cell.classList.remove('selected');
        }
    });

    currentHighlighted = [];

    // Calcular la dirección del arrastre
    const stepRow = diffRow === 0 ? 0 : diffRow / Math.abs(diffRow);
    const stepCol = diffCol === 0 ? 0 : diffCol / Math.abs(diffCol);
    const distance = Math.max(Math.abs(diffRow), Math.abs(diffCol));

    // Iluminar la nueva línea recta
    for (let i = 0; i <= distance; i++) {
        const r = startRow + (stepRow * i);
        const c = startCol + (stepCol * i);
        const index = r * currentGridSize + c;
        
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        if (cell) {
            cell.classList.add('selected');
            currentHighlighted.push(cell);
        }
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    checkWord();
}

function checkWord() {
    if (currentHighlighted.length === 0) return;

    // Extraer palabra en ambas direcciones (normal y al revés)
    const selectedWord = currentHighlighted.map(cell => cell.textContent).join('');
    const reversedWord = selectedWord.split('').reverse().join('');
    
    let foundWord = null;
    if (words.includes(selectedWord)) foundWord = selectedWord;
    else if (words.includes(reversedWord)) foundWord = reversedWord;

    const wordListItem = foundWord ? document.querySelector(`li[data-word="${foundWord}"]`) : null;

    if (foundWord && wordListItem && !wordListItem.classList.contains('found')) {
        // Éxito: La palabra es válida
        wordsFound++;
        wordListItem.classList.add('found');
        
        currentHighlighted.forEach(cell => {
            cell.classList.remove('selected');
            cell.classList.add('highlight'); // Resaltado permanente (verde)
        });
        
        checkGameCompletion();
    } else {
        // Fallo: Limpiar la selección si es incorrecta
        currentHighlighted.forEach(cell => {
            if (!cell.classList.contains('highlight')) {
                cell.classList.remove('selected');
            }
        });
    }
    
    currentHighlighted = [];
}

// ==========================================

function checkGameCompletion() {
    if (wordsFound === words.length) {
        endGame(true);
    }
}

function endGame(won) {
    clearInterval(interval);
    document.removeEventListener('mouseup', endDrag); // Limpiar eventos
    endButtons.style.display = 'flex';
    messageElement.textContent = won ? '¡Ganaste! 🎉' : 'Se acabó el tiempo. 😢';

    if (won) {
        messageElement.textContent = '¡Has completado todas las palabras!';
        messageElement.style.color = "green";
    }
}

function initGame() {
    clearInterval(interval);
    currentGridSize = calculateGridSize(); 
    const cells = generateGrid(currentGridSize); 
    renderGrid(cells, currentGridSize); 
    renderWordsList();
    
    // Restaurar temporizadores
    timerElements.forEach(el => el.textContent = el.textContent.split(' ')[0]);
    timerElements[0].textContent = '3:00 ⭐⭐⭐';
    timerElements[1].textContent = '4:00 ⭐⭐';
    timerElements[2].textContent = '7:00 ⭐';

    updateTimer();
    startTimer();
    
    wordsFound = 0;
    currentHighlighted = [];
    endButtons.style.display = 'none';
    messageElement.textContent = 'Encuentra todas las palabras antes de que se acabe el tiempo. ¡Buena suerte!';
    messageElement.style.color = "#555";
}

function resetGame() {
    wordsFound = 0;
    currentTimerIndex = 0;
    timeRemaining = timers[currentTimerIndex];
    initGame();
}

function nextLevel() {
    resetGame(); // Por ahora reinicia, aquí puedes agregar lógica de niveles más complejos
}

restartButton.addEventListener('click', resetGame);
nextButton.addEventListener('click', nextLevel);

initGame();
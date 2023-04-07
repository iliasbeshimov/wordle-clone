let remainingGuesses = 6;
let targetWord = generateRandomWord();

function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
}

document.getElementById("wordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const inputWord = document.getElementById("inputWord").value.toUpperCase();
    if (inputWord.length === 5 && remainingGuesses > 0) {
        document.getElementById("inputWord").value = "";
        remainingGuesses--;
        updateRemainingGuesses();
        addRow(inputWord);
        evaluateWord(inputWord);
    }
});

function updateRemainingGuesses() {
    document.getElementById("guesses").textContent = remainingGuesses;
}

function addRow(word) {
    const gameBoard = document.getElementById("gameBoard");
    for (let i = 0; i < word.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = word[i];
        gameBoard.appendChild(cell);
    }
}

function evaluateWord(guess) {
    if (guess === targetWord) {
        alert("You win!");
        resetGame();
    } else {
        if (remainingGuesses === 0) {
            alert(`You lost! The word was: ${targetWord}`);
            resetGame();
        } else {
            provideFeedback(guess);
        }
    }
}

function provideFeedback(guess) {
    const cells = document.querySelectorAll("#gameBoard .cell");
    const lastIndex = cells.length - 1;

    for (let i = lastIndex; i >= lastIndex - 4; i--) {
        const cell = cells[i];
        const letter = cell.textContent;
        const letterIndex = targetWord.indexOf(letter);

        if (letter === targetWord[i - lastIndex + 4]) {
            cell.style.backgroundColor = "green";
            cell.style.color = "white";
        } else if (letterIndex !== -1) {
            cell.style.backgroundColor = "yellow";
            cell.style.color = "black";
        }
    }
}

function resetGame() {
    remainingGuesses = 6;
    targetWord = generateRandomWord();
    updateRemainingGuesses();
    document.getElementById("gameBoard").innerHTML = "";
}

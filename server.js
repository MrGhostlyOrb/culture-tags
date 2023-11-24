const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 3000;

// Read flashcards from JSON file
const flashcardsPath = path.join(__dirname, 'flashcards.json');
let flashcards = [];

try {
    const flashcardsData = fs.readFileSync(flashcardsPath, 'utf8');
    flashcards = JSON.parse(flashcardsData);
} catch (err) {
    console.error('Error reading flashcards file:', err);
}

let currentFlashcard = 0;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure the 'views' directory exists

app.get('/', (req, res) => {
    res.render('index');
})

// Routes for the flashcard game
app.get('/flashcard', (req, res) => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    currentFlashcard = randomIndex;
    const prompt = flashcards[randomIndex].prompt;
    const category = flashcards[randomIndex].category;

    res.render('flashcard', { prompt, category });
});

app.get('/reveal', (req, res) => {
    const answer = flashcards[currentFlashcard].answer;
    const prompt = flashcards[currentFlashcard].prompt;
    res.render('reveal', { answer, prompt });
});

app.get('/current-answer', (req, res) => {
    const answer = flashcards[currentFlashcard].answer;
    res.render('current-answer', { answer });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


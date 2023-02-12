window.addEventListener('load', init);

// Global Variables

let time = 5;
let score = 0;
let isPlaying;
let highScore = localStorage.getItem("highScore") || 0;
let lastScore = localStorage.getItem("lastScore") || 0;



// Levels

const levels = {
    easy : 5,
    medium : 3,
    hard : 2
}

// Change Levels

const currentLevel = levels.hard;

// DOM Elements

const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const messageDisplay = document.getElementById('message');
const seconds = document.getElementById('seconds');
const highestScoreDisplay = document.getElementById('highScore');
const lastScoreDisplay = document.getElementById('lastScore');

const words = [
    'land',
    'Javascript',
    'snakker',
    'battle',
    'plan',
    'øre',
    'chock',
    'kat',
    'søster',
    'Batman',
    'Java',
    'skole',
    'kroner',
    'æbler',
    'fodbold',
    'sejl',
    'krig',
    'bold',
    'fattig',
    'fisk',
    'jellyfish',
    'Spiderman',
    'Apple',
    'alarm',
    'pest',
    'ting',
    'berserk',
    'København',
    'hus',
    'mand',
    'charmerende',
    'Ronaldo',
    'Messi',
    'brandbil',
    'støv',
    'angreb',
    'yogurt',
    'illustration',
    'trompet',
    'Bitcoin',
    'billeder',
    'hurtig',
    'optagelse',
    'masivt',
    'sne',
    'fitness',
    'motion',
    'flappybird',
    'mekaniker',
    'Google'
];

// Initialize Game

function init(){
    // Show number of seconds on ui
    seconds.innerHTML = currentLevel + ' seconds';
    // Load a word From array
    showWord(words);
    // Match Words
    wordInput.addEventListener('input', startMatch);
    // Call countddown timer
    setInterval(countdown, 1000);
    // check status
    setInterval(checkStatus, 50);
    let highScore = localStorage.getItem("highScore");
    if (highScore === null) {
        highScore = 0;
    }
    highestScoreDisplay.innerHTML = highScore;
}
// Start Match


function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel +1;
        showWord(words);
        wordInput.value = '';
        score++;
        lastScore = score;
        localStorage.setItem("lastScore", lastScore);
    }
    // if score is -1, display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    } else{
        scoreDisplay.innerHTML = score;
    }
}

// Match Current word to the input

function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        messageDisplay.innerHTML = 'Correct!!!';
        messageDisplay.style.color = 'green';
        return true;
    }else {
        messageDisplay.innerHTML = '';
        return false;
    }
}



// Pick a random word

function showWord(words){
    // Generate Random Word From Array
    const randIndex = Math.floor(Math.random() * words.length);
    // Show that word
    currentWord.innerHTML = words[randIndex];

}
// Countdown timer

function countdown(){
    // Make sure time hasn't run out
    if(time > 0){
        // Decrement
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}
// check status




function checkStatus(){
    if (!isPlaying && time === 0) {
        if (score > localStorage.getItem("highScore")) {
            localStorage.setItem("highScore", score);
            highestScoreDisplay.innerHTML = score;
            highScore = score;
        }
        localStorage.setItem("lastScore", lastScore);
        lastScoreDisplay.innerHTML = lastScore;

        messageDisplay.innerHTML = 'Game Over !!! Type the word to start again';
        score = 0;
        messageDisplay.style.color = 'red';
    }
}





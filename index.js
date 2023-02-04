#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Array of words to choose from
const words = ['javascript', 'node', 'npm', 'cli', 'openai'];

// Function to pick a random word from the words array
function pickWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Function to play the hangman game
function playHangman() {
	let word = pickWord();
	let correct = [];
	let incorrect = [];
	let guesses = 6;

	console.log(`Welcome to Hangman! You have ${guesses} guesses to guess the word.`);

	// Function to display the hangman
	function displayHangman() {
		let hangman = `
     _______
     |/      |
     |      ${incorrect.length > 0 ? 'O' : ''}
     |     ${incorrect.length > 2 ? '\\' : ' '}${incorrect.length > 1 ? '|' : ''}${incorrect.length > 3 ? '/' : ''}
     |      ${incorrect.length > 4 ? '|' : ''}
     |     ${incorrect.length > 5 ? '/' : ''} ${incorrect.length > 6 ? '\\' : ''}
     |
    ===`;

		console.log(hangman);
		console.log(`Incorrect Guesses: ${incorrect.join(' ')}`);
		console.log(`Word: ${correct.join(' ')}`);
	}

	// Function to check if the player has won or lost
	function checkStatus() {
		if (incorrect.length === guesses) {
			console.log(`You lose! The word was ${word}.`);
			process.exit();
		}
		if (!correct.includes('_')) {
			console.log('You win!');
			process.exit();
		}
	}

	// Function to handle each guess
	function handleGuess(guess) {
		if (word.includes(guess)) {
			for (let i = 0; i < word.length; i++) {
				if (word[i] === guess) {
					correct[i] = guess;
				}
			}
		} else {
			incorrect.push(guess);
		}

		displayHangman();
		checkStatus();

		// Recursive call to handle the next guess
		getGuess();
	}

	// Function to get the player's guess
	function getGuess() {
		rl.question('Guess a letter: ', (answer) => {
			handleGuess(answer);
		});
	}

	// Initialize the correct array with underscores for each letter in the word
	for (let i = 0; i < word.length; i++) {
		correct.push('_');
	}

	displayHangman();
	getGuess();
}

playHangman();

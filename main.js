// Trivia database

var QandA = {
	"Pennsylvania is the only American state to begin with the letter 'p'.": "Pennsylvania",
	"Greenland is the world's biggest island.": "Greenland",
	"Amazon is the world's longest river.": "Amazon",
	"Pacific is the world's largest ocean.": "Pacific",
	"The diameter of Earth is 8000 miles.": "8000",
	"Daintree Forest is world's most ancient forest.": "Daintree",
	"Liverpool, Glasgow, Newcastle and London have underground rail systems.": "London",
	"The capital city of Spain is Madrid.": "Madrid",
	"Prague is in Czech Republic.": "Czech Republic",
	"An English town named Birkenhead was a forerunner of the Parks Movement and the first city in Europe to have a street tram system.": "Birkenhead",
	"In Turkey you would find the cities Ankara and Istanbul.": "Turkey",
	"Sri Lanka was known as Ceylon until 1972.": "Sri Lanka",
	"Leonardo da Vinci was born in Italy.": "Italy",
	"Sahara Desert is the biggest desert in the world, outside the Polar region.": "Sahara",
	"The Andes is the longest continental mountain range in the world.": "Andes"
}

// globals

var inquirer = require("inquirer");
var clozecard = require("./ClozeCard.js");

var questions = Object.keys(QandA);
var shuffled = shuffle(questions);
var answers = [];
var quest = [];
var count = 0;
var correct = 0;
var incorrect = 0;
var username;

// shuffle answers

for (i = 0; i < shuffled.length; i++) {
	answers.push(QandA[shuffled[i]]);
};

// generate cloze cards

for (i = 0; i < shuffled.length; i++) {
	quest.push(new clozecard(shuffled[i], answers[i]));
};

// functions

function shuffle(a) { // from Stack Overflow
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
};

function capitalize(a) {
	var temp = a.split(" ");
	var temp1 = "";
	for (i = 0; i < temp.length; i++) {
		temp1 += temp[i].substring(0, 1).toUpperCase() + temp[i].substring(1, ) + " ";
	}
	var final = temp1.trim();
	return final;
};

function game() {
	if (count < 15) {
		inquirer.prompt([
			{
				type: "input",
				message: "Question " + (count + 1) + "\n" + quest[count].cloze + "\n",
				name: "answer"
			}
		]).then(function(res) {
			if (capitalize(res.answer) === capitalize(answers[count])) {
				correct++;
				console.log("\n--------------------------------------\n");
				console.log("Correct. Nice job!");
				console.log("\n--------------------------------------\n");
			}

			else {
				incorrect++;
				console.log("\n--------------------------------------\n");
				console.log("Oops, incorrect...\nThe correct answer is: " + answers[count]);
				console.log("\n--------------------------------------\n");
			};
			count++;
			game();
		});
	}
	else {
		console.log("You've finished 15 questions already. Here is what you've done: \nCorrect: " + correct + "\nIncorrect: " + incorrect);
		console.log("\n--------------------------------------\n");
		inquirer.prompt([
			{
				type: "confirm",
				message: "Play again?\n",
				name: "isrestart"
			}
		]).then(function(res) {
			if (res.isrestart) {
				console.log("\n--------------------------------------\n");
				console.log("Welcome back, " + username + "!\nWish you can break your record of the last round.");
				console.log("\n--------------------------------------\n");
				reset();
				game();
			}
			else {
				console.log("\n--------------------------------------\n");
				console.log("Well, thanks for playing anyway. See you next time!")
				console.log("\n--------------------------------------\n");
				process.exit();
			}
		});
	}
};


function reset() {
	answers = [];
	quest = [];
	count = 0;
	correct = 0;
	incorrect = 0;
	shuffled = shuffle(questions);
	for (i = 0; i < shuffled.length; i++) {
		answers.push(QandA[shuffled[i]]);
	};
	for (i = 0; i < shuffled.length; i++) {
		quest.push(new clozecard(shuffled[i], answers[i]));
	};
};

function main() {
	console.log("\n--------------------------------------\n");
	console.log("Welcome to Trivia Game, Node.js version.\nFor html version (which is prettier), please visit https://akirasunny.github.io/a5-TriviaGame/");
	console.log("\n--------------------------------------\n");
	inquirer.prompt([
		{
			type: "confirm",
			message: "Are you ready for upcoming 15 questions?\n",
			name: "isready"
		}
	]).then(function(res) {
		if (res.isready) {
			inquirer.prompt([
				{
					type: "input",
					message: "What's your name?\n",
					name: "name"
				}
			]).then(function(res) {
				username = res.name;
				console.log("\n--------------------------------------\n");
				console.log("Welcome, " + res.name + "!\nYou will be answering 15 questions, most of them are about countries and geology.\nPlease feel free to use Google when getting stuck, or just let it go.\nGood luck!");
				console.log("\n--------------------------------------\n");
				game();
			});
		}
		else {
			console.log("\n--------------------------------------\n");
			console.log("Nah, feel free to run this game again when you're ready.")
			console.log("\n--------------------------------------\n");
			process.exit();
		}
	})
};

// main
main();
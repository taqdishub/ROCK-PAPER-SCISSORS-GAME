let userScore = 0;
let compScore = 0;
let gameEnded = false;

const userScorePara = document.querySelector("#user-score");
const CompScorePara = document.querySelector("#computer-score");
const msg = document.querySelector("#msg");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawgame = () => {
    console.log("Game was a draw!");
}

const showWinner = (userwin, userChoice, computerChoice) => {
    if (userwin === true) {
        userScore++;
        userScorePara.innerText = userScore;
        console.log(`You Win! your ${userChoice} beats ${computerChoice}`);
        msg.innerText = (`You Win! your ${userChoice} beats ${computerChoice}`);
        msg.style.backgroundColor = "GREEN";
    } else {
        compScore++;
        CompScorePara.innerText = compScore;
        console.log(`You Lost! ${computerChoice} beats your ${userChoice}`);
        msg.innerText = (`You Lost! ${computerChoice} beats your ${userChoice}`);
        msg.style.backgroundColor = "RED";
    }

    // Check if either user or computer score is 5
    if (userScore === 5 || compScore === 5) {
        gameEnded = true;
        if (userScore === 5) {
            msg.innerText = "Congratulations! You've won the game!";
        } else {
            msg.innerText = "Oops! Computer has won the game!";
        }
        setTimeout(() => {
            resetGame();
        }, 2000); // Reset after 2 seconds
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    CompScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
    gameEnded = false;
};

const playGame = (userChoice) => {
    console.log("User choice = ", userChoice);
    const computerChoice = genCompChoice();
    console.log("Computer choice = ", computerChoice);

    if (userChoice === computerChoice) {
        drawgame();
        msg.innerText = "Game was draw! play again";
        msg.style.backgroundColor = "#081b31";
    } else {
        let userWin = false;

        if (userChoice === "rock") {
            if (computerChoice === "paper") {
                userWin = false; // Paper beats rock
            } else {
                userWin = true; // Rock beats scissors
            }
        } else if (userChoice === "paper") {
            if (computerChoice === "scissors") {
                userWin = false; // Scissors beats paper
            } else {
                userWin = true; // Paper beats rock
            }
        } else {
            // User chooses scissors
            if (computerChoice === "rock") {
                userWin = false; // Rock beats scissors
            } else {
                userWin = true; // Scissors beats paper
            }
        }

        showWinner(userWin, userChoice, computerChoice); // Call showWinner function to display result
    }
};

const choices = document.querySelectorAll(".choices");

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (gameEnded) {
            return; // If game has ended, do not allow further clicks
        }

        const userChoice = choice.getAttribute("id");
        playGame(userChoice); // Call playGame function with userChoice
    });
});




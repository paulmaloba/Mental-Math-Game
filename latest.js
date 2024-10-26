let point = 0;
let currentQuizIndex = 0;
let gameArea = document.getElementById("gameArea");
let totalHeight = gameArea.offsetHeight;
let barHeight = 30;
let fallingSpeed = 1;
let currentBars = []; // Track the current falling bar
let isGameOver = false;
let scoreElement = document.getElementById("point");
let finishh = document.getElementById("finish");
let title = document.getElementById("title");



const quizData = [
    { question: "How many even numbers are less than 100?", correctAnswer: "50" },
    { question: "What is 5 to the power 5?", correctAnswer: "3125" },
 //   { question: "What is the square root of 144?", correctAnswer: "12" },
    { question: "What is 15% of 200?", correctAnswer: "30" },
    { question: "Solve: 9 + 6 ÷ 3", correctAnswer: "11" },
    { question: "If you double a number and then subtract 6 the result is 14. What is the number?", correctAnswer: "10" },
    //{ question: "What is the result of halving 50 myand then add 7?", correctAnswer: "32" },
 //   { question: "Simplify: 16 ÷ 2 + 10", correctAnswer: "18" },
    { question: "What is the product of 8 and 12?", correctAnswer: "96" },
    { question: "What is the sum of the first five prime numbers?", correctAnswer: "28" },
    { question: "If you subtract the square of 3 from 20 what do you get?", correctAnswer: "11" },
    { question: "If you multiply 11 by itself and subtract 5, what do you get?", correctAnswer: "116" },
   // { question: "Solve: 7 × 6 - 5", correctAnswer: "37" },
    { question: "How many degrees are in a right angle?", correctAnswer: "90" },
    { question: "What is the factorial of 4?", correctAnswer: "24" }
];


// Function to create and drop bars
function createFallingBar() {
    const bar = document.createElement("div");
    bar.classList.add("falling-bar");
    gameArea.appendChild(bar);

    let position = 0;
    const fallInterval = setInterval(() => {
        // Bar falls until it hits the bottom or stacks directly on top of another bar
        if (position >= totalHeight - (barHeight * currentBars.length )) {
            clearInterval(fallInterval);
            currentBars.push(bar);
            checkGameOver();
        } else {
            position += fallingSpeed;
            bar.style.top = position + "px";
        }
    }, 30); // Faster fall with smaller interval to smooth the motion

    currentBars.push({ barElement: bar, intervalId: fallInterval }); 
}

// Check if the game is over
function checkGameOver() {
    if (currentBars.length * barHeight >= totalHeight) {
        document.querySelector("#finish").style.display = "block";
        document.querySelector("#content").style.display = "none";
        finishh.textContent = "Game Over !\nYou scored " + point + " points";
        document.querySelector("title").style.fontSize = 40 + "px";
        
        isGameOver = true;
    } else {
        setTimeout(createFallingBar, 500); // Delay before the next bar starts falling
    }
}

// Load the quiz question and set up answer buttons
function loadQuiz() {
    if (currentQuizIndex >= quizData.length) {
        document.querySelector("#finish").style.display = "block";
      finishh.textContent = "Game completed\nYou scored " + point + "points"; 
       document.querySelector("#content").style.display = "none";
        return;
    }

    const currentQuizData = quizData[currentQuizIndex];
    document.getElementById("question").textContent = currentQuizData.question;

    const compareButtons = document.querySelectorAll(".option");
    compareButtons.forEach(button => {
        button.disabled = false; // Re-enable buttons for the new question
        button.style.backgroundColor = ""; // Reset button color
        button.removeEventListener("click", handleAnswer); // Remove any previous event listener
        button.addEventListener("click", handleAnswer); // Add new event listener

        // Assign a value based on the button's index
        button.value = button.innerText; // Assuming the button text is already set with the answers
    });
}

// Function to handle the selected answer
function handleAnswer(event) {
    const clickedValue = event.target.value;
    const correctAnswer = quizData[currentQuizIndex].correctAnswer;

    if (clickedValue === correctAnswer) {
        point += 10;
        scoreElement.innerHTML = point + " points";
        removeFallingBar(); // Remove current bar
        currentQuizIndex++; // Move to the next question
        loadQuiz(); // Load the next question
        createFallingBar(); // Start a new bar
    } else {
        event.target.disabled = true; // Disable wrong answer button
        event.target.style.backgroundColor = "red"; // Mark wrong answer
     //   alert("Wrong answer!");
    }
}

// Remove the currently falling bar
function removeFallingBar() {
    if (currentBars.length > 0) {
        const barObj = currentBars.pop(); // Get the current falling bar
        clearInterval(barObj.intervalId); // Stop the bar from falling
        barObj.barElement.remove(); // Remove the bar from the game area
    }
}

// Initialize the game
function initGame() {
    loadQuiz();
    createFallingBar(); // Start the first falling bar
}

// Start the game when the page loads
initGame();



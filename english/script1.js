// Quiz Data
const quizData = [
  {
    question: "What is the meaning of 'example'?",
    options: [
      "A new method",
      "A representative form or pattern of something",
      "A type of fruit",
      "A process in technology"
    ],
    correctAnswer: 1, // "A representative form or pattern of something"
  },
  {
    question: "What does 'innovate' mean?",
    options: [
      "To make changes by introducing new methods or ideas",
      "To invent a machine",
      "To draw pictures",
      "To measure something"
    ],
    correctAnswer: 0, // "To make changes by introducing new methods or ideas"
  },
  {
    question: "What is the meaning of 'apple'?",
    options: [
      "A fruit with red or green skin",
      "A type of software",
      "A famous tech company",
      "A vegetable"
    ],
    correctAnswer: 0, // "A fruit with red or green skin"
  },
  {
    question: "What does 'bright' mean?",
    options: [
      "Having a lot of light",
      "Being sad",
      "Being dark",
      "A type of color"
    ],
    correctAnswer: 0, // "Having a lot of light"
  },
  {
    question: "What is the meaning of 'innovative'?",
    options: [
      "Being creative and new",
      "Being old-fashioned",
      "To imitate",
      "Not good"
    ],
    correctAnswer: 0, // "Being creative and new"
  },
  {
    question: "What does 'success' mean?",
    options: [
      "Failure",
      "Achieving a goal",
      "Being lazy",
      "Sleeping"
    ],
    correctAnswer: 1, // "Achieving a goal"
  },
  {
    question: "What is the meaning of 'love'?",
    options: [
      "An emotion of deep affection",
      "A type of food",
      "A color",
      "A tool"
    ],
    correctAnswer: 0, // "An emotion of deep affection"
  },
  {
    question: "What does 'technology' mean?",
    options: [
      "Tools and machines used to solve problems",
      "A type of food",
      "A color",
      "A genre of music"
    ],
    correctAnswer: 0, // "Tools and machines used to solve problems"
  },
  {
    question: "What does 'joy' mean?",
    options: [
      "Happiness",
      "Sadness",
      "Anger",
      "Fear"
    ],
    correctAnswer: 0, // "Happiness"
  },
  {
    question: "What is the meaning of 'rain'?",
    options: [
      "Water falling from the sky",
      "A type of animal",
      "A color",
      "A type of music"
    ],
    correctAnswer: 0, // "Water falling from the sky"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(quizData.length); // To store selected answers

// Shuffle function for randomizing array order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Shuffle questions and options, while keeping track of original correct answers
function randomizeQuiz() {
  // Shuffle the quiz questions
  shuffle(quizData);

  // For each question, shuffle the options and update the correct answer index
  quizData.forEach((q, index) => {
    const originalCorrectAnswer = q.correctAnswer; // Store the original correct answer index

    // Shuffle the options
    shuffle(q.options);

    // Find the new index of the correct answer after shuffling the options
    q.correctAnswer = q.options.indexOf(q.options[originalCorrectAnswer]);
  });
}

// Start the quiz and randomize the order of questions and answers
function startQuiz() {
  // Randomize questions and options order
  randomizeQuiz();

  document.getElementById('startButton').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('submitButton').style.display = 'none'; // Hide submit button initially
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  
  document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1}`;
  document.getElementById('questionText').textContent = currentQuestion.question;
  
  // Load options
  const options = document.querySelectorAll('.optionButton');
  currentQuestion.options.forEach((option, index) => {
    options[index].textContent = option;
    options[index].disabled = false; // Enable all options
    options[index].style.backgroundColor = '#ddd'; // Reset background color
  });

  // Highlight the previously selected answer (if any)
  if (userAnswers[currentQuestionIndex] !== undefined) {
    const selectedOption = options[userAnswers[currentQuestionIndex]];
    selectedOption.style.backgroundColor = '#ffeb3b'; // Yellow for selected answer
  }

  document.getElementById('nextButton').style.display = 'block'; // Show next button
  document.getElementById('previousButton').style.display = currentQuestionIndex > 0 ? 'block' : 'none'; // Show back button if not on first question
  document.getElementById('submitButton').style.display = currentQuestionIndex === quizData.length - 1 ? 'block' : 'none'; // Show submit button only after the last question
}

function selectOption(index) {
  const currentQuestion = quizData[currentQuestionIndex];
  
  // Save the user's answer
  userAnswers[currentQuestionIndex] = index;

  // Reset background color for all options
  const options = document.querySelectorAll('.optionButton');
  options.forEach(option => option.style.backgroundColor = '#ddd');

  // Highlight the selected option
  options[index].style.backgroundColor = '#ffeb3b'; // Yellow for selected option
}

function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function submitQuiz() {
  // Calculate the score by counting the correct answers
  score = 0;
  userAnswers.forEach((answer, index) => {
    const correctIndex = quizData[index].correctAnswer; // Get the shuffled correct index
    if (answer === correctIndex) {
      score++;
    }
  });

  // Hide quiz and show results
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('submitButton').style.display = 'none';
  document.getElementById('resultsSection').style.display = 'block';
  
  const percentage = (score / quizData.length) * 200;
  
  document.getElementById('score').textContent = score;
  document.getElementById('percentage').textContent = percentage.toFixed(2);

  // Determine the mark and motivational quote
  let mark = 1;
  let quote = '';
  if (percentage >= 90) {
    mark = 5;
    quote = "You're a genius! Keep it up!";
  } else if (percentage >= 75) {
    mark = 4;
    quote = "Well done! You're on the right track!";
  } else if (percentage >= 50) {
    mark = 3;
    quote = "Nice try, but you can do better!";
  } else if (percentage >= 25) {
    mark = 2;
    quote = "Don't give up, keep learning!";
  } else {
    mark = 1;
    quote = "Keep practicing, you'll get there!";
  }

  document.getElementById('mark').textContent = mark;
  document.getElementById('quote').textContent = quote;

  // Display motivational image
  const motivationalImages = [
    "https://via.placeholder.com/300?text=You%20Can%20Do%20It%21",
    "https://via.placeholder.com/300?text=Keep%20Going%21",
    "https://via.placeholder.com/300?text=Success%20Awaits%21",
    "https://via.placeholder.com/300?text=You%20Are%20Amazing%21",
    "https://via.placeholder.com/300?text=Never%20Give%20Up%21"
  ];

  document.getElementById('motivationalImage').src = motivationalImages[mark - 1];
}

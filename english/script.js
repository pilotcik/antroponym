// Word data store (you can expand this with more words and their details)
const dictionary = {
  "diyora": {
    meaning: "A representative form or pattern of something.",
    image: "pics/woman.jpg", // Sample image
  },
  "aziza": {
    meaning: "To make changes in something established, especially by introducing new methods, ideas, or products.",
    image: "pics/woman.jpg", // Sample image
  },
  "apple": {
    meaning: "A round fruit with red or green skin and a whitish interior.",
    image: "pics/man.jpg", // Sample image
  },
  "sardor": {
    meaning: "A round fruit with red or green skin and a whitish interior.",
    image: "pics/man.jpg",  // Replace with your image path
    audio: "audio/apple.mp3"   // Optional: Replace with your audio file path
  },
  "nodir": {
    meaning: "A long, curved fruit with a yellow skin and soft, sweet, white flesh inside.",
    image: "pics/man.jpg",  // Replace with your image path
    audio: "audio/banana.mp3"   // Optional: Replace with your audio file path
  },
  "javlon": {
    meaning: "A domesticated carnivorous mammal with a long snout, a bark, and a tail.",
    image: "pics/man.jpg",  // Replace with your image path
    audio: "audio/dog.mp3"   // Optional: Replace with your audio file path
  },
  "tavakkal": {
    meaning: "A small domesticated carnivorous mammal with a soft coat, a short snout, and retractile claws.",
    image: "pics/man.jpg",  // Replace with your image path
    audio: "audio/cat.mp3"   // Optional: Replace with your audio file path
  },
  "hojiakhbar": {
    meaning: "A perennial plant with an elongated stem, or trunk, supporting branches and leaves.",
    image: "pics/man.jpg",  // Replace with your image path
    audio: "audio/tree.mp3"   // Optional: Replace with your audio file path
  }
  // Add more words and details as needed
};

// Search function that displays word details
function searchWord() {
  const wordInput = document.getElementById('wordInput').value.trim().toLowerCase();
  const errorMessage = document.getElementById('errorMessage');
  const wordDetails = document.getElementById('wordDetails');

  // Hide error message and word details initially
  errorMessage.style.display = "none";
  wordDetails.style.display = "none";

  // Check if word exists in the dictionary
  if (wordInput && dictionary[wordInput]) {
    // Show word details
    document.getElementById('wordOutput').textContent = wordInput.charAt(0).toUpperCase() + wordInput.slice(1);
    document.getElementById('meaningOutput').textContent = dictionary[wordInput].meaning;
    document.getElementById('wordImage').src = dictionary[wordInput].image;
    document.getElementById('wordImage').style.display = 'block'; // Make image visible
    wordDetails.style.display = "block";
  } else {
    // Show error message if word is not found
    errorMessage.textContent = "Sorry, the word could not be found in our dictionary.";
    errorMessage.style.display = "block";
  }
}

// Function to read the word aloud using the SpeechSynthesis API
function playAudio() {
  const word = document.getElementById('wordOutput').textContent;
  const utterance = new SpeechSynthesisUtterance(word);
  window.speechSynthesis.speak(utterance);
}



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
    "pics/welldone.jpg",
    "pics/welldone.jpg",
    "pics/welldone.jpg",
    "pics/welldone.jpg",
    "pics/welldone.jpg"
  ];

  document.getElementById('motivationalImage').src = motivationalImages[mark - 1];
}

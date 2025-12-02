import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

import { submitQuiz } from './script1';

const mockQuizData = [
  {
    question: "Test question 1",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 2
  },
  {
    question: "Test question 2",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 1
  }
];

const mockUserAnswers = [2, 1];

describe('submitQuiz function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="quizContainer"></div>
      <button id="submitButton"></button>
      <div id="resultsSection"></div>
      <span id="score"></span>
      <span id="percentage"></span>
      <span id="mark"></span>
      <span id="quote"></span>
      <img id="motivationalImage" />
    `;

    global.quizData = mockQuizData;
    global.userAnswers = mockUserAnswers;
    global.score = 0;
  });

it('should assign the correct mark and quote for a score of 0%', () => {
  // Set up the test environment
  global.score = 0;
  global.quizData = new Array(10).fill({ correctAnswer: 0 });
  global.userAnswers = new Array(10).fill(1);

  // Call the function
  submitQuiz();

  // Assert the results
  expect(document.getElementById('mark').textContent).toBe('1');
  expect(document.getElementById('quote').textContent).toBe("Keep practicing, you'll get there!");
  expect(document.getElementById('motivationalImage').src).toBe("https://via.placeholder.com/300?text=You%20Can%20Do%20It%21");
});

it('Should calculate the correct score when all answers are correct', () => {
  // Setup
  global.quizData = mockQuizData;
  global.userAnswers = [1, 0]; // All correct answers
  global.score = 0;

  // Execute
  submitQuiz();

  // Assert
  expect(document.getElementById('score').textContent).toBe('2');
  expect(document.getElementById('percentage').textContent).toBe('100.00');
  expect(document.getElementById('mark').textContent).toBe('5');
  expect(document.getElementById('quote').textContent).toBe("You're a genius! Keep it up!");
  expect(document.getElementById('motivationalImage').src).toBe('https://via.placeholder.com/300?text=You%20Can%20Do%20It%21');

  // Check display properties
  expect(document.getElementById('quizContainer').style.display).toBe('none');
  expect(document.getElementById('submitButton').style.display).toBe('none');
  expect(document.getElementById('resultsSection').style.display).toBe('block');
});
});

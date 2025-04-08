






import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  // State for tracking question, options, score, and page flow
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false); // Track if the quiz is finished
  const [score, setScore] = useState(0); // Track user's score
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
  const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

  // Memoize the fetchQuestions function to prevent unnecessary rerenders
  const fetchQuestions = useCallback(async () => {
    const response = await fetch('http://localhost:8000/quiz');
    const data = await response.json();
    setQuizData(data); // Set the fetched quiz data
    setQuestion(`${data[0].id}. ${data[0].question}`); // Set the first question with its ID
    setOptions(data[0].options); // Set the first question options
  }, []);

  // Fetch quiz data when component mounts
  useEffect(() => {
    if (quizStarted) {
      fetchQuestions(); // Fetch questions only when the quiz starts
    }
  }, [fetchQuestions, quizStarted]);

  // Handle the 'Next' or 'Finish' button click
  const handleNext = () => {
    if (selectedOption !== null) {
      // Check if the selected answer is correct
      if (quizData[currentIndex].answer === selectedOption) {
        setScore(score + 1); // Increment score if correct
      }

      // Move to the next question or finish the quiz
      if (currentIndex < quizData.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setQuestion(`${quizData[nextIndex].id}. ${quizData[nextIndex].question}`); // Update question with ID
        setOptions(quizData[nextIndex].options);
        setSelectedOption(null); // Reset selected option for next question
      } else {
        setQuizFinished(true); // Finish the quiz when last question is answered
      }
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  // Function to handle the answer selection
  const handleAnswerSelection = (selected) => {
    setSelectedOption(selected); // Set the selected answer
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setQuizFinished(false); // Reset quiz finished state
    setQuizStarted(false); // Reset quiz started state to show the start page
    setCurrentIndex(0); // Reset the current question index
    setQuizData([]); // Clear the quiz data
    setScore(0); // Reset the score
    setSelectedOption(null); // Reset the selected option
  };

  // Start quiz and show the first question
  const startQuiz = () => {
    setQuizStarted(true); // Set quizStarted to true to begin the quiz
    setQuizFinished(false); // Ensure quiz is not finished when starting
  };

  return (
    <div className="App">
      <div className="header">Quizzz</div>
      {!quizStarted ? (
        // Show the start page before the quiz starts
        <div className="start-page">
          <h1>Welcome to the Quizzz App!</h1>
          <p>Click below to start the quiz</p>
          <button className="small-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
      ) : quizFinished ? (
        // Show the Thank You message and final score when the quiz is finished
        <div className="end-page">
          <h1>Thank you for participating!</h1>
          <p>Your final score is: {score} / {quizData.length}</p>
          {/* Restart Button */}
          <button className="small-btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2>{question}</h2>

          {/* Display options as buttons */}
          <div>
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Show "Next" or "Finish" button based on the last question */}
          <div>
            <button className="small-btn" onClick={handleNext}>
              {currentIndex === quizData.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;





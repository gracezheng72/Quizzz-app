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
    setQuestion(data[currentIndex].question); // Set the first question
    setOptions(data[currentIndex].options); // Set the first question options
  }, [currentIndex]);

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
        setQuestion(quizData[nextIndex].question);
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





// import React, { useState, useEffect, useCallback } from 'react';
// import './App.css'; // Import the CSS file

// function App() {
//   // State for tracking question, options, score, and page flow
//   const [question, setQuestion] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quizData, setQuizData] = useState([]);
//   const [quizFinished, setQuizFinished] = useState(false); // Track if the quiz is finished
//   const [score, setScore] = useState(0); // Track user's score
//   const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
//   const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

//   // Memoize the fetchQuestions function to prevent unnecessary rerenders
//   const fetchQuestions = useCallback(async () => {
//     const response = await fetch('http://localhost:8000/quiz');
//     const data = await response.json();
//     setQuizData(data); // Set the fetched quiz data
//     setQuestion(data[currentIndex].question); // Set the first question
//     setOptions(data[currentIndex].options); // Set the first question options
//   }, [currentIndex]);

//   // Fetch quiz data when component mounts
//   useEffect(() => {
//     if (quizStarted) {
//       fetchQuestions(); // Fetch questions only when the quiz starts
//     }
//   }, [fetchQuestions, quizStarted]); // Only fetch when quizStarted is true

//   // Handle the 'Next' or 'Finish' button click
//   const handleNext = () => {
//     if (selectedOption !== null) {
//       // Check if the selected answer is correct
//       if (quizData[currentIndex].answer === selectedOption) {
//         setScore(score + 1); // Increment score if correct
//       }

//       // Move to the next question or finish the quiz
//       if (currentIndex < quizData.length - 1) {
//         const nextIndex = currentIndex + 1;
//         setCurrentIndex(nextIndex);
//         setQuestion(quizData[nextIndex].question);
//         setOptions(quizData[nextIndex].options);
//         setSelectedOption(null); // Reset selected option for next question
//       } else {
//         setQuizFinished(true); // Finish the quiz when last question is answered
//       }
//     } else {
//       alert('Please select an answer before proceeding.');
//     }
//   };

//   // Function to handle the answer selection
//   const handleAnswerSelection = (selected) => {
//     setSelectedOption(selected); // Set the selected answer
//   };

//   // Add this function to handle the selection
//   const handleOptionSelect = (event) => {
//     // Remove the 'selected' class from all options
//     const buttons = document.querySelectorAll('button');
//     buttons.forEach(button => button.classList.remove('selected'));

//     // Add the 'selected' class to the clicked option
//     event.target.classList.add('selected');
//   };

//   // Add this event listener to each question option button
//   const optionButtons = document.querySelectorAll('.option-button'); // Assuming you are using a class for option buttons
//   optionButtons.forEach(button => {
//     button.addEventListener('click', handleOptionSelect);
//   });


//   // Function to restart the quiz
//   const restartQuiz = () => {
//     setQuizFinished(false); // Reset quiz finished state
//     setQuizStarted(false); // Reset quiz started state to show the start page
//     setCurrentIndex(0); // Reset the current question index
//     setQuizData([]); // Clear the quiz data
//     setScore(0); // Reset the score
//     setSelectedOption(null); // Reset the selected option
//   };

//   // Start quiz and show the first question
//   const startQuiz = () => {
//     setQuizStarted(true); // Set quizStarted to true to begin the quiz
//     setQuizFinished(false); // Ensure quiz is not finished when starting
//   };

//   return (
//     <div className="App">
//       <div className="header">Quizzz</div>
//       {!quizStarted ? (
//         // Show the start page before the quiz starts
//         <div className="start-page">
//           <h1>Welcome to the Quizzz App!</h1>
//           <p>Click below to start the quiz</p>
//           <button className="small-btn" onClick={startQuiz}>Start Quiz</button>
//         </div>
//       ) : quizFinished ? (
//         // Show the Thank You message and final score when the quiz is finished
//         <div className="end-page">
//           <h1>Thank you for participating!</h1>
//           <p>Your final score is: {score} / {quizData.length}</p>
//           {/* Restart Button */}
//           <button className="small-btn" onClick={restartQuiz}>Restart Quiz</button>
//         </div>
//       ) : (
//         <>
//           <h2>{question}</h2>

//           {/* Display options as buttons */}
//           <div>
//             {options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelection(option)}
//                 style={{
//                   backgroundColor: selectedOption === option ? '#f0f0f0' : '', // Highlight the selected option
//                 }}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           {/* Show "Next" or "Finish" button based on the last question */}
//           <div>
//             <button className="small-btn" onClick={handleNext}>
//               {currentIndex === quizData.length - 1 ? 'Finish' : 'Next'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

















// ###########perfect plain version
// import React, { useState, useEffect, useCallback } from 'react';

// function App() {
//   // State for tracking question, options, score, and page flow
//   const [question, setQuestion] = useState(null);
//   const [options, setOptions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quizData, setQuizData] = useState([]);
//   const [quizFinished, setQuizFinished] = useState(false); // Track if the quiz is finished
//   const [score, setScore] = useState(0); // Track user's score
//   const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
//   const [quizStarted, setQuizStarted] = useState(false); // Track if the quiz has started

//   // Memoize the fetchQuestions function to prevent unnecessary rerenders
//   const fetchQuestions = useCallback(async () => {
//     const response = await fetch('http://localhost:8000/quiz');
//     const data = await response.json();
//     setQuizData(data); // Set the fetched quiz data
//     setQuestion(data[currentIndex].question); // Set the first question
//     setOptions(data[currentIndex].options); // Set the first question options
//   }, [currentIndex]);

//   // Fetch quiz data when component mounts
//   useEffect(() => {
//     if (quizStarted) {
//       fetchQuestions(); // Fetch questions only when the quiz starts
//     }
//   }, [fetchQuestions, quizStarted]); // Only fetch when quizStarted is true

//   // Handle the 'Next' or 'Finish' button click
//   const handleNext = () => {
//     if (selectedOption !== null) {
//       // Check if the selected answer is correct
//       if (quizData[currentIndex].answer === selectedOption) {
//         setScore(score + 1); // Increment score if correct
//       }

//       // Move to the next question or finish the quiz
//       if (currentIndex < quizData.length - 1) {
//         const nextIndex = currentIndex + 1;
//         setCurrentIndex(nextIndex);
//         setQuestion(quizData[nextIndex].question);
//         setOptions(quizData[nextIndex].options);
//         setSelectedOption(null); // Reset selected option for next question
//       } else {
//         setQuizFinished(true); // Finish the quiz when last question is answered
//       }
//     } else {
//       alert('Please select an answer before proceeding.');
//     }
//   };

//   // Function to handle the answer selection
//   const handleAnswerSelection = (selected) => {
//     setSelectedOption(selected); // Set the selected answer
//   };

//   // Function to restart the quiz
//   const restartQuiz = () => {
//     setQuizFinished(false); // Reset quiz finished state
//     setQuizStarted(false); // Reset quiz started state to show the start page
//     setCurrentIndex(0); // Reset the current question index
//     setQuizData([]); // Clear the quiz data
//     setScore(0); // Reset the score
//     setSelectedOption(null); // Reset the selected option
//   };

//   // Start quiz and show the first question
//   const startQuiz = () => {
//     setQuizStarted(true); // Set quizStarted to true to begin the quiz
//     setQuizFinished(false); // Ensure quiz is not finished when starting
//   };

//   return (
//     <div className="App">
//       {!quizStarted ? (
//         // Show the start page before the quiz starts
//         <div>
//           <h1>Welcome to the Quiz App!</h1>
//           <p>Click below to start the quiz</p>
//           <button onClick={startQuiz}>Start Quiz</button>
//         </div>
//       ) : quizFinished ? (
//         // Show the Thank You message and final score when the quiz is finished
//         <div>
//           <h1>Thank You for completing the quiz!</h1>
//           <p>Your final score is: {score} / {quizData.length}</p>
//           {/* Restart Button */}
//           <button onClick={restartQuiz}>Restart Quiz</button>
//         </div>
//       ) : (
//         <>
//           <h1>Quiz App</h1>

//           {/* Display question */}
//           <div>
//             <h2>{question}</h2>
//           </div>

//           {/* Display options as buttons */}
//           <div>
//             {options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswerSelection(option)}
//                 style={{
//                   backgroundColor: selectedOption === option ? '#f0f0f0' : '', // Highlight the selected option
//                 }}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           {/* Show "Next" or "Finish" button based on the last question */}
//           <div>
//             <button onClick={handleNext}>
//               {currentIndex === quizData.length - 1 ? 'Finish' : 'Next'}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;








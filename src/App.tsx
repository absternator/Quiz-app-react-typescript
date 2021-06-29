import React, { useState } from "react";
//Components
import QuestionCard from "./Components/QuestionCard";
import { fetchQuestions, Difficulty, Catagory, QuestionState } from "./API";
//styles
//import { GlobalStyle, Wrapper} from "./App.styles"; // can do like this or import app .styles
import "./styles/App.css";

export interface AnswerObj {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const App = () => {
  const TOTAL_QUESTIONS = 10;
  //States
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  // functions
  /**
   * start trivia game by fetching from API and refreshing all states
   */
  async function startTrivia() {
    setLoading(true);
    setGameOver(false);
    // await promise to be fufilled
    const new_qs = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      Catagory.ScienceAndNature
    );
    setQuestions(new_qs);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  /**
   * Check answers and add to user Answer array
   * @param e the button click evetn
   */
  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const userAns = e.currentTarget.value;
    const cur_question = questions[number];
    const actualAns = cur_question.correct_answer;
    if (actualAns === userAns) {
      setScore((prevScore) => prevScore + 1);
    }
    // save into userAnswers object
    const ansObj: AnswerObj = {
      question: cur_question.question,
      answer: userAns,
      correct: actualAns === userAns,
      correctAnswer: actualAns,
    };
    setUserAnswers((prevAnswers) => [...prevAnswers, ansObj]);
  }
  /**
   * Move to next question if not on last question
   */
  function nextQuestion() {
    const nextQuestionNumber = number + 1;
    // array starts at 0, so 9 would be last question in array. 9+1 = 10 so check this
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  }
  return (
    <>
      <div className="app">
        <h1>Anmols Quiz Show</h1>
        {(gameOver || userAnswers.length === 10) && (
          <button className="start" onClick={startTrivia}>
            {" "}
            Start Quiz
          </button>
        )}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading the Question...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswerGiven={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </div>
    </>
  );
};

export default App;

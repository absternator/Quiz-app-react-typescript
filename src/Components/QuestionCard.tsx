import React from "react";
import { AnswerObj } from "../App";
import "../styles/QuestionCard.css";

interface Props {
  question: string;
  answers: Array<string>;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswerGiven: AnswerObj | undefined;
  questionNumber: number;
  totalQuestions: number;
}
// functional way to setup component with props
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswerGiven,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="questionCard">
      <p>
        Question: {questionNumber} out of {totalQuestions}
      </p>
      <p>{question}</p>
      <div>
        {answers.map((answer) => (
          <div key={answer} className="buttonWrap">
            <button
              disabled={userAnswerGiven ? true : false}
              onClick={callback}
              value={answer}
              style={{
                background:
                  // highlight green if button is the correct  given
                  userAnswerGiven?.correctAnswer === answer
                    ? "linear-gradient(90deg, #56ffa4, #59bc86)"
                    : // highlight red if button not correct and is clicked by user
                    userAnswerGiven?.correctAnswer !== answer &&
                      userAnswerGiven?.answer === answer
                    ? "linear-gradient(90deg, #ff5656, #c16868)"
                    : "linear-gradient(90deg, #56ccff, #6eafb4)",
              }}
            >
              <span>{answer}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

// Note: (z) => (something blah blah) - makes it return the statemnt in round brackets. Dont have to use curlyu here and return statement
// each list item should have a key

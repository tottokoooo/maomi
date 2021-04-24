import React, { useRef, useState } from "react";
import { cats, questions } from "../data";

export default function AskQuestion(props) {
  const { setPicture } = props;
  const [questionIndex, setQuestionIndex] = useState(0);
  const { answers, question } = questions[questionIndex];
  const option = useRef(null);

  const nextQuestion = () => {
    if (option.current !== null) {
      cats[answers[option.current].catIndex].score += 1; //計分
      if (questionIndex === questions.length - 1) {
        //適合程度排序
        cats.sort((a, b) => b.score - a.score);
        localStorage.setItem("type", cats[0].imageName);
        setPicture();
      } else {
        option.current = null;
        setQuestionIndex((index) => index + 1);
      }
    }
  };

  const handleUserSelect = (thisOption) => {
    option.current = thisOption.target.value;
  };

  return (
    <>
      <div className="question">{question}</div>
      <br />
      <div className="answers">
        {answers.map((answer, index) => (
          //key的值改變時會重新渲染，反之亦然
          <>
            <label key={answer.name}>
              <input
                type="radio"
                name={question}
                value={answer.index}
                onChange={handleUserSelect}
              />
              {answer.name}
            </label>
            <br />
          </>
        ))}
      </div>
      <br />
      <button className="nextQuestionButton" onClick={nextQuestion}>
        next
      </button>
    </>
  );
}

import { CircularProgress } from "@material-ui/core";
import { useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, apnaOption, setApnaOption, score, setQuestions }) => {
  const [currQues, setCurrQues] = useState(0);

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              Score : {score}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            apnaOption = {apnaOption}
            setApnaOption = {setApnaOption}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;

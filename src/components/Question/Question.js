import { Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useEffect } from "react";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  setQuestions,
}) => {
  const [error, setError] = useState(false); 

  const history = useHistory();

  useEffect(() => {
    let list = [...questions];
    list[currQues].visited = true;
    setQuestions(list);
  }, []);

  const handleSelect = (ques, option) => {
    if (ques.ans === option && ques.ans === ques.correct_answer) return "select";
    else if (ques.ans === option && ques.ans !== ques.correct_answer) return "wrong";
    else if (option === ques.correct_answer) return "select";
  };

  const handleCheck = (i) => { 
    let list = [...questions];
    list[currQues].ans = i;
    list[currQues].marked = true;
    if(list[currQues].correct_answer===i)
    {
      list[currQues].correct = true;
    }
    list[currQues].visited = true;
    setQuestions(list);
    setError(false);
  };
  
  const handleNext = () => {
    let list = [...questions];
    if (currQues > 8) {
      history.push("/result");
    } else if (list[currQues]) {
      setCurrQues(currQues+1);
    } else setError("Please select any of the options");
  };

  const handlePrev = () => {
    const idx = currQues;
    if(idx > 0){
      setCurrQues(currQues-1);
    }
  };

  const options = questions[currQues].options;
  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i, idx) => (
              <button
                className={`singleOption  ${questions[currQues].marked && handleSelect(questions[currQues], i)}`}
                key={idx}
                onClick={() => handleCheck(i)}
                disabled={questions[currQues].marked}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={() => handlePrev()}
            disabled={currQues<=0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
            disabled={!questions[currQues].marked}
          >
            {currQues >= 9 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;

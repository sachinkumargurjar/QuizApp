import React, { useReducer, useContext, createContext } from 'react';

const initialState = {};

const QuizContext = createContext();

const useQuiz = () => {
    return useContext(QuizContext);
}

const Quiz = () => {
  return (
    <div>Quiz</div>
  )
}

export default Quiz
import { useEffect, useState } from "react";
// import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
export interface ICards {
  id: string;
  question: string;
  answer: string;
  description: string;
  resources: string[];
  level: number;
  completed: boolean;
  editDate?: string | null;
}

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setQuestions(questions);
      console.log(questions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <>
      {questions.map((card: ICards, index: number) => {
        return <QuestionCard card={card} key={index} />;
      })}

      {/*<button onClick={getQuestions}>get questions</button>*/}
    </>
  );
};

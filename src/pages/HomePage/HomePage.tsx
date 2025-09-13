import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";

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
  const [questions, setQuestions] = useState<ICards[]>([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions: ICards[] = await response.json();
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
      <Loader />
      <QuestionCardList cards={questions} />
    </>
  );
};

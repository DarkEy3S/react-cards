import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";

import { useFetch } from "../../hooks/useFetch.ts";

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
  const [getQuestions, isLoading, error] = useFetch<string>(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions: ICards[] = await response.json();

    setQuestions(questions);

    return questions;
  });

  useEffect(() => {
    getQuestions("react");
  }, []);

  return (
    <>
      {error && <p className="error">{error}</p>}
      {isLoading && <Loader />}
      <QuestionCardList cards={questions} />
    </>
  );
};

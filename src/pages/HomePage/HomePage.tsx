import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch.ts";
import { SearchInput } from "../../components/SearchInput";

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
  const [searchValue, setSearchValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch<string>(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions: ICards[] = await response.json();

    setQuestions(questions);

    return questions;
  });

  const onSerachChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    getQuestions("react");
  }, []);

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput placeholder="search..." value={searchValue} onChange={onSerachChangeHandler} />
      </div>

      {error && <p className="error">{error}</p>}
      {isLoading && <Loader />}
      <QuestionCardList cards={questions} />
    </>
  );
};

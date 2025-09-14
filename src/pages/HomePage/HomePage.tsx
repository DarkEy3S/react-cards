import { useEffect, useState, useMemo, useId } from "react";
import type { ChangeEvent } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch.ts";
import { SearchInput } from "../../components/SearchInput";
import { SelectInput } from "../../components/SelectInput";

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
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch<string>(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions: ICards[] = await response.json();

    setQuestions(questions);

    return questions;
  });

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortSelectValue(e.target.value);
  };

  const cards = useMemo(() => {
    return questions.filter((data) => data.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`);
  }, [sortSelectValue]);

  const sort: string = useId();

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput placeholder="search..." value={searchValue} onChange={onSearchChangeHandler} />
        <SelectInput
          id={sort}
          name={"sortLevel"}
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          childrenOptions={{
            "": "sort by",
            "_sort=level": "level ASC",
            "_sort=-level": "level DESC",
            "_sort=completed": "completed ASC",
            "_sort=-completed": "completed DESC",
          }}
          title={"сортировка по уровню или по завершению "}
        />
      </div>

      {error && <p className="error">{error}</p>}
      {isLoading && <Loader />}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}

      <QuestionCardList cards={cards} />
    </>
  );
};

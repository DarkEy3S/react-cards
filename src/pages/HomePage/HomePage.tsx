import { useEffect, useState, useMemo, useId, useRef } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import cls from "./HomePage.module.css";
import { useFetch } from "../../hooks/useFetch.ts";
import { SearchInput } from "../../components/SearchInput";
import { SelectInput } from "../../components/SelectInput";
import { Pagination } from "../../components/Pagination";

const DEFAULT_PER_PAGE = 10;

export interface ICard {
  id: string;
  question: string;
  answer: string;
  description: string;
  resources: string[];
  level: number;
  completed: boolean;
  editDate?: string | null;
}

export interface ICardsResponse {
  data: ICard[];
  pages: number;
  next: number | null;
  last: number | undefined;
}

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState<ICardsResponse | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestions, isLoading, error] = useFetch<string, ICardsResponse>(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions: ICardsResponse = await response.json();
    setQuestions(questions);
    return questions;
  });

  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortSelectValue(e.target.value);

    setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${e.target.value}`);
  };

  const paginationHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    if (e.currentTarget.tagName === "BUTTON") {
      setSearchParams(`?_page=${e.currentTarget.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`);
      controlsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cards: ICard[] = useMemo(() => {
    if (questions?.data) {
      if (searchValue.trim()) {
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, searchValue]);

  const sort: string = useId();

  const pagination: number[] = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

      <QuestionCardList cards={cards} />
      {cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No cards...</p>
      ) : (
        <Pagination pagination={pagination} onClick={paginationHandler} questions={questions} />
      )}
    </>
  );
};

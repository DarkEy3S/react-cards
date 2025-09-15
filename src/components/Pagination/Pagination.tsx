import cls from "./Pagination.module.css";
import { Button } from "../Button";
import type { MouseEvent } from "react";
import type { ICardsResponse } from "../../pages/HomePage/HomePage.tsx";

interface PaginationProps {
  pagination: number[];
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  questions: ICardsResponse | null;
}

export const Pagination = ({ pagination, onClick, questions }: PaginationProps) => {
  const getActivePageNumber = (questions: ICardsResponse | null): number | undefined => {
    if (!questions) return undefined;
    return questions.next === null ? questions.last : questions.next - 1;
  };
  return (
    <div className={cls.paginationContainer}>
      {pagination.map((value) => (
        <Button key={value} onClick={onClick} isActive={value === getActivePageNumber(questions)}>
          {value}
        </Button>
      ))}
    </div>
  );
};

import cls from "./QuestionCardList.module.css";
import { QuestionCard } from "../QuestionCard";
import type { ICards } from "../../pages/HomePage";

export interface QuestionCardListProps {
  cards: ICards[];
}

export const QuestionCardList = ({ cards }: QuestionCardListProps) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => (
        <QuestionCard card={card} key={index} />
      ))}
    </div>
  );
};

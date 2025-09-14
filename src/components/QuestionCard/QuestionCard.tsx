import cls from "./QuestionCard.module.css";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import type { ICards } from "../../pages/HomePage";
import { Badge } from "../Badge";

export interface QuestionCardProps {
  card: ICards;
}

export const QuestionCard = ({ card }: QuestionCardProps) => {
  const navigate = useNavigate();

  const levelOption: "primary" | "warning" | "alert" = card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  const completedOption: "primary" | "success" = card.completed ? "success" : "primary";

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge option={levelOption}>Level: {card.level}</Badge>
        <Badge option={completedOption}>{card.completed ? "Completed" : "Not Completed"}</Badge>
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>

      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};

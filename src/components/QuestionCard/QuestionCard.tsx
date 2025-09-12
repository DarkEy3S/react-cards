import {} from "react";
import cls from "./QuestionCard.module.css";
import { Button } from "../Button";

export const QuestionCard = () => {
  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>level: 1</div>
        <div>Not Completed</div>
      </div>

      <h5 className={cls.cardTitle}>Что так JSX?</h5>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, placeat.</p>
      </div>

      <Button onClick={() => {}}>View</Button>
    </div>
  );
};

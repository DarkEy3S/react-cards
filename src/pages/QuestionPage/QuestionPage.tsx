import cls from "./QuestionPage.module.css";
import { useEffect, useState, useId } from "react";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.ts";
import { API_URL } from "../../constants";
import type { ICard } from "../HomePage";
import { Loader, SmallLoader } from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth.ts";

export const QuestionPage = () => {
  const [isChecked, setChecked] = useState<boolean>(true);
  const [card, setCard] = useState<ICard | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const checkboxID = useId();
  const { isAuth } = useAuth();

  const levelOption = (): "primary" | "warning" | "alert" => {
    if (!card) return "primary";
    return card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  };

  const completedOption = (): "primary" | "success" => {
    if (!card) return "primary";
    return card.completed ? "success" : "primary";
  };

  // Получение карточки
  const [fetchCard, isCardLoading] = useFetch<void, ICard>(async () => {
    if (!id) throw new Error("ID is missing");
    const response = await fetch(`${API_URL}/react/${id}`);
    const data: ICard = await response.json();
    return data;
  });

  const [updateCard, isCardUpdating] = useFetch<boolean, ICard>(async (completed) => {
    if (!id) throw new Error("ID is missing");
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const data: ICard = await response.json();
    return data;
  });

  useEffect(() => {
    fetchCard().then((data) => {
      if (data) {
        setCard(data);
        setChecked(data.completed);
      }
    });
  }, [id]);

  const onCheckboxChangeHandler = () => {
    const newValue: boolean = !isChecked;
    setChecked(newValue);

    updateCard(newValue).then((updatedCard) => {
      if (updatedCard) setCard(updatedCard);
    });
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge option={levelOption()}>Level: {card.level}</Badge>
            <Badge option={completedOption()}>{card.completed ? "Completed" : "Not Completed"}</Badge>
            {card.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            Resources
            {card.resources.map((resource: string, index: number) => (
              <li key={index}>
                <a href={resource.trim()} target="_blank" rel="noreferrer">
                  {resource.trim()}
                </a>
              </li>
            ))}
          </ul>

          <label htmlFor={checkboxID} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxID}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          {isAuth && (
            <Button isDisabled={isCardUpdating} onClick={() => navigate(`/editquestion/${card.id}`)}>
              Edit Question
            </Button>
          )}
          <Button isDisabled={isCardUpdating} onClick={() => navigate(`/`)}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};

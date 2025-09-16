import cls from "./QuestionForm.module.css";
import { Button } from "../Button";
import { SelectInput } from "../SelectInput";
import type { FC } from "react";

interface QuestionFormState {
  question?: string | undefined;
  answer?: string | undefined;
  description?: string | undefined;
  resources?: string | undefined;
  level?: string | number | undefined;
  clearForm: boolean;
}

interface QuestionFormProps {
  formAction: (payload: FormData) => void;
  state: QuestionFormState;
  isPending: boolean;
  submitBtnText: string;
}

export const QuestionForm: FC<QuestionFormProps> = ({ formAction, state, isPending, submitBtnText }) => {
  return (
    <form action={formAction} className={cls.form}>
      <div className={cls.formControl}>
        <label htmlFor="questionField">Question:</label>
        <textarea
          defaultValue={state.question}
          name="question"
          id="questionField"
          cols={30}
          rows={2}
          required
          placeholder="please enter a question"
        />
      </div>
      <div className={cls.formControl}>
        <label htmlFor="answerField">Short Answer:</label>
        <textarea
          defaultValue={state.answer}
          name="answer"
          id="answerField"
          cols={30}
          rows={2}
          required
          placeholder="please enter a short answer"
        />
      </div>
      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description:</label>
        <textarea
          defaultValue={state.description}
          name="description"
          id="descriptionField"
          cols={30}
          rows={5}
          required
          placeholder="please enter a full description"
        />
      </div>
      <div className={cls.formControl}>
        <label htmlFor="ResourcesField">Resources:</label>
        <textarea
          defaultValue={state.resources}
          name="resources"
          id="ResourcesField"
          cols={30}
          rows={5}
          placeholder="please enter resources separated by commas"
        />
      </div>
      <div className={cls.formControl}>
        <label htmlFor="levelField">Level: </label>
        <SelectInput
          id="levelField"
          name="level"
          defaultValue={state.level}
          childrenOptions={[
            { key: "", label: "Question level", disabled: true },
            { key: "1", label: "1 - easiest" },
            { key: "2", label: "2 - medium" },
            { key: "3", label: "3 - hardest" },
          ]}
          title="Укажите уровень"
        />
      </div>

      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input type="checkbox" name="clearForm" id="clearFormField" defaultChecked={state.clearForm} className={cls.checkbox} />
        <span>clear form after submitting?</span>
      </label>
      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};

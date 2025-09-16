import cls from "./AddQuestionPage.module.css";
import { SelectInput } from "../../components/SelectInput";
import { Button } from "../../components/Button";
import { useActionState } from "react";
import { delayFn } from "../../helpers/delayFn.ts";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";

interface FormState {
  question?: string;
  answer?: string;
  description?: string;
  resources?: string;
  level?: number | string;
  clearForm: boolean;
}

const createCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData) as Record<string, string>;
    const resources = newQuestion.resources?.trim?.() ?? "";
    const isClearForm = Boolean(newQuestion.clearForm);

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editData: undefined,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    const question = await response.json();
    toast.success("New question is successfully created");

    return isClearForm ? { clearForm: true } : { ...question, clearForm: isClearForm };
  } catch (error) {
    toast.error(String(error));
    return { clearForm: true };
  }
};

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState<FormState, FormData>(createCardAction, { clearForm: true });

  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <form action={formAction} className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question:</label>
            <textarea
              defaultValue={formState.question}
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
              defaultValue={formState.answer}
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
              defaultValue={formState.description}
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
              defaultValue={formState.resources}
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
              defaultValue={formState.level}
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
            <input
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
              className={cls.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>
          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};

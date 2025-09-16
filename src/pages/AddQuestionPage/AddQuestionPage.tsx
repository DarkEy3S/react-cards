import cls from "./AddQuestionPage.module.css";

import { useActionState } from "react";
import { delayFn } from "../../helpers/delayFn.ts";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";

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
        <QuestionForm state={formState} formAction={formAction} submitBtnText={"Add Question"} isPending={isPending} />
      </div>
    </>
  );
};

export default AddQuestionPage;

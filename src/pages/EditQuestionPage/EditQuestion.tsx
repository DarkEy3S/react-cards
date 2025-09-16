import cls from "./EditQuestionPage.module.css";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { useActionState } from "react";
import { delayFn } from "../../helpers/delayFn.ts";
import { API_URL } from "../../constants";
import { toast } from "react-toastify";
import { handleError } from "../../helpers/error.ts";
import { dateFormat } from "../../helpers/dateFormat.ts";

interface FormState {
  question?: string;
  answer?: string;
  description?: string;
  resources?: string | string[];
  level?: number | string;
  clearForm: boolean;
}

type EditQuestionProps = {
  initialState: Partial<FormState>;
};

const editCardAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData) as Record<string, string>;
    const resources = newQuestion.resources?.trim?.() ?? "";
    const isClearForm = Boolean(newQuestion.clearForm);
    const questionID = newQuestion.questionID;
    const response = await fetch(`${API_URL}/react/${questionID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (!response.ok) {
      handleError(response.statusText);
    }

    const question = await response.json();
    toast.success("New question is edited successfully!");

    return isClearForm ? { clearForm: true } : { ...question, clearForm: isClearForm };
  } catch (error) {
    toast.error(String(error));
    return { clearForm: true };
  }
};

export const EditQuestion = ({ initialState }: EditQuestionProps) => {
  const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false });

  return (
    <>
      {isPending && <Loader />}
      <h1 className={cls.formTitle}>Add new question</h1>
      <div className={cls.formContainer}>
        <QuestionForm state={formState} formAction={formAction} submitBtnText={"Edit Question"} isPending={isPending} />
      </div>
    </>
  );
};

import cls from "./AddQuestionPage.module.css";
import { SelectInput } from "../../components/SelectInput";
import { Button } from "../../components/Button";

export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <form action="" className={cls.form}>
          <div className={cls.formControl}>
            <label htmlFor="questionField">Question:</label>
            <textarea
              defaultValue={"defaultValue"}
              name="question"
              id="questionField"
              cols={30}
              rows={2}
              required
              placeholder="plase enter a question"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="answerField">Short Answer:</label>
            <textarea
              defaultValue={"defaultValue"}
              name="answer"
              id="answerField"
              cols={30}
              rows={2}
              required
              placeholder="plase enter a short answer"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="descriptionField">Description:</label>
            <textarea
              defaultValue={"defaultValue"}
              name="description"
              id="descriptionField"
              cols={30}
              rows={5}
              required
              placeholder="plase enter a full description"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="ResourcesField">Resources:</label>
            <textarea
              defaultValue={"defaultValue"}
              name="resources"
              id="ResourcesField"
              cols={30}
              rows={5}
              required
              placeholder="plase enter resources separated by commas"
            ></textarea>
          </div>
          <div className={cls.formControl}>
            <label htmlFor="levelField">Level: </label>
            <SelectInput
              id="levelField"
              name="level"
              defaultValue={"defaultValue"}
              childrenOptions={[
                { key: "", label: "Question level", disabled: true },
                { key: "1", label: "1 - easiest" },
                { key: "2", label: "2 - medium" },
                { key: "3", label: "3 - hardest" },
              ]}
              title="Укажаите уровень"
            />
          </div>
          <label htmlFor="clearFormField" className={cls.clearFormControl}>
            <input type="checkbox" name="clearForm" id="clearFormField" defaultChecked={true} className={cls.checkbox} />
            <span>clear form after submitting?</span>
          </label>
          <Button>Add question</Button>
        </form>
      </div>
    </>
  );
};

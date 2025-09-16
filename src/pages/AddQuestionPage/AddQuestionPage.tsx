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

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis ea exercitationem perferendis quas rem! Adipisci
        aperiam atque debitis dolorem eos impedit ipsa laborum nam natus nesciunt nihil odio, officiis quia quo recusandae ullam
        voluptatem. Consequuntur, ducimus enim harum iure magnam nostrum possimus quaerat quisquam vitae. Illum, in, pariatur? Ad
        alias corporis deserunt doloribus fugiat iste iure neque nobis optio pariatur, qui quod sunt velit? Ab alias culpa debitis
        dolor, eius eos illum impedit iusto magnam maxime minus molestiae nobis perspiciatis, quae quisquam rerum sed tempore
        temporibus, unde velit. Ab asperiores quae ullam ut. Atque harum maxime minus molestias perspiciatis quas, soluta tempore.
        Distinctio dolorum numquam odit repellat? Accusantium adipisci assumenda at beatae dolorum eaque ipsum itaque labore,
        laboriosam laudantium maiores nam nulla pariatur placeat possimus quasi quisquam recusandae repellat repellendus
        reprehenderit sapiente sint tenetur. A dignissimos eaque enim est nisi optio voluptatibus. Aliquid aut ipsum possimus rem.
        Ad aliquid debitis dolore doloribus esse minus non reprehenderit rerum veniam voluptatibus. A aliquid aut deleniti dolorum
        eum fugiat, hic id in maiores, nam neque placeat, quasi qui quis quisquam rem repellendus suscipit tenetur unde veniam! Ea
        facilis praesentium sequi? Aperiam asperiores, dicta doloremque ducimus error eum minus natus non odio omnis provident
        tempora temporibus velit. Accusantium ad alias aperiam architecto culpa, cum cumque delectus ea, eaque eius et ex
        excepturi fuga harum labore libero maxime minima mollitia nam nemo neque nihil omnis provident quas ratione reiciendis,
        rem sunt suscipit voluptas voluptates? Adipisci aspernatur atque, deleniti doloremque illum, maxime minima molestias natus
        neque nihil provident quibusdam quidem reiciendis sequi soluta totam voluptas? Accusamus asperiores dicta enim illo nihil
        obcaecati officiis vitae? Debitis quibusdam, quos! A at atque consequuntur corporis cupiditate debitis deserunt dolor
        eaque eligendi enim eos exercitationem harum incidunt laboriosam libero, maxime nisi odit, optio perferendis quam quas
        quis quod repudiandae tempora, tempore temporibus ullam vitae. Amet eos expedita impedit in provident reprehenderit! A ab
        accusamus accusantium aperiam architecto atque beatae blanditiis consequatur dolores eos ex explicabo hic illum in ipsa
        iure iusto labore laborum molestiae molestias nisi non, omnis placeat praesentium quia quidem quis quo rem reprehenderit
        sapiente sed soluta, sunt suscipit ullam ut vel veniam! Distinctio ipsa iure quisquam? Cum exercitationem facere illo
        libero placeat possimus provident reiciendis, repudiandae unde. Corporis culpa fugit itaque iusto minima, molestiae non
        perferendis quaerat repellat voluptatibus? Eius iusto libero magni molestiae suscipit. Adipisci, aliquid, amet autem cum
        distinctio dolorum eaque eius eum explicabo harum hic illum inventore ipsum itaque molestias natus odio perspiciatis quam
        repellat tempore unde velit voluptas. Asperiores dignissimos doloremque, dolores doloribus eveniet incidunt ipsam mollitia
        neque quae reiciendis, reprehenderit rerum suscipit totam unde veniam? Adipisci aliquam, assumenda blanditiis consectetur
        corporis dignissimos ea eligendi excepturi, expedita, maiores natus necessitatibus odio quidem quis sequi soluta unde
        voluptatibus voluptatum. Ab accusamus doloremque eius facere fugit inventore, iste minus, modi non perspiciatis quia quod
        ratione soluta temporibus ut vero, voluptatibus? Amet architecto consequuntur, cumque dolorem eligendi eum facilis laborum
        maiores nam provident quisquam quos ratione reprehenderit rerum voluptas. Ad, amet animi aperiam aspernatur atque aut
        autem commodi consequatur consequuntur deserunt, dicta dolorem doloremque error et ex explicabo facere harum illo magnam
        nostrum numquam odit quia quibusdam quisquam, ratione sequi voluptate voluptatum. Commodi dolor doloremque eum fugit iure
        omnis porro suscipit! Asperiores commodi cumque dolore earum fugiat inventore itaque magnam magni pariatur, perspiciatis
        quaerat quos repudiandae sequi suscipit tempora voluptatem voluptates! Beatae cupiditate eum non quis voluptates! Deleniti
        facere mollitia nobis quae quia tempora. Animi aperiam asperiores assumenda culpa debitis, deleniti dolore dolorem,
        doloremque doloribus dolorum earum eligendi, esse ex harum incidunt inventore iure labore magnam maiores natus nisi non
        numquam officia omnis optio possimus qui quia quis quisquam quo quod quos saepe sunt vel voluptate voluptatem voluptatum?
        Aperiam dolorum, fugit impedit iste necessitatibus odio praesentium quasi quia quo sunt suscipit temporibus vel vitae.
        Dolor eius fugiat pariatur quaerat temporibus unde vel voluptas, voluptatum. Architecto asperiores aspernatur autem
        dolores dolorum eaque earum, laudantium magnam nisi nobis non possimus praesentium quam quas qui, quibusdam quidem quo
        repellat sapiente sed sit, tempore vero? Eum fugiat ipsum iste qui veniam. Aliquam aperiam facilis officiis quisquam quos!
        Aspernatur consequatur, culpa eveniet laudantium modi quos similique vel? Aspernatur exercitationem expedita fuga, illum
        neque numquam pariatur sequi veniam. A ab, accusantium animi aperiam at blanditiis commodi cum dicta error eveniet
        explicabo fugit hic illum impedit inventore iusto maiores maxime minus modi molestiae mollitia nemo nesciunt numquam
        perferendis perspiciatis placeat possimus praesentium quo reiciendis sint sunt veritatis vitae voluptates. Accusantium
        commodi dolor eius illo placeat ut velit. Blanditiis expedita facilis illo itaque iure iusto laboriosam nam necessitatibus
        non porro provident, reiciendis, suscipit temporibus? Animi autem consectetur consequuntur cupiditate delectus dolor
        dolores eaque et eum eveniet explicabo facere id impedit iure iusto nam, neque nobis nulla quas quia rem sunt suscipit
        temporibus ut vel voluptas voluptates. Eligendi, nulla quia. At dolore eaque error est eum inventore, ipsa ipsam libero
        magnam minus modi necessitatibus obcaecati, perferendis sed sit unde voluptas. Accusantium doloribus, eius id inventore
        laborum molestiae necessitatibus nobis pariatur ratione repellat. Accusantium in, labore. Accusamus, asperiores aspernatur
        beatae blanditiis corporis cum delectus distinctio dolor doloremque eaque earum eius ex facilis fugiat id incidunt ipsam
        iste iure libero magni natus necessitatibus nobis officia officiis omnis placeat quia quidem quis quisquam recusandae
        saepe similique suscipit totam ullam veritatis vero vitae. Aspernatur at aut facere fugit impedit laborum magni maxime
        voluptatem. Consequuntur eveniet minus numquam odio odit pariatur quas qui quo recusandae temporibus! Ad aspernatur et in
        labore libero nihil quasi vero. Consequatur dicta dignissimos dolore dolores esse exercitationem fugiat impedit iste
        libero, magni nobis officiis provident quo reiciendis, rem sit velit? Aliquid animi architecto atque, aut beatae
        consectetur cupiditate deleniti dignissimos dolor dolorem doloremque dolorum ducimus earum eius eos facere hic id, illo
        ipsam iste iusto maiores minus natus necessitatibus neque porro, praesentium provident quaerat quam quas quidem quo quos
        rem suscipit ullam vitae voluptas. Esse ex quasi quibusdam quis quo ullam vel veniam? Cumque earum optio quos rerum
        voluptate? Earum eum exercitationem minima. Aspernatur aut autem cumque debitis doloribus dolorum excepturi explicabo,
        facere labore laudantium non nulla odit sint vel velit veniam vero voluptatibus. Alias, amet aspernatur assumenda eos
        laborum magnam possimus quae quas? Accusantium adipisci aliquid architecto assumenda autem commodi consectetur, culpa
        dignissimos distinctio enim et, eum harum hic in inventore ipsa ipsum itaque laborum, laudantium minus molestiae molestias
        porro possimus quam repellat repudiandae sequi sint vel voluptatem voluptatum. Alias corporis fugit laudantium nisi nobis.
        Dignissimos eligendi facere minima placeat quibusdam ratione repudiandae ullam, velit voluptas. Ab aperiam blanditiis
        consequatur cum cupiditate dolorem enim hic laborum molestias totam. Accusantium animi assumenda commodi consectetur
        consequuntur culpa, deserunt enim harum molestias mollitia neque, nobis nostrum, qui quibusdam quidem reiciendis
        repellendus reprehenderit similique soluta tenetur. Blanditiis doloremque eius esse maiores nihil, praesentium quae quo
        temporibus. Cumque ipsum magni mollitia nam necessitatibus non provident quidem sequi vitae voluptate? Accusantium aperiam
        architecto assumenda beatae culpa cum doloribus ducimus error esse est eum facere facilis, fugiat illo molestias
        necessitatibus neque non, officiis perspiciatis provident, quas quos ratione reprehenderit saepe sequi suscipit veniam! A,
        alias architecto atque aut dolores fuga fugit inventore libero magnam maxime molestiae mollitia necessitatibus nesciunt
        quibusdam sint. Alias assumenda at atque aut beatae dolores exercitationem harum hic illum impedit itaque laborum libero
        magnam maiores minus molestias nesciunt nihil nostrum, odio optio perferendis quia quo recusandae sequi sint sit soluta
        suscipit tempora tenetur totam velit veniam voluptas voluptatum! Accusamus alias consequatur dicta dolor, dolores error,
        ex facere fuga fugit magni maxime nesciunt, nobis nostrum quae ratione reiciendis soluta ullam veritatis! A accusantium
        consequuntur cumque deleniti dolore exercitationem maiores odio perferendis quae quaerat quasi quos repudiandae sed sunt
        ullam velit, voluptatibus! Consequuntur delectus, iure laudantium magnam minima modi molestiae nam necessitatibus
        obcaecati officia perferendis porro quam, quidem, quos recusandae reprehenderit sapiente sed ullam veritatis voluptate. Ad
        amet asperiores dignissimos dolor dolorum ducimus earum exercitationem hic, iure laboriosam magni maiores pariatur placeat
        quaerat ratione repudiandae, sequi sunt temporibus tenetur vel veritatis voluptate voluptatum. Aliquid animi asperiores at
        atque beatae consequuntur corporis cupiditate dignissimos dolore doloremque ducimus ea eaque error et eveniet, hic id
        laudantium magnam molestias mollitia nam nobis obcaecati officia pariatur possimus provident quae quibusdam recusandae
        saepe sequi similique sunt suscipit voluptas? Ad quas, quasi? A alias blanditiis deserunt dicta ducimus ea earum enim eos,
        excepturi exercitationem expedita facilis iure necessitatibus, perferendis perspiciatis porro praesentium provident quo
        vel velit. Consequuntur doloribus minus neque nisi ratione sapiente. A, accusamus alias architecto aspernatur consectetur
        corporis deserunt, dolore eaque earum eligendi esse est excepturi exercitationem fuga harum magni maxime neque nostrum
        obcaecati odio provident quia quos reiciendis saepe vel veniam veritatis voluptatem! Ad aperiam commodi cum dicta
        distinctio doloremque ea enim eos eveniet exercitationem expedita in, ipsa iusto maiores maxime modi mollitia nemo nostrum
        odit provident quae quaerat quod repellat tempora vel velit voluptate voluptatum. Alias asperiores commodi debitis dolorum
        eos excepturi fuga fugiat fugit itaque magnam maxime nam neque, nihil nisi numquam pariatur perferendis perspiciatis
        provident quae quam quia reprehenderit similique sit velit veniam vitae voluptate! Architecto cum dolorem doloremque fuga
        ipsum molestiae molestias nobis, non omnis, quasi sit tempore vel.
      </p>
    </>
  );
};

export default AddQuestionPage;

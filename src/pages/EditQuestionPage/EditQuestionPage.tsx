import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.ts";
import { Loader } from "../../components/Loader";
import { API_URL } from "../../constants";
import { EditQuestion } from "./EditQuestion.tsx";

export const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  const [fetchQuestion, isFetchQuestionLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();

    setQuestion(data);
  });
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div>
      {isFetchQuestionLoading && <Loader />}
      {question && <EditQuestion initialState={question} />}
    </div>
  );
};

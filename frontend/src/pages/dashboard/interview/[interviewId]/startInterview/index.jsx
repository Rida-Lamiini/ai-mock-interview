import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInterviewDetails } from "../../../../../sevices/utils/api";
import QuestionsSection from "./components/QuestionsSection";
import RecordSection from "./components/RecordSection";
import { Button } from "@/components/ui/button";

function StartInterview() {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestion] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const data = await getInterviewDetails(interviewId);

        setInterview(data);
        if (data.jsonMockResp) {
          setMockInterviewQuestion(JSON.parse(data.jsonMockResp));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  console.log(mockInterviewQuestion);

  return (
    <div>
      {error && (
        <div className="alert alert-error">
          <p>Error: {error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center container">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <RecordSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interview={interview}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}

        {activeQuestionIndex != mockInterviewQuestion.questions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}

        {activeQuestionIndex == mockInterviewQuestion.questions?.length - 1 && (
          <Link to={"/dashboard/interview/" + interview.mockId + "/feedback"}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;

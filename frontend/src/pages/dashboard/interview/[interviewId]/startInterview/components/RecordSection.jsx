import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { AIchatSession } from "../../../../../../sevices/modules/GeminiAI";
import { postUserAnswer } from "../../../../../../sevices/utils/api";
import { useUser } from "@clerk/clerk-react";

function RecordSection({
  interview,
  mockInterviewQuestion,
  activeQuestionIndex,
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [webCamEnable, setWebCamEnable] = useState(false);
  const [showUserAnswer, setShowUserAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (!isRecording && results.length > 0) {
      const finalTranscript = results
        .map((result) => result.transcript)
        .join(" ");
      setUserAnswer(finalTranscript);
    }
  }, [isRecording, results]);

  useEffect(() => {
    if (error) {
      toast.error(`Speech recognition error: ${error.message}`);
    }
  }, [error]);

  const handleShowUserAnswer = () => {
    setShowUserAnswer(true);
  };

  const handleSaveUserAnswer = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();

      if (userAnswer.length < 5) {
        setLoading(false);
        toast.error("Your answer is too short. Please speak longer.");
        return;
      }
      setResults([]);

      toast.success("Answer saved successfully!");

      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, 
      User Answer: ${userAnswer}, 
      Based on the question and user answer, provide a rating and feedback between 3 to 5 lines in JSON format with fields for "rating" and "feedback".`;

      try {
        const result = await AIchatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = await result.response.text();
        const JsonFeedback = JSON.parse(mockJsonResp);

        const userAnswerData = {
          mockIdRef: interview?.mockId,
          question:
            mockInterviewQuestion.questions[activeQuestionIndex].question,
          correctAnswer:
            mockInterviewQuestion.questions[activeQuestionIndex].answer,
          userAnswer,
          feedback: JsonFeedback.feedback,
          rating: JsonFeedback.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date().toISOString(),
        };

        console.log(userAnswerData);

        // Send the data to the backend
        const response = await postUserAnswer(userAnswerData);
        userAnswer;
        console.log("User answer submitted:", response);
      } catch (aiError) {
        toast.error("Failed to get feedback from AI.");
      } finally {
        setLoading(false);
      }
    } else {
      startSpeechToText();
      toast.info("Recording started. Please speak your answer.");
    }
  };

  const updateUserAnswer = () => {};

  return (
    <div className="flex flex-col items-center my-20 rounded-lg p-5">
      {webCamEnable ? (
        <>
          <Webcam
            style={{
              height: 300,
              width: 300,
              zIndex: 10,
              borderRadius: "0.5rem",
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
            videoConstraints={{ facingMode: "user" }}
            mirrored={true}
            onClick={() => setWebCamEnable(false)}
          />
          <Button
            variant="outline"
            onClick={handleSaveUserAnswer}
            className="mt-5 flex items-center"
            disabled={loading} // Disable the button when loading
          >
            {loading
              ? "Saving..."
              : isRecording
              ? "Stop Recording"
              : "Record Answer"}{" "}
            <Mic className="ml-2" />
          </Button>
        </>
      ) : (
        <>
          <WebcamIcon
            className="h-72 w-full p-20 bg-secondary rounded-lg border my-7 cursor-pointer"
            aria-label="Enable webcam"
            onClick={() => setWebCamEnable(true)}
          />
          <Button onClick={() => setWebCamEnable(true)} variant="ghost">
            Enable Camera and Microphone
          </Button>
          <Button onClick={handleShowUserAnswer} className="mt-5">
            Show User Answer
          </Button>
          {showUserAnswer && (
            <div className="mt-5 w-full">
              <h3>User Answer:</h3>
              <p className="mt-2 p-2 bg-gray-100 rounded-lg border">
                {userAnswer}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecordSection;

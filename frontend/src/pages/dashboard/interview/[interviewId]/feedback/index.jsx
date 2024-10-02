import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserAnswerDetails } from "../../../../../sevices/utils/api";
import { Loader2, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function Feedback() {
  const { interviewId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getUserAnswerDetails(
          "613e913e-adb9-4955-bebc-0ba6ea760fdb"
        );
        console.log("Fetched Data:", data);
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [interviewId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading feedback...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AlertCircle className="w-8 h-8 text-destructive" />
        <h2 className="ml-2 text-lg font-medium text-destructive">
          Error: {error}
        </h2>
      </div>
    );
  }

  if (!feedbacks.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <XCircle className="w-8 h-8 text-muted-foreground" />
        <p className="ml-2 text-lg font-medium text-muted-foreground">
          No feedback available.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Congratulations!
        </h2>
        <h3 className="text-xl font-semibold text-muted-foreground">
          Here is Your Interview Feedback
        </h3>
      </div>

      {feedbacks.map((feedback, index) => (
        <div
          key={feedback.id}
          className="bg-card text-card-foreground rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Question {index + 1}</h3>
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-2">Rating:</span>
              <span className="text-2xl font-bold text-primary">
                {feedback.rating}/10
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <FeedbackSection title="Question" content={feedback.question} />
            <FeedbackSection
              title="Correct Answer"
              content={feedback.correctAnswer}
            />
            <FeedbackSection
              title="Your Answer"
              content={feedback.userAnswer}
            />
            <FeedbackSection title="Feedback" content={feedback.feedback} />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeedbackSection({ title, content }) {
  return (
    <div className="border-t pt-4">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{content || "N/A"}</p>
    </div>
  );
}

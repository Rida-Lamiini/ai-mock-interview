import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, Briefcase, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInterviewsByCreator } from "../../../sevices/utils/api";

const InterviewList = () => {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInterviews() {
      if (!user?.primaryEmailAddress) return;

      try {
        setLoading(true);
        const data = await getInterviewsByCreator(user.primaryEmailAddress);
        setInterviews(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
        setError("Failed to load interviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchInterviews();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading interviews...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <AlertCircle className="w-6 h-6" />
        <span className="ml-2 text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Previous Mock Interviews
      </h2>
      {interviews.length === 0 ? (
        <p className="text-muted-foreground">No previous interviews found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              to={`/dashboard/interview/${interview.mockId}`}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {interview.jobPosition} - {interview.jobDesc}
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      {interview.jobExperience} years exp.
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created:{" "}
                    {new Date(interview.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewList;

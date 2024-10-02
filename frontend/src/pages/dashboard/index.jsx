import React from "react";
import AddNewInterview from "./components/AddNewInterview";
import InterviewList from "./components/InterviewList";

function Dashboard() {
  return (
    <div className="container">
      <h2 className="font-bold text-2xl ">Dashboard</h2>
      <p className="text-gray-500">Create and Start your AI Mockup Interview</p>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  );
}

export default Dashboard;

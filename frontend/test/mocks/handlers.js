import { http, HttpResponse } from "msw";

// Define your API mocking handlers here
export const handlers = [
  // Example: Mock user authentication
  http.post("https://api.clerk.dev/v1/client/sign_ins", () => {
    return HttpResponse.json({
      id: "user_123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
    });
  }),

  // Example: Mock interview questions API
  http.get("https://api.example.com/questions", () => {
    return HttpResponse.json([
      {
        id: 1,
        question: "Tell me about yourself",
        category: "behavioral",
        difficulty: "easy",
      },
      {
        id: 2,
        question: "What are your strengths and weaknesses?",
        category: "behavioral",
        difficulty: "medium",
      },
      {
        id: 3,
        question:
          "Explain the difference between var, let, and const in JavaScript",
        category: "technical",
        difficulty: "medium",
      },
    ]);
  }),
];

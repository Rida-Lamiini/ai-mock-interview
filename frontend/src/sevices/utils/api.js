export const sendPostRequest = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getInterviewDetails = async (mockId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/mock-interviews/${mockId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
export const getUserAnswerDetails = async (mockId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/user-answers/${mockId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
export const getInterviewsByCreator = async (createdBy) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/mock-interviews/createdBy/${createdBy}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
export const postUserAnswer = async (data) => {
  try {
    const response = await fetch("http://localhost:8080/api/user-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json(); // Assuming the response is JSON
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

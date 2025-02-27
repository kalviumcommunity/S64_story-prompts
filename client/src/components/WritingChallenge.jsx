import React, { useState, useEffect } from "react";

const WritingChallenges = () => {
  const [prompt, setPrompt] = useState("");
  const [contributor, setContributor] = useState("");
  const [challenges, setChallenges] = useState([]);

  // Fetch challenges from the backend
  useEffect(() => {
    fetch("http://localhost:5000/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChallenge = { prompt, contributor: contributor || "Anonymous" };

    try {
      const response = await fetch("http://localhost:5000/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChallenge),
      });

      if (response.ok) {
        const savedChallenge = await response.json();
        setChallenges([savedChallenge, ...challenges]); // Update UI
        setPrompt(""); // Reset form
        setContributor("");
      }
    } catch (error) {
      console.error("Error submitting challenge:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#4A90E2" }}>✍ Writing Challenges</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
          rows="3"
          placeholder="Enter your writing challenge..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your Name (Optional)"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4A90E2",
            color: "#fff",
            padding: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      <h2 style={{ marginTop: "20px", color: "#4A90E2" }}>Recent Challenges</h2>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {challenges.map((challenge, index) => (
          <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <p style={{ fontSize: "18px", fontStyle: "italic" }}>"{challenge.prompt}"</p>
            <p style={{ fontSize: "14px", color: "#666" }}>- {challenge.contributor} ({new Date(challenge.date).toLocaleDateString()})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WritingChallenges;
import { useState, useEffect } from "react";

const WritingChallenge = () => {
  const [userName, setUserName] = useState("");
  const [genre, setGenre] = useState("");
  const [story, setStory] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [challenges, setChallenges] = useState([]); // Stores submitted stories

  const challengeList = [
    "Write about a character who wakes up in an unfamiliar place.",
    "Describe a world where dreams come true instantly.",
    "Write a dialogue between a ghost and its best friend.",
    "A letter is delivered 50 years late. Who was it meant for?",
    "Your character finds a door in their home that wasn’t there before.",
    "Write a story that begins with the sentence: 'The lights flickered, and then…'",
    "An AI gains emotions. How does it react?",
    "A mysterious book reveals the reader's future.",
    "Your protagonist can hear people's thoughts, but only for 10 minutes a day.",
    "A child’s imaginary friend turns out to be real.",
    "A detective must solve a case in a town where no one lies.",
    "Time stops for everyone except one person.",
    "A spaceship receives a distress signal from an unknown planet.",
    "Your main character meets their future self, but they don’t like what they see.",
    "A musician plays a melody that makes everyone who hears it cry.",
  ];

  useEffect(() => {
    setCurrentChallenge(getRandomChallenge());
    fetchChallenges(); // Fetch existing challenges when the page loads
  }, []);

  const getRandomChallenge = () => challengeList[Math.floor(Math.random() * challengeList.length)];

  const nextChallenge = () => {
    setCurrentChallenge(getRandomChallenge());
  };

  const fetchChallenges = async () => {
    try {
      const response = await fetch("http://localhost:5000/challenges");
      if (response.ok) {
        const data = await response.json();
        setChallenges(data);
      }
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !genre.trim() || !story.trim()) return;

    const newChallenge = { userName, genre, story };

    try {
      const response = await fetch("http://localhost:5000/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChallenge),
      });

      if (response.ok) {
        setUserName("");
        setGenre("");
        setStory("");
        fetchChallenges(); // Refresh the challenge list after submitting
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📖 Writing Challenge</h2>

      <div style={styles.challengeBox}>
        <p style={styles.challengeText}>{currentChallenge}</p>
        <button onClick={nextChallenge} style={styles.nextButton}>
          Next Challenge ➡️
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your Name"
          required
          style={styles.input}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)} required style={styles.input}>
          <option value="">Select Genre</option>
          {["Fantasy", "Sci-Fi", "Horror", "Mystery", "Drama"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Write your short story (max 50 words)..."
          maxLength={300}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.submitButton}>
          Submit Story
        </button>
      </form>

      <div style={styles.challengesContainer}>
        <h3 style={styles.submittedTitle}>📜 Submitted Stories</h3>
        {challenges.length === 0 ? (
          <p style={styles.noChallenges}>No stories submitted yet.</p>
        ) : (
          challenges.map((c, index) => (
            <div key={index} style={styles.challengeCard}>
              <p>
                <strong>{c.userName}</strong> - <em>{c.genre}</em>
              </p>
              <p>"{c.story}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    color: "#000",
    width: "100vw",
    background: "linear-gradient(135deg,rgb(126, 128, 129),rgb(222, 249, 254))",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    fontFamily: "Merriweather, serif",
    color: "#2c3e50",
    textAlign: "center",
  },
  challengeBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    color: "#000",
    textAlign: "center",
    marginBottom: "20px",
    maxWidth: "600px",
    width: "90%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "90%",
    maxWidth: "400px",
    padding: "20px",
    color: "#000",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    fontSize: "1rem",
    color: "#000",
    background: "#fff",
  },
  textarea: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    height: "100px",
    color: "#000",
    fontSize: "1rem",
    background: "#fff",
  },
  submitButton: {
    background: "#4A90E2",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  challengesContainer: {
    marginTop: "20px",
    width: "90%",
    maxWidth: "500px",
    color: "#000",
    textAlign: "center",
  },
  challengeCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    textAlign: "left",
  },
};


export default WritingChallenge;

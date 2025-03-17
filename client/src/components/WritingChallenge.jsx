import { useState, useEffect } from "react";

const WritingChallenge = () => {
  const [userName, setUserName] = useState("");
  const [genre, setGenre] = useState("");
  const [story, setStory] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [challenges, setChallenges] = useState([]); // Stores submitted stories
  const [editId, setEditId] = useState(null); // Track editing story

  const challengeList = [
    "Write about a character who wakes up in an unfamiliar place.",
    "Describe a world where dreams come true instantly.",
    "Write a dialogue between a ghost and its best friend.",
    "A letter is delivered 50 years late. Who was it meant for?",
  ];

  useEffect(() => {
    setCurrentChallenge(getRandomChallenge());
    fetchChallenges();
  }, []);

  const getRandomChallenge = () =>
    challengeList[Math.floor(Math.random() * challengeList.length)];

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

    if (editId) {
      // Updating an existing story
      try {
        const response = await fetch(`http://localhost:5000/challenges/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, genre, story }),
        });

        if (response.ok) {
          setEditId(null);
          setUserName("");
          setGenre("");
          setStory("");
          fetchChallenges();
        }
      } catch (error) {
        console.error("Error updating story:", error);
      }
    } else {
      // Submitting a new story
      try {
        const response = await fetch("http://localhost:5000/challenges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, genre, story }),
        });

        if (response.ok) {
          setUserName("");
          setGenre("");
          setStory("");
          fetchChallenges();
        }
      } catch (error) {
        console.error("Error submitting story:", error);
      }
    }
  };

  const handleEdit = (challenge) => {
    setEditId(challenge._id);
    setUserName(challenge.userName);
    setGenre(challenge.genre);
    setStory(challenge.story);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/challenges/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchChallenges();
      }
    } catch (error) {
      console.error("Error deleting story:", error);
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
          {editId ? "Update Story" : "Submit Story"}
        </button>
      </form>

      <div style={styles.challengesContainer}>
        <h3 style={styles.submittedTitle}>📜 Submitted Stories</h3>
        {challenges.length === 0 ? (
          <p style={styles.noChallenges}>No stories submitted yet.</p>
        ) : (
          challenges.map((c) => (
            <div key={c._id} style={styles.challengeCard}>
              <p>
                <strong>{c.userName}</strong> - <em>{c.genre}</em>
              </p>
              <p>"{c.story}"</p>
              <button onClick={() => handleEdit(c)} style={styles.editButton}>
                ✏️ Edit
              </button>
              <button onClick={() => handleDelete(c._id)} style={styles.deleteButton}>
                ❌ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 🔹 Define the styles object
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    color: "#000",
    background: "#eef2f3",
    padding: "40px",
  },
  title: { fontSize: "2.5rem", fontFamily: "Merriweather, serif", color: "#2c3e50" },
  challengeBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  nextButton: { background: "#007BFF", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  input: { padding: "12px", borderRadius: "5px", fontSize: "1rem", width: "100%" },
  textarea: { padding: "12px", borderRadius: "5px", fontSize: "1rem", width: "100%", height: "100px" },
  submitButton: { background: "#4A90E2", color: "white", padding: "12px", borderRadius: "5px", fontSize: "1rem", cursor: "pointer" },
  challengesContainer: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "700px",
    textAlign: "center",
  },
  challengeCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    textAlign: "left",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  editButton: { background: "#FFC107", color: "black", padding: "5px 10px", borderRadius: "5px", marginRight: "5px", cursor: "pointer" },
  deleteButton: { background: "#DC3545", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" },
};


export default WritingChallenge;

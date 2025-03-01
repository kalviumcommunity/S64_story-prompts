import React from "react";

const StoryPromptPage = () => {
  const prompts = [
    {
      title: "A Door to Another World",
      description: "You find an ancient wooden door in the middle of the forest. It whispers your name. What happens next?",
      genre: "Fantasy",
    },
    {
      title: "The Last Message",
      description: "A mysterious message appears on your phone from an unknown number—'Don't trust them.'",
      genre: "Thriller",
    },
    {
      title: "Lost in Time",
      description: "After a strange experiment, you wake up in the year 1820. With no way back, what do you do?",
      genre: "Science Fiction",
    },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>📝 Story Prompts</h1>
        <p style={styles.subtitle}>Unlock endless creativity with these inspiring ideas.</p>
      </header>

      <main style={styles.grid}>
        {prompts.map((prompt, index) => (
          <div key={index} style={styles.card}>
            <h2 style={styles.cardTitle}>{prompt.title}</h2>
            <p style={styles.cardDescription}>{prompt.description}</p>
            <span style={styles.genreTag}>{prompt.genre}</span>
          </div>
        ))}
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} StoryPrompts | Write. Create. Inspire.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.8rem",
    fontFamily: "Merriweather, serif",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "1200px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(198, 219, 232, 0.73)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "15px",
  },
  genreTag: {
    display: "inline-block",
    background: "#8e44ad",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "30px",
    fontSize: "0.9rem",
    color: "#777",
    textAlign: "center",
  },
};

export default StoryPromptPage;
  
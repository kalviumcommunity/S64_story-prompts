import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <header>
        <h1>StoryPrompts</h1>
        <p>Inspiring Writers, One Prompt at a Time.</p>
      </header>

      <main>
        <section className="hero">
          <h2>Unlock Your Creativity</h2>
          <p>
            Step into a world of storytelling with our AI-powered prompts,
            character generators, and immersive challenges.
          </p>
          <button className="cta-button">Start Writing</button>
        </section>

        <section className="features">
          <div className="feature">
            <h3>📚 Story Prompts</h3>
            <p>Discover unique prompts to ignite your Imagination.</p>
          </div>
          <div className="feature">
            <h3>✍️ Writing Challenges</h3>
            <p>Sharpen your skills with time-based writing tasks.</p>
          </div>
          <div className="feature">
            <h3>📖 Character Builder</h3>
            <p>Craft compelling characters for your next story.</p>
          </div>
          <div className="feature">
            <h3>🖋️ Community Hub</h3>
            <p>Connect with writers, share stories, and get feedback.</p>
          </div>
        </section>
      </main>

      <footer>
        <p> {new Date().getFullYear()} StoryPrompts | Write. Create. Inspire.</p>
      </footer>
    </div>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
// import "./LandingPage.css"; // Importing the CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header>
        <h1>StoryPrompts</h1>
        <p>Inspiring Writers, One Prompt at a Time</p>
      </header>

      <main>
        <section className="hero">
          <h2>Unlock Your Creativity</h2>
          <p>
            Step into a world of storytelling with our AI-powered prompts, character generators, and immersive challenges.
          </p>
          <div className="cta-button">
            <button onClick={() => navigate("/story-prompt")} aria-label="Get Started">
              Start Writing.
            </button>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <button onClick={() => navigate("/story-prompt")}>
            <h3>📚 Story Prompts</h3>
            <p>Discover unique prompts to ignite your imagination.</p>
            </button>

          </div>
          <div className="feature" >
            <button onClick={() => navigate("/writing-challenge")}>
            <h3>✍️ Writing Challenges</h3>
            <p>Sharpen your skills with time-based writing tasks.</p>
            </button>
            
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
        <p>{new Date().getFullYear()} StoryPrompts | Write. Create. Inspire.</p>
      </footer>


    <style>{`
         {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: "Georgia", serif;
          background-color: #f5f1ea;
          color: #2c3e50;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container {
          text-align: center;
          width: 100%;
          max-width: 1100px;
          padding: 30px;
          background: white;
          border-radius: 8px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #ccc;
        }

        header {
          background: #2c3e50;
          color: white;
          padding: 25px;
          border-radius: 8px 8px 0 0;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: bold;
          font-family: "Merriweather", serif;
          letter-spacing: 1px;
        }

        .hero {
          background: rgba(236, 240, 241, 0.8);
          padding: 40px;
          border-radius: 8px;
          margin-top: 20px;
          box-shadow: 0px 4px 8px rgba(241, 243, 207, 0.1);
        }

        .hero h2 {
          font-size: 2rem;
          margin-bottom: 15px;
          font-family: "Merriweather", serif;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: auto;
        }

        .cta-button {
          margin-top: 20px;
          padding: 12px 24px;
          font-size: 1.2rem;
          font-weight: bold;
          background:rgb(183, 221, 238);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
        }

        .cta-button:hover {
          background:rgb(224, 186, 239);
          transform: scale(1.05);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .feature {
          background: #ecf0f1;
          padding: 20px;
          border-radius: 8px;
          // box-shadow: 0px 4px 8px rgba(233, 176, 210, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .feature:hover {
          transform: translateY(-5px);
          background: #d5dbdb;
        }

        footer {
          margin-top: 30px;
          padding: 10px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

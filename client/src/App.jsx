import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StoryPromptCard from "./components/StoryPromptCard";
import "./App.css";

const App = () => {
    return (
        <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/story-prompt" element={<StoryPromptCard />} />
      </Routes>
    </Router>

        // <div className="App">
        // <LandingPage />
        // <StoryPromptCard />
        // </div>
    );
};
export default App;
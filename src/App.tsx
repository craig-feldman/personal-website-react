import React from "react";
import "./App.css";
import Terminal from "./components/Terminal";

const getYear = () => {
  return new Date().getFullYear();
};

const welcomeMessage = `Welcome to my site fellow humans and bots.

Type 'help' to view a list of available commands.
`;

const bannerCondensed =
  "             _         __     _    _                 \n" +
  " __ _ _ __ _(_)__ _   / _|___| |__| |_ __  __ _ _ _  \n" +
  "/ _| '_/ _` | / _` | |  _/ -_) / _` | '  \\/ _` | ' \\ \n" +
  "\\__|_| \\__,_|_\\__, | |_| \\___|_\\__,_|_|_|_\\__,_|_||_|\n " +
  "             |___/                                  \n" +
  "  \u00A9 " +
  getYear();

const prompt = ">";

function App() {
  return (
    <Terminal
      welcomeMessage={welcomeMessage}
      banner={bannerCondensed}
      terminalPrompt={prompt}
    />
  );
}

export default App;

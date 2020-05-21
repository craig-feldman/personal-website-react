import React from "react";
import "./App.css";
import Terminal from "./components/Terminal";

const getYear = () => {
  return 2020;
};

const welcomeMessage = `Welcome to my site fellow humans and bots.
Type 'help' to view a list of available commands.
`;

const banner =
  "                _          __     _     _                       \n" +
  "               (_)        / _|   | |   | |                      \n" +
  "  ___ _ __ __ _ _  __ _  | |_ ___| | __| |_ __ ___   __ _ _ __  \n" +
  " / __| '__/ _` | |/ _` | |  _/ _ \\ |/ _` | '_ ` _ \\ / _` | '_ \\ \n" +
  "| (__| | | (_| | | (_| | | ||  __/ | (_| | | | | | | (_| | | | |\n" +
  " \\___|_|  \\__,_|_|\\__, | |_| \\___|_|\\__,_|_| |_| |_|\\__,_|_| |_|\n" +
  "                   __/ |                                        \n" +
  "     \u00A9 " +
  getYear() +
  "       |___/                                         ";

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

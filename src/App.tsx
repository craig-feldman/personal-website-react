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
  "|\t	         _          __     _     _                       \t|\n" +
  "|\t                (_)        / _|   | |   | |                      \t|\n" +
  "|\t   ___ _ __ __ _ _  __ _  | |_ ___| | __| |_ __ ___   __ _ _ __  \t|\n" +
  "|\t  / __| '__/ _` | |/ _` | |  _/ _ \\ |/ _` | '_ ` _ \\ / _` | '_ \\ \t|\n" +
  "|\t | (__| | | (_| | | (_| | | ||  __/ | (_| | | | | | | (_| | | | |\t|\n" +
  "|\t  \\___|_|  \\__,_|_|\\__, | |_| \\___|_|\\__,_|_| |_| |_|\\__,_|_| |_|\t|\n" +
  "|\t                    __/ |                                        \t|\n" +
  "|\t      \u00A9 " +
  getYear() +
  "       |___/                                         \t|\n\n\n";

const prompt = ">";

function App() {
  return <Terminal welcomeMessage={welcomeMessage} banner={banner} />;
}

export default App;

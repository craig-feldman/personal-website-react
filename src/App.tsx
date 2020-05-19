import React, { useState, useEffect } from "react";
import "./App.css";

// Just a little helper function so I don't have to continually update my age
function getAge(birthDate: Date) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

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
function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<(string | JSX.Element)[]>([banner]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(3);
  const inputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {}, []);

  const glow = (a: string) => a;

  // const glow = (text: string) => {
  //   return <span className="terminal-glow">{text}</span>;
  // };

  const a = `Hey there! Thanks for taking such a keen interest in me.
  Hopefully you're not gonna spam or stalk me...
  Okay, I guess if you must stalk me, just give me fair warning so I can look presentable when you arrive at my door.
  
  Right, so, where to begin? Well, my parents met in... Nah, just kidding.
  As you probably know, my name is ${glow("Craig Feldman")}.
  I'm a ${getAge(new Date(1992, 12, 23))} year old ${glow(
    "Computer Scientist"
  )} born and bred in the beautiful South Africa and currently living in Cape Town.
  I graduated with distinction from University of Cape Town and have an MSc degree from the University of Oxford, where I was awarded a full academic scholarship.
  Nowadays I'm developing a method to download food... I wish!
  Some of my interests include ${glow(
    "machine learning, computer security, and cryptography"
  )}. I'm also pretty into fly fishing!
  
  My previous formal work experience includes working on asset management software (Fundamental Software - https://www.fundamental.net), as well as working for a content creation app (Over - https://madewithover.com).
  
  I am currently focusing on some personal projects, but please feel free to get in touch with me to discuss any cool opportunities!
  My contact details can be found by typing 'contact', and if you would like to check out my CV, simply type 'download_CV'.`;

  const messages: { [key: string]: string | JSX.Element } = {
    about: <>{a}</>,
  };

  const processCommand = () => {
    setOutput([
      ...output,
      <div>
        <span className="terminal-prompt">></span> <span>{input}</span>
      </div>,
      messages[input] ?? <ErrorMessage command={input} />,
    ]);
    setHistory([...history, input]);
    setHistoryIndex(history.length + 1);
    setInput("");
  };

  const getHistory = (direction: "up" | "down") => {
    let updatedIndex;
    if (direction === "up") {
      updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
    } else {
      updatedIndex =
        historyIndex === history.length ? history.length : historyIndex + 1;
    }
    setInput(updatedIndex === history.length ? "" : history[updatedIndex]);
    setHistoryIndex(updatedIndex);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    switch (event.key) {
      case "Enter":
        processCommand();
        break;
      case "ArrowUp":
        event.preventDefault();
        getHistory("up");
        break;
      case "ArrowDown":
        event.preventDefault();
        getHistory("down");
        break;
    }
  };

  const focusOnInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container" onClick={focusOnInput}>
      <div className="terminal-content">
        {output.map((o) => (
          <div>{o}</div>
        ))}
        <WelcomeMessage />
        <div className="terminal-input-area">
          <span className="terminal-prompt">></span>
          <input
            type="text"
            className="terminal-input"
            name="input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
}

type ErrorMessageProps = {
  command: string;
};
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <span className="terminal-error">
      {`command not found: ${props.command}.
Type 'help' to view a list of available commands.`}
    </span>
  );
};

const WelcomeMessage = () => {
  const welcomeMessageRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    let index = 0;
    setInterval(() => {
      if (!welcomeMessageRef.current || index >= welcomeMessage.length) {
        return;
      }
      welcomeMessageRef.current.insertAdjacentText(
        "beforeend",
        welcomeMessage[index++]
      );
    }, 40);
  }, [welcomeMessageRef]);

  return <div ref={welcomeMessageRef}></div>;
};

export default App;

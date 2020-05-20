import React, { useState, useEffect } from "react";
// import "./App.css";

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

type TerminalProps = {
  terminalPrompt?: string;
  banner?: string;
  welcomeMessage?: string;
};
const Terminal = (props: TerminalProps) => {
  const { terminalPrompt = ">", banner, welcomeMessage } = props;
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(3);
  const inputRef = React.createRef<HTMLInputElement>();
  console.log("Rendering temrinal");

  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [output]);
  useEffect(() => console.log("INPUTREF CHANGED ", inputRef), [inputRef]);

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

  const commands: { [key: string]: string | JSX.Element } = {
    help: "a",
    hello: "a",
    about: <>{a}</>,
  };

  const processCommand = (input: string) => {
    setOutput([
      ...output,
      <div>
        <span className="terminal-prompt">{terminalPrompt}</span>{" "}
        <span>{input}</span>
      </div>,
      commands[input] ?? <ErrorMessage command={input} />,
    ]);
    if (input.trim()) {
      // only add to history if the command is not empty
      setHistory([...history, input]);
      setHistoryIndex(history.length + 1);
    }
  };

  const getHistory = (direction: "up" | "down") => {
    let updatedIndex;
    if (direction === "up") {
      updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
    } else {
      updatedIndex =
        historyIndex === history.length ? history.length : historyIndex + 1;
    }
    setHistoryIndex(updatedIndex);
    return updatedIndex === history.length ? "" : history[updatedIndex];
  };

  const getAutocomplete = (input: string) => {
    const allCommands = Object.keys(commands);
    const matchingCommands = allCommands.filter((c) => c.startsWith(input));
    console.log(matchingCommands);
    if (matchingCommands.length === 1) {
      return matchingCommands[0];
    } else {
      setOutput([
        ...output,
        <div>
          <span className="terminal-prompt">{terminalPrompt}</span>{" "}
          <span>{input}</span>
        </div>,
        matchingCommands.join("\t"),
      ]);
      return input;
    }
  };

  const focusOnInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      // Prevent tab from moving focus
      event.preventDefault();
    }
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container" tabIndex={-1} onKeyDown={focusOnInput}>
      <div className="terminal-content">
        {banner && <Banner banner={banner} />}
        {welcomeMessage && (
          <WelcomeMessage message={welcomeMessage} inputRef={inputRef} />
        )}
        {output.map((o, key) => (
          <div key={key}>{o}</div>
        ))}
        <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

type InputAreaProps = {
  terminalPrompt?: string;
  setOutput: React.Dispatch<React.SetStateAction<(string | JSX.Element)[]>>;
  processCommand: (input: string) => void;
  getHistory: (direction: "up" | "down") => string;
  getAutocomplete: (input: string) => string;
  inputRef: React.RefObject<HTMLInputElement>;
};
const InputArea = (props: InputAreaProps) => {
  const [input, setInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key up: " + event.key);
    switch (event.key) {
      case "Enter":
        props.processCommand(input);
        setInput("");
        break;
      case "ArrowUp":
        event.preventDefault();
        setInput(props.getHistory("up"));
        break;
      case "ArrowDown":
        event.preventDefault();
        setInput(props.getHistory("down"));
        break;
      case "Tab":
        event.preventDefault();
        console.log("Tab pressed");
        setInput(props.getAutocomplete(input));
        break;
    }
  };
  return (
    <div className="terminal-input-area">
      <span className="terminal-prompt">{props.terminalPrompt || ">"}</span>
      <input
        type="text"
        className="terminal-input"
        name="input"
        value={input}
        onInput={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={props.inputRef}
        spellCheck="false"
      />
    </div>
  );
};

type ErrorMessageProps = {
  command: string;
};
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div className="terminal-error-group">
      <span className="terminal-error">
        {`command not found: ${props.command}.`}
      </span>
      <span>{`Type 'help' to view a list of available commands`}</span>
    </div>
  );
};

type BannerProps = {
  banner: string;
};
const Banner = (props: BannerProps) => (
  <div className="terminal-banner">{props.banner}</div>
);

type WelcomerMessageProps = {
  message: string;
  inputRef: React.RefObject<HTMLInputElement>;
};
const WelcomeMessage = (props: WelcomerMessageProps) => {
  console.log("rendering");
  const welcomeMessageRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (props.inputRef.current) {
      props.inputRef.current.disabled = true;
    }
    let index = 0;
    const typeText = setInterval(() => {
      if (!welcomeMessageRef.current) {
        return;
      }

      welcomeMessageRef.current.insertAdjacentText(
        "beforeend",
        props.message[index++]
      );

      if (index === props.message.length) {
        clearInterval(typeText);
        if (props.inputRef.current) {
          props.inputRef.current.disabled = false;
          props.inputRef.current.focus();
        }
      }
    }, 0);
  }, []);

  return <div ref={welcomeMessageRef}></div>;
};

export default Terminal;

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

const downloadFile = (uri: string, downloadName: string) => {
  const link = document.createElement("a");
  link.download = downloadName;
  link.href = uri;
  link.click();
  link.remove();
};

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
  console.log("Rendering terminal");

  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [output]);
  useEffect(() => console.log("INPUTREF CHANGED ", inputRef), [inputRef]);

  const glow = (text: string) => {
    return <span className="terminal-glow">{text}</span>;
  };

  const echoCommands = [
    "help",
    "about",
    "projects",
    "contact",
    "awards",
    "repo",
    "skills",
    "website",
  ] as const;
  type EchoCommand = typeof echoCommands[number];
  const utilityCommands = ["clear", "all", "download_cv"] as const;
  type UtilityCommand = typeof utilityCommands[number];
  const allCommands = [...echoCommands, ...utilityCommands] as const;
  type Command = typeof allCommands[number];

  function isEchoCommand(arg: string): arg is EchoCommand {
    return (echoCommands as ReadonlyArray<string>).includes(arg);
  }

  function isUtilityCommand(arg: string): arg is UtilityCommand {
    return (utilityCommands as ReadonlyArray<string>).includes(arg);
  }

  function isValidCommand(arg: string): arg is Command {
    return isEchoCommand(arg) || isUtilityCommand(arg);
  }
  const commands: { [key in EchoCommand]: string | JSX.Element } = {
    help: (
      <div>
        <p>
          Wow, I thought the only people who would visit this site would be bots
          and spammers, guess I was wrong. Just type any of the commands below
          to get some more info. You can even type a few letters and press [tab]
          to autocomplete.
        </p>
        <dl>
          <dt>about</dt>
          <dd>Stop stalking me</dd>
          <dt>projects</dt>
          <dd>Yeah, I've made some cool stuff before</dd>
          <dt>skills</dt>
          <dd>I'm pretty good at some things</dd>
          <dt>awards</dt>
          <dd>A bit of boasting</dd>
          <dt>repo</dt>
          <dd>Take a look at some of my work</dd>
          <dt>download_cv</dt>
          <dd>Check out my CV [pdf - 168KB]</dd>
          <dt>contact</dt>
          <dd>Bring on the spam</dd>
          <dt>website</dt>
          <dd>How I built this</dd>
          <dt>all</dt>
          <dd>Tell me everything</dd>
        </dl>

        <p>
          P.S. There's a pretty awesome command that I haven't told you about -
          see if you can find it! Hint: Check out the source code.
        </p>
      </div>
    ),
    about: (
      <div>
        <p>
          Hey there! Thanks for taking such a keen interest in me. Hopefully
          you're not gonna spam or stalk me... Okay, I guess if you must stalk
          me, just give me fair warning so I can look presentable when you
          arrive at my door.
        </p>
        <p>
          Right, so, where to begin? Well, my parents met in... Nah, just
          kidding.
          <br />
          As you probably know, my name is {glow("Craig Feldman")}. I'm a{" "}
          {getAge(new Date(1992, 12, 23))} year old {glow("Computer Scientist")}{" "}
          born and bred in the beautiful South Africa and currently living in
          Cape Town.
        </p>
        <p>
          I graduated with distinction from University of Cape Town and have an
          MSc degree from the University of Oxford, where I was awarded a full
          academic scholarship. Nowadays I'm developing a method to download
          food... I wish!
        </p>
        <p>
          Some of my interests include{" "}
          {glow("machine learning, computer security, and cryptography")}. I'm
          also pretty into fly fishing!
        </p>
        <p>
          My previous formal work experience includes working on asset
          management software{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.fundamental.net"
          >
            Fundamental Software
          </a>
          , as well as working for a content creation app{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://madewithover.com"
          >
            Over
          </a>
          .
        </p>
        <p>
          I am currently focusing on some personal projects and am bootstrapping
          my own startup (check it out,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://weaverworks.co.za"
          >
            here
          </a>
          ) but please feel free to get in touch with me to discuss any cool
          opportunities!
        </p>
        <p>
          My contact details can be found by typing 'contact', and if you would
          like to check out my CV, simply type 'download_CV'.
        </p>
      </div>
    ),
    projects: (
      <>
        <p>
          I'm always working on comp sciey (not really a word) things. Why don't
          you check out a few of my public code repositories? Just type 'repo'
          to get the links.
        </p>
        <p>
          I have my own startup called{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://weaverworks.co.za"
          >
            WeaverWorks
          </a>{" "}
          that provides property managers and buildings with some really cool
          software. The project is built in React with Node.js and Typescript.
          It utilises Firebase and components from Material-UI.
        </p>
        <p>
          You can also check out my university{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://pubs.cs.uct.ac.za/honsproj/cgi-bin/view/2015/feldman_meyer.zip/index.html"
          >
            honours project
          </a>{" "}
          - this one took a while!
        </p>
      </>
    ),
    contact: (
      <>
        <dl>
          <dt>Email</dt>
          <dd>
            <a href="mailto:craig.feldy@gmail.com">craig.feldy@gmail.com</a>
          </dd>
          <dt>Smoke signals</dt>
          <dd>general Cape Town region</dd>
          <dt>myspace</dt>
          <dd>just kidding</dd>
        </dl>
      </>
    ),
    awards: (
      <>
        <dl>
          <dt>2016</dt>
          <dd>University of Oxford full scholarship</dd>
          <dd>
            Standard Bank Africa Chairman's Scholarship (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://graduate.standardbank.com/standimg/Graduate/DerekCooperAfricaScholarship.html"
            >
              view scholarship
            </a>
            )
          </dd>

          <dt>2015</dt>
          <dd>Dean's Merit List</dd>

          <dt>2014</dt>
          <dd>Dean's Merit List</dd>
          <dd>BSG Prize (Best 3rd year Computer Science student)</dd>
          <dd>Class Medal (1st place) for all 3 Computer Science courses</dd>
          <dd>Commerce Faculty Scholarship</dd>

          <dt>2013</dt>
          <dd>Dean's Merit List</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
          <dd>Class Medal for Inferential Statistics</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
          <dd>Commerce Faculty Scholarship</dd>

          <dt>2012</dt>
          <dd>Dean's Merit List</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
        </dl>
      </>
    ),
    repo: (
      <>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/craig-feldman"
            >
              GitHub
            </a>{" "}
            - Unfortunately, I could only make a small subset of my projects
            public.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bitbucket.org/fldcra001"
            >
              Bitbucket
            </a>{" "}
            - A few university projects.
          </li>
        </ul>
      </>
    ),
    skills: (
      <>
        <dl>
          <dt>Kotlin</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ##
          </dd>
          <dt>Java</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
            ##
          </dd>
          <dt>TypeScript</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
            ##
          </dd>
          <dt>C# and C++</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ##
          </dd>
          <dt>Python</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
            ##
          </dd>
        </dl>
        <dl>
          <dt>GCP / Firebase</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>

          <dt>React</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ##
          </dd>

          <dt>General web development</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#5BD100", textShadow: "0 0 5px 5BD100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
        </dl>
      </>
    ),
    website: (
      <>
        <p>
          I built this website from scratch using {glow("React")} and{" "}
          {glow("TypeScript")}. It is a rewrite of my{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/craig-feldman/personal-website"
          >
            previous
          </a>{" "}
          website that used{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://terminal.jcubic.pl/"
          >
            JQuery Terminal Plugin
          </a>{" "}
          (and some inspiration from{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.ronniepyne.com)"
          >
            Ronnie Pyne
          </a>
          ).
        </p>
        <p>
          The source code for this site can be found on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/craig-feldman/personal-website-react"
          >
            GitHub
          </a>
          . Feel free to use this website for inspiration, or go ahead and copy
          some of the code! If you do, all I ask is that you give this site a
          mention :)
        </p>
      </>
    ),
  };

  const processCommand = (input: string) => {
    // Add command to output
    const commandRecord = (
      <div>
        <span className="terminal-prompt">{terminalPrompt}</span>{" "}
        <span>{input}</span>
      </div>
    );

    // Add command to to history if the command is not empty
    if (input.trim()) {
      setHistory([...history, input]);
      setHistoryIndex(history.length + 1);
    }

    // Now process command, ignoring case
    const inputCommand = input.toLowerCase();
    if (!isValidCommand(inputCommand)) {
      setOutput([
        ...output,
        commandRecord,
        <ErrorMessage command={inputCommand} />,
      ]);
    } else if (isEchoCommand(inputCommand)) {
      setOutput([
        ...output,
        commandRecord,
        <div className="terminal-command-output">{commands[inputCommand]}</div>,
      ]);
    } else if (isUtilityCommand(inputCommand)) {
      switch (inputCommand) {
        case "clear": {
          setOutput([]);
          break;
        }
        case "all": {
          // Output all commands in a custom order, and clears previous output.

          setOutput([
            commandRecord,
            ...[
              "about",
              "awards",
              "skills",
              "projects",
              "repo",
              "contact",
              "website",
            ].map((command) => (
              <>
                <div>
                  <span className="terminal-prompt">--</span>{" "}
                  <span>{command}</span>
                </div>
                <div className="terminal-command-output">
                  {commands[command as EchoCommand]}
                </div>
              </>
            )),
          ]);
          break;
        }
        case "download_cv": {
          setOutput([...output, commandRecord]);
          downloadFile("CV.pdf", "Craig Feldman - Curriculum Vitae.pdf");
          break;
        }
      }
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
        <TerminalOutput outputs={output} />
        <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
          terminalPrompt={terminalPrompt}
        />
      </div>
    </div>
  );
};

type OutputProps = {
  outputs: (string | JSX.Element)[];
};
const TerminalOutput = (props: OutputProps) => {
  const outputList = props.outputs.map((o, key) => <div key={key}>{o}</div>);
  return <>{outputList}</>;
};

type InputAreaProps = {
  terminalPrompt: string;
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
      <span className="terminal-prompt">{props.terminalPrompt}</span>
      <input
        type="text"
        className="terminal-input"
        name="input"
        value={input}
        onChange={handleInputChange}
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
  console.log("rendering welcome message");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={welcomeMessageRef} className="terminal-welcome-message"></div>
  );
};

export default Terminal;

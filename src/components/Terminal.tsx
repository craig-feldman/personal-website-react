import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import TerminalOutput from "./TerminalOutput";
import InputArea from "./InputArea";
import ErrorMessage from "./ErrorMessage";
import WelcomeMessage from "./WelcomeMessage";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

// Just a little helper function so I don't have to continually update my age
const getAge = (birthDate: Date) => {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

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
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLastCommandTop = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(scrollLastCommandTop, [output]);

  const echoCommands = [
    "help",
    "about",
    "employment",
    "projects",
    "contact",
    "awards",
    "repo",
    "skills",
    "website",
  ] as const;
  type EchoCommand = (typeof echoCommands)[number];
  const utilityCommands = ["clear", "all", "cv"] as const;
  type UtilityCommand = (typeof utilityCommands)[number];
  const allCommands = [...echoCommands, ...utilityCommands] as const;
  type Command = (typeof allCommands)[number];

  function isEchoCommand(arg: string): arg is EchoCommand {
    return (echoCommands as ReadonlyArray<string>).includes(arg);
  }

  function isUtilityCommand(arg: string): arg is UtilityCommand {
    return (utilityCommands as ReadonlyArray<string>).includes(arg);
  }

  function isValidCommand(arg: string): arg is Command {
    return isEchoCommand(arg) || isUtilityCommand(arg);
  }

  const glow = (text: string) => {
    return <span className="terminal-glow">{text}</span>;
  };

  const commands: { [key in EchoCommand]: JSX.Element } = {
    help: (
      <>
        <p>
          Wow, I thought the only people who would visit this site would be bots
          and spammers, guess I was wrong. Just type any of the commands below
          to get some more info. You can even type a few letters and press [tab]
          or '.' to autocomplete.
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
          <dt>cv</dt>
          <dd>Check out my CV [pdf - 197KB]</dd>
          <dt>contact</dt>
          <dd>Bring on the spam</dd>
          <dt>website</dt>
          <dd>How I built this</dd>
          <dt>all</dt>
          <dd>Tell me everything</dd>
          <dt>clear</dt>
          <dd>Clears the terminal of all output</dd>
        </dl>
      </>
    ),
    about: (
      <>
        <div className="terminal-heading">Intro</div>
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
          Cape Town. I primarily work as a backend endgineer in the{" "}
          {glow("fintech")} space, but lately have been working as a platform
          engineer.
        </p>
        <p>
          In my spare time, you'll catch me walking my dog, Daisy, on the
          promenade or mountain. If I'm not with Daisy, I'm probably at the gym
          or trying out a new coffee shop with some friends.
        </p>

        <div className="terminal-heading">Motivation</div>
        <p>
          I thrive in complex problem spaces, where deliberate design and
          scalable solutions deliver meaningful impact. While I feel that I have
          a lot to offer, I am fully cognisant of the fact that the way to
          better oneself (and the end product) is to be surrounded with
          exceptional peers from whom one can learn from, but at the same time
          contribute to. As such, what I value most is to be able to make
          meaningful contributions and work on challenging projects with
          talented colleagues.
        </p>

        <div className="terminal-heading">Education</div>
        <p>
          I completed a Bachelor of Business Science degree (specialising in
          Computer Science) at the University of Cape Town, South Africa where I
          also completed a number of additional courses in fields such as
          finance, statistics, and economics. I graduated in the top 1% of the
          cohort across disciplines and furthered my academic career in 2016
          when I was awarded a full academic scholarship to study an MSc in
          Computer Science at the University of Oxford. At Oxford, I studied a
          variety of courses with a focus on machine learning and computer
          security. My thesis involved investigating the applicability of a
          blockchain based electronic voting system.
        </p>
        <p>
          At university, I took a particularly keen interest in machine learning
          and computer security & cryptography. Oh, I also got very into rowing
          at and I'm pretty sure I left Oxford with my croquet skills being
          top-notch too!
        </p>

        <div className="terminal-heading">Experience</div>
        <p>
          I have worked across several different domains, including finance,
          payments, cryptocurrency, and an image and content creation app. I am
          proficient across the full stack, with primary expertise in{" "}
          {glow("backend architecture, and platform and scalability")}. Most
          recently, I manage the platform team for one of South Africa's largest
          payments service providers.
        </p>
        <p>
          My experience includes working within highly specialised and focused
          teams, as well as working on cross functional projects with looser
          team structures and rapidly evolving requirements. I have worked as an
          engineer as well as a technical and team lead and have been a key
          stakeholder in driving design and architectural decisions across the
          companies I have worked at. I am fortunate to have joined several
          companies at the early stage and have worked in fast-paced and dynamic
          environments. Having been a key stakeholder in the growth of these
          companies, I also understand how goals and metrics shift as a company
          develops. My most recent role involves ensuring efficient and
          effective scalability and growth from a technical perspective.
        </p>
        <p>
          My previous formal work experience includes:
          <ul>
            <li>
              working on asset management software at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.fundamental.net"
              >
                Fundamental Software
              </a>
              ;
            </li>
            <li>
              working for a great content creation app called{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://madewithover.com"
              >
                Over
              </a>
              ;
            </li>
            <li>
              helping people to buy, store, and learn about cryptocurrency at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://luno.com"
              >
                Luno
              </a>
              .
            </li>
          </ul>
        </p>
        <p>
          Nowadays I'm developing a method to download food... I wish! I am
          currently working at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stitch.money"
          >
            Stitch
          </a>
          , helping to develop South Africa's leading payment's platform. To see
          detailed info about my {glow("experience and employment")}, just type
          'employment'.
        </p>
        <p>
          Please feel free to get in touch with me to discuss any cool
          opportunities. My contact details can be found by typing 'contact',
          and if you would like to check out my {glow("CV")}, simply type 'cv'
          or click{" "}
          <a href="CV.pdf" download="Craig Feldman - Curriculum Vitae.pdf">
            here
          </a>
          .
        </p>
      </>
    ),
    employment: (
      <>
        <div className="terminal-heading">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stitch.money"
          >
            Stitch
          </a>{" "}
          (2011—present)
        </div>
        <p>
          Stitch is one of South Africa's largest payment service providers.
          Stitch operates across the online and in-person payments space,
          including solutions designed for e-commerce platforms and tools for
          more effective finance management.
        </p>
        <p>
          Development is mainly in a nodejs (Typescript) environment. There is
          some C# and React on the frontend and the overriding architecture is a
          monorepo of microservices - driven by docker/kubernetes.
          Infrastructure is predominantly hosted with Microsoft Azure. Other
          noteworthy tools and frameworks include: an event’s driven
          architecture, leveraging Redis, Kafka and BullMQ, Hasura, Postgres,
          Tailscale, Tilt, GraphQL, Helm, Datadog, and Terraform (amongst
          others).
        </p>
        <p>
          I joined Stitch when it was an early stage startup and helped scale it
          from ~500 daily payments to tens of thousands. Being one of the most
          tenured engineers at Stitch, I have worked on a variety of projects
          and within a variety of roles, including:
        </p>
        <ul>
          <li>engineering team lead;</li>
          <li>
            bank/api integrations (both reverse engineering and host-to-host
            payments);
          </li>
          <li>platform engineering;</li>
          <li>
            developing a self-service onboarding and management dashboard;
          </li>
          <li>
            leading and developing a complete architectural shift in how we
            manage clients and their configuration;
          </li>
        </ul>
        <p>
          In my role as a team lead, I was responsible for the ground-up
          development of an enterprise-grade reporting dashboard. This allows
          our enterprise clients to easily view and manage their accounts and
          transactions. Another major project was the development of a
          self-service onboarding and management platform that allows SMEs to
          sign up with Stitch and create and track payments - all without ever
          having to speak to the sales team! Under my leadership, this project
          spun off into its own business domain, generating more than
          $100k/month.
        </p>
        <p>
          For the past two years, I have been a key member of the platform team.
          The work here involves developer and tech enablement and includes:
          scaling, improving the CI/CD process, addressing performance
          bottlenecks, improving the developer experience, monitoring and
          alerting, etc. Some of my key work here involves effective and
          efficient scaling - allowing us to handle hundreds of requests per
          second whilst also improving the efficiency of our infrastructure
          usage (finding cost savings of over $15k/month). Other, perhaps more
          mundane but equally important tasks, involve ensuring our CI/CD and
          testing pipeline is quick and effective and that our developers are
          enabled to perform effectively and efficiently
        </p>

        <div className="terminal-heading">
          <a target="_blank" rel="noopener noreferrer" href="https://luno.com">
            Luno
          </a>{" "}
          (2020—2021)
        </div>
        <p>
          Luno is Africa's largest cryptocurrency wallet and exchange. During my
          time at Luno, I worked in the cross-functional Payment Operations team
          - developing software, tools, and internal systems to support the
          operational side of fiat payments within the app. Work involved
          improving the processes of how one gets fiat currency into and out of
          Luno, along with developing a system to perform automatic recon on
          these accounts.
        </p>
        <p>
          At Luno, I worked closely with many senior software engineers and the
          tech leadership/executive team. Development was mostly in Go and
          Typescript, with a focus on developing our own customised internal
          tooling and frameworks.
        </p>

        <div className="terminal-heading">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.godaddy.com/studio"
          >
            Over
          </a>{" "}
          (2018—2019)
        </div>
        <p>
          Over is a graphic design app for mobile devices. Similar to Canva, it
          allows one to easily edit images and videos on your mobile device. I
          joined Over as an early employee in the backend/services team where we
          primarily used Kotlin for our services, and Typescript with Angular
          for our internal content management system. When I joined Over, I was
          part of a small team responsible for the full backend system.
        </p>
        <p>
          Within the two years of me joining Over, the company grew from about
          20 employees to over 150. I left Over to join Luno shortly after Over
          was acquired by GoDaddy and rebranded as GoDaddy Studio.
        </p>
      </>
    ),
    projects: (
      <>
        <p>
          I'm always working on comp sciey (not really a word) things. Why don't
          you check out a few of my public code repositories? Just type 'repo'
          to get the links.
        </p>
        <p>
          I've also dabbled in producing a{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://weaverworks.co.za"
          >
            property-management portal
          </a>{" "}
          that provides property managers and buildings with some really cool
          software and tools. The project uses TypeScript, Node.js, React (with
          Material-UI components) and Firebase.
        </p>
        <p>
          You can also check out my MSc thesis{" "}
          <a href="MSc_Thesis.pdf" download="Craig Feldman - MSc Thesis.pdf">
            An investigation into the applicability of a blockchain based voting
            system
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
            <a href="mailto:craig@craigfeldman.com">craig@craigfeldman.com</a>
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
              href="https://www.standardbank.com/sbg/careers/early-careers/early-careers-overview/chairmans-scholarship"
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
        <div className="terminal-heading">Languages</div>
        <dl>
          <dt>TypeScript</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ##
          </dd>
          <dt>Go</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ##
          </dd>
          <dt>Kotlin</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
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

        <div className="terminal-heading">Cloud &amp; Infrastructure</div>
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
          <dt>Azure</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
          <dt>AWS</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ##
          </dd>
          <dt>
            Infrastructure <br />
            <span style={{ fontSize: "smaller" }}>
              (Docker, Kubernetes, DBs, etc.)
            </span>
          </dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
        </dl>

        <div className="terminal-heading">Web</div>
        <dl>
          <dt>React</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ##
          </dd>
          <dt>Angular</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
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
            href="http://www.ronniepyne.com"
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
    logEvent(analytics, "command_received", { command: input });

    // Store a record of this command with a ref to allow us to scroll it into view.
    // Note: We use a ref callback here because setting the ref directly, then clearing output seems to set the ref to null.
    const commandRecord = (
      <div
        ref={(el) => (scrollRef.current = el)}
        className="terminal-command-record"
      >
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
        <div className="terminal-command-output">
          <ErrorMessage command={inputCommand} />
        </div>,
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
          // Output all commands in a custom order.
          const allCommandsOutput = [
            "about",
            "employment",
            "awards",
            "skills",
            "projects",
            "repo",
            "contact",
            "website",
          ].map((command) => (
            <>
              <div className="terminal-heading">{command}</div>
              <div className="terminal-command-output">
                {commands[command as EchoCommand]}
              </div>
            </>
          ));

          setOutput([commandRecord, ...allCommandsOutput]);
          break;
        }
        case "cv": {
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
    if (matchingCommands.length === 1) {
      return matchingCommands[0];
    } else {
      const commandRecord = (
        <div
          ref={(el) => (scrollRef.current = el)}
          className="terminal-command-record"
        >
          <span className="terminal-prompt">{terminalPrompt}</span>{" "}
          <span>{input}</span>
        </div>
      );
      setOutput([...output, commandRecord, matchingCommands.join("    ")]);
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

export default Terminal;

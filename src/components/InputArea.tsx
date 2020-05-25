import React, { useState } from "react";

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
  /**
   * Sets the input state to the value of the input.
   *
   * If the input is a period, we get the autocomplete for the input up to, but excluding the period.
   * We handle this case specially to allow autocomplete on mobile because KeyboardEvent.key tends to be 'unidentified' for inputs on mobile keyboards.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue.charAt(inputValue.length - 1) === ".") {
      setInput(
        props.getAutocomplete(inputValue.substring(0, inputValue.length - 1))
      );
    } else setInput(inputValue);
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
        // Provide autocomplete on tab. For mobile, we have to handle autocomplete in the input's onChange event.
        event.preventDefault();
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
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
      />
    </div>
  );
};

export default InputArea;

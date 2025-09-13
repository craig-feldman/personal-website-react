import React, { useEffect } from "react";

type WelcomeMessageProps = {
  message: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
};
const WelcomeMessage = (props: WelcomeMessageProps) => {
  const welcomeMessageRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (welcomeMessageRef.current) {
      // Clear previous text
      welcomeMessageRef.current.textContent = "";
    }
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
    }, 30);
    return () => clearInterval(typeText); // Cleanup on unmount to prevent overlapping intervals
  }, [props.inputRef, props.message]);
  return (
    <div ref={welcomeMessageRef} className="terminal-welcome-message"></div>
  );
};

export default WelcomeMessage;

import React from "react";

type OutputProps = {
  outputs: (string | JSX.Element)[];
};
const TerminalOutput = (props: OutputProps) => {
  const outputList = props.outputs.map((o, key) => <div key={key}>{o}</div>);
  return <>{outputList}</>;
};

export default TerminalOutput;

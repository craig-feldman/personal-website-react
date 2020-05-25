import React from "react";

type BannerProps = {
  banner: string;
};
const Banner = (props: BannerProps) => (
  <div className="terminal-banner">{props.banner}</div>
);

export default Banner;

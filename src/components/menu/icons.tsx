import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export const Play = () => (
  <FaPlay
    size="2rem"
    className="bg-green pa2 br3 bg-animate hover-bg-dark-gray white hover-green pointer"
  />
);

export const Pause = () => (
  <FaPause
    size="2rem"
    className="bg-light-red pa2 br3 bg-animate hover-bg-red white hover-gray pointer"
  />
);

import pauseRoad from "./pause-road.gif";
import road from "./road.gif";
import React from "react";

type Props = { pause?: boolean } & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Road: React.FC<Props> = ({
  className = "",
  pause = false,
  ...props
}) => {
  if (pause) {
    return (
      <img {...props} alt="road pause" className="road" src={pauseRoad} />
    );
  }
  return <img {...props} alt="road play" className="road" src={road} />;
};

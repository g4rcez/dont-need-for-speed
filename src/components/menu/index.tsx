import React from "react";
import { Play, Pause } from "./icons";
import { Container, View } from "components/layout/grid";

type Props = {
  pause: boolean;
  timeLeft: number;
  togglePause: () => void;
};

export const Menu: React.FC<Props> = ({ pause, togglePause, timeLeft }) => {
  return (
    <Container className="mw9 center">
      <View
        onClick={togglePause}
        role="button"
        span="20%"
        xsmall="15%"
        small="15%"
      >
        <div className="pa3">{(pause && <Play />) || <Pause />}</div>
      </View>
      <View className="justify-end" span="80%" xsmall="79%" small="79%">
        <div className="pa3 justify-end">
          <h2 className="nt2 lh-title f1 justify-end">{timeLeft}</h2>
        </div>
      </View>
    </Container>
  );
};

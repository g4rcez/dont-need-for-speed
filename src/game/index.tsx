import {
  carMovement,
  Direction,
  ROAD_SIDES
} from "components/car/car-movement";
import { Menu } from "components/menu";
import { MusicPlayer } from "components/music-player";
import { PauseMenu } from "components/pause-menu";
import useKeyDown from "hooks/use-key-down";
import { useSwipe } from "hooks/use-swipe";
import React, { useEffect, useRef, useState } from "react";
import intro from "../assets/music.mp3";
import { Car, COLORS } from "../components/car";
import { Road } from "../components/road";
import { gameActions } from "./actions";
import { getCarColor } from "services/settings";

const clickableDiv = "w-33 flex items-end justify-start vh-75 vh-90-l";

const App = () => {
  const [pause, setPause] = useState(true);
  const [direction, setDirection] = useState(Direction.Center);
  const [time, setTime] = useState(0);
  const [color, setColor] = useState<COLORS>(getCarColor());
  const ref = useRef<HTMLElement>(null);
  const music = useRef<any>({});

  const toLeft = () => {
    if (!pause) {
      carMovement(direction, Direction.Left, setDirection, pause);
    }
  };

  const toRight = () => {
    if (!pause) {
      carMovement(direction, Direction.Right, setDirection, pause);
    }
  };

  const swipe = useSwipe(ref, {
    onSwipeLeft: toLeft,
    onSwipeRight: toRight
  });

  useEffect(() => {
    let interval = setInterval(() => {
      if (!pause) {
        setTime(t => 1 + t);
      }
    }, 1000);
    if (pause) {
      music.current.audioEl.pause();
      clearInterval(interval);
    } else {
      if (music.current.audioEl.paused) {
        music.current.audioEl.play();
      }
    }
    return () => clearInterval(interval);
  }, [pause, music.current]);

  useKeyDown(e => {
    gameActions(e.keyCode, {
      current: direction,
      setDirection,
      setPause,
      pause
    });
  });

  const togglePause = () => {
    setPause(prev => !prev);
  };

  const onClick = (dir: Direction) => () => {
    if (!pause) {
      return carMovement(direction, dir, setDirection, pause);
    }
  };

  useEffect(() => {
    if (!!music.current && !pause) {
      music.current.audioEl.play();
    }
  }, [music.current]);

  return (
    <div style={{ minHeight: "100%" }} className="w-100 h-100 flex-auto road">
      <Road pause={pause} />
      <div className="relative" style={{ minHeight: "100%" }}>
        <Menu togglePause={togglePause} pause={pause} timeLeft={time} />
        <MusicPlayer src={intro} ref={music} name="intro-music" />
        <div className="w-100 flex items-end" style={{ height: "max-content" }}>
          {ROAD_SIDES.map(x => (
            <div
              key={`road-${x}`}
              className={clickableDiv}
              style={{ minHeight: "100%" }}
              onClick={onClick(x)}
            >
              {(x === direction && (
                <Car
                  color={color}
                  className="pa3"
                  ref={ref}
                  onTouchStart={swipe.onTouchStart}
                  onTouchEnd={swipe.onTouchEnd}
                />
              )) ||
                " "}
            </div>
          ))}
        </div>
      </div>
      <PauseMenu carColor={setColor} visible={pause} onClose={togglePause} />
    </div>
  );
};

export default App;

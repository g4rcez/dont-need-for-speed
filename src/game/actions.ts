import Keyboard from "hooks/use-key-down/keyboard";
import { Direction, carMovement } from "components/car/car-movement";

export const gameActions = (
  keyCode: number,
  {
    setDirection,
    setPause,
    current,
    pause
  }: {
    setDirection: (direction: Direction) => void;
    setPause: (callback: (pause: boolean) => boolean) => void;
    current: Direction;
    pause: boolean;
  }
) => {
  const keys = {
    [Keyboard.esc]: () => setPause((prev: boolean) => !prev),
    [Keyboard.space]: () => setPause((prev: boolean) => !prev),
    [Keyboard.a]: () =>
      carMovement(current, Direction.Left, setDirection, pause),
    [Keyboard.w]: () =>
      carMovement(current, Direction.Center, setDirection, pause),
    [Keyboard.s]: () =>
      carMovement(current, Direction.Center, setDirection, pause),
    [Keyboard.d]: () =>
      carMovement(current, Direction.Right, setDirection, pause),
    [Keyboard.arrowDown]: () =>
      carMovement(current, Direction.Center, setDirection, pause),
    [Keyboard.arrowUp]: () =>
      carMovement(current, Direction.Center, setDirection, pause),
    [Keyboard.arrowLeft]: () =>
      carMovement(current, Direction.Left, setDirection, pause),
    [Keyboard.arrowRight]: () =>
      carMovement(current, Direction.Right, setDirection, pause)
  };
  if (keyCode in keys) {
    keys[keyCode]();
  }
};

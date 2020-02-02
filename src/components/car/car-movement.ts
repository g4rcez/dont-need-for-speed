export enum Direction {
  Left = "left",
  Right = "right",
  Center = "center"
}

export const ROAD_SIDES = [Direction.Left, Direction.Center, Direction.Right];

export const carMovement = (
  direction: Direction,
  target: Direction,
  setDirection: (direction: Direction) => void,
  pause: boolean
): void => {
  if (pause) {
    return;
  }
  if (direction === Direction.Center) {
    setDirection(target);
    return;
  }
  if (direction === Direction.Left) {
    if (target === Direction.Right) {
      setDirection(Direction.Center);
      return;
    }
    if (target === Direction.Center) {
      setDirection(Direction.Center);
      return;
    }
  }
  if (direction === Direction.Right) {
    if (target === Direction.Left) {
      setDirection(Direction.Center);
      return;
    }
    if (target === Direction.Center) {
      setDirection(Direction.Center);
      return;
    }
  }
};

import { useEventListener } from "hooks/use-event-listener";
import { useRef } from "react";

export function getPosition(event: TouchEvent & any) {
  if ("touches" in event) {
    const [{ pageX, pageY }] = event.touches;
    return { x: pageX, y: pageY };
  }
  return { x: event.screenX, y: event.screenY };
}

const voidFn = () => {};

type MoveStart = { x: number; y: number };
type MovePosition = { deltaX: number; deltaY: number };

type SwipeEvents = Partial<{
  onSwipeStart: (event: TouchEvent) => void;
  onSwipeMove: (coords: { x: number; y: number }, event: TouchEvent) => boolean;
  onSwipeEnd: (event: TouchEvent) => void;
  onSwipeLeft: (event: TouchEvent) => void;
  onSwipeRight: (event: TouchEvent) => void;
  onSwipeUp: (event: TouchEvent) => void;
  onSwipeDown: (event: TouchEvent) => void;
}>;

export const useSwipe = (
  ref: React.RefObject<HTMLElement>,
  {
    onSwipeStart = voidFn,
    onSwipeMove = () => true,
    onSwipeEnd = voidFn,
    onSwipeLeft = voidFn,
    onSwipeRight = voidFn,
    onSwipeUp = voidFn,
    onSwipeDown = voidFn
  }: SwipeEvents,
  tolerance = 10
) => {
  const movePosition = useRef<MovePosition | null>(null);
  const moveStart = useRef<MoveStart | null>(null);
  const moving = useRef<boolean>(false);

  const onSwipe = (event: TouchEvent) => {
    if (moveStart.current === null) {
      return;
    }
    const { x, y } = getPosition(event);
    const deltaX = x - moveStart.current.x;
    const deltaY = y - moveStart.current.y;
    moving.current = true;
    const shouldPreventDefault = onSwipeMove({ x: deltaX, y: deltaY }, event);
    if (shouldPreventDefault) {
      event.preventDefault();
    }
    movePosition.current = { deltaX, deltaY };
  };

  useEventListener<TouchEvent>("touchmove", onSwipe, ref.current!);

  const onTouchStart = (event: TouchEvent & any) => {
    const { x, y } = getPosition(event);
    moveStart.current = { x, y };
    moving.current = false;
    movePosition.current = null;
    onSwipeStart(event);
  };

  const onTouchEnd = (event: TouchEvent & any) => {
    onSwipeEnd(event);
    if (moving.current && movePosition.current) {
      if (movePosition.current.deltaX < -tolerance) {
        onSwipeLeft(event);
      }
      if (movePosition.current.deltaX > tolerance) {
        onSwipeRight(event);
      }
      if (movePosition.current.deltaY < -tolerance) {
        onSwipeUp(event);
      }
      if (movePosition.current.deltaY > tolerance) {
        onSwipeDown(event);
      }
    }
    moveStart.current = null;
    moving.current = false;
    movePosition.current = null;
  };

  return { onTouchEnd, onTouchStart };
};

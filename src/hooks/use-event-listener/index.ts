import { useRef, useEffect } from "react";

export const useEventListener = <EVENT_NAME>(
  eventName: string,
  handler: (e: EVENT_NAME) => void,
  element: HTMLElement | typeof window
) => {
  const savedHandler = useRef<Function>();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    const eventListener = (event: any) => savedHandler.current!(event);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
};

import { useEffect, useRef } from "react";

const useBlockScroll = (visible: boolean, deps: unknown[] = []) => {
  const domProperties = useRef({ overflowY: document.body.style.overflowY });

  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    } else {
      domProperties.current.overflowY = document.body.style.overflowY;
      // html>body
      document.body.style.overflowY = domProperties.current.overflowY;
      // html
      document.documentElement.style.overflowY =
        domProperties.current.overflowY;
    }
    return () => {
      // html>body
      document.body.style.overflowY = domProperties.current.overflowY;
      // html
      document.documentElement.style.overflowY =
        domProperties.current.overflowY;
    };
  }, [visible, ...deps]);
};

export default useBlockScroll;

import React, { useImperativeHandle, useRef } from "react";
import car from "./car.png";
export const colorDeg = {
  original: 0,
  purple: 40,
  pink: 80,
  red: 150,
  orange: 180,
  green: 270
};

export type COLORS = keyof typeof colorDeg;

export const Car = React.forwardRef(
  (
    {
      className = "",
      color = "original",
      ...props
    }: React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > & { color: keyof typeof colorDeg },
    external
  ) => {
    const ref = useRef(null);
    useImperativeHandle(external, () => ref.current);
    return (
      <div ref={ref} className="flex justify-center w-100">
        <img
          {...props}
          style={{ filter: `hue-rotate(${colorDeg[color]}deg)` }}
          alt="Car"
          className={`car ${className}`}
          src={car}
        />
      </div>
    );
  }
);

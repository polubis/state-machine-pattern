import React from "react";

interface ExpressComponentProps {
  arrowRotates: boolean;
  redDot: boolean;
  yellowDot: boolean;
  greenDot: boolean;
  animateCoffee: boolean;
}

export const ExpressComponent = ({
  arrowRotates,
  redDot,
  yellowDot,
  greenDot,
  animateCoffee
}: ExpressComponentProps) => {
  return (
    <div className="express">
      <div className={`coffee ${animateCoffee ? "animate-coffee" : ""}`}></div>
      <svg
        width="307"
        height="345"
        viewBox="0 0 307 345"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={`coffee-content ${animateCoffee ? "animate-coffee" : ""}`}
          x="93"
          y="251"
          width="109"
          height="52"
        />
        <rect x="10" width="286" height="124" rx="10" fill="black" />
        <circle cx="172" cy="33" r="13" fill={redDot ? "red" : "#D9D9D9"} />
        <circle
          cx="216"
          cy="33"
          r="13"
          fill={yellowDot ? "yellow" : "#D9D9D9"}
        />
        <circle cx="260" cy="33" r="13" fill={greenDot ? "green" : "#D9D9D9"} />
        <path
          d="M291.995 315.719H281.078C258.159 263.611 255.006 209.626 271.612 157H172.677L168.633 186.543C168.295 189.02 166.18 190.865 163.68 190.865H142.68C140.18 190.865 138.065 189.019 137.727 186.543L133.683 157H34.748C51.354 209.625 48.201 263.611 25.282 315.719H14.365C6.432 315.719 0 322.151 0 330.085C0 338.02 6.432 344.45 14.365 344.45H291.994C299.927 344.45 306.359 338.019 306.359 330.085C306.36 322.15 299.928 315.719 291.995 315.719ZM193.5 268.5C189.402 278.87 203.77 287.654 185.432 287.888C180.662 294.429 175.015 299.55 168.715 302.962C168.364 303.152 167.972 303.251 167.573 303.251H130.394C129.996 303.251 129.603 303.152 129.253 302.962C119.49 297.675 111.28 288.303 105.508 275.86C99.966 263.913 97.036 250.006 97.036 235.647C97.036 234.324 98.108 233.251 99.432 233.251H198.534C199.857 233.251 200.93 234.324 200.93 235.647C200.93 236.485 200.917 237.321 200.898 238.156C200.987 238.155 200.898 242 198.534 244C202 247.5 191.753 249.489 195.5 255C199.152 260.368 196.229 261.595 193.5 268.5Z"
          fill="black"
        />
      </svg>

      <svg
        className={`arrow ${arrowRotates ? "arrow-rotates" : ""}`}
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="36" cy="36" r="36" fill="#D9D9D9" />
        <path
          d="M28.6872 52C31.0084 52 33.1899 51.0965 34.829 49.4566C37.8551 46.4315 51.2845 22.6996 51.8541 21.6918C52.1036 21.2474 52.0274 20.6923 51.6691 20.333C51.309 19.972 50.752 19.8958 50.3112 20.1471C49.3025 20.7177 25.5695 34.1487 22.5462 37.1729C20.9044 38.8138 20 40.9944 20 43.3147C20 45.635 20.9035 47.8175 22.5462 49.4575C24.1862 51.0965 26.3686 52 28.6872 52Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

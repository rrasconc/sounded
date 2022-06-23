import React from "react";

export const AttemptBox = ({ color, className }) => {
  return (
    <span className={`h-7 w-7 mx-1 rounded-md ${color} ${className}`}></span>
  );
};

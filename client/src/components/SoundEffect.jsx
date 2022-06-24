import React from "react";
import { AttemptBox } from "./AttemptBox";

export const SoundEffect = (props) => {
  return (
    <div
      className={`flex items-center justify-center justify-self-center self-center ${props.className}`}
    >
      <AttemptBox
        color="bg-emerald-500"
        className="animate-bounce rounded-full h-5 w-5"
      />
      <AttemptBox
        color="bg-emerald-500"
        className="animate-bounce rounded-full a-delay-2 h-5 w-5"
      />
      <AttemptBox
        color="bg-emerald-500"
        className="animate-bounce rounded-full a-delay-4 h-5 w-5"
      />
    </div>
  );
};

import React from "react";
import { AttemptBox } from "./AttemptBox";

export const Loader = (props) => {
  return (
    <div
      className={`flex items-center justify-center h-screen justify-self-center self-center${props.className}`}
    >
      <AttemptBox color="bg-slate-300" className="animate-bounce" />
      <AttemptBox color="bg-slate-300" className="animate-bounce a-delay-2" />
      <AttemptBox color="bg-slate-300" className="animate-bounce a-delay-4" />
    </div>
  );
};

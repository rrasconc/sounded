import React from "react";

export const Button = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-cyan-500 transition-colors hover:bg-cyan-600 text-white w-24 p-1 rounded-lg text-lg font-bold ${className}`}
    >
      {label}
    </button>
  );
};

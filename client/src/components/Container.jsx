import React from "react";

export const Container = ({ children }) => {
  return (
    <div className="md:w-3/5 md:max-w-lg self-center mt-12">{children}</div>
  );
};

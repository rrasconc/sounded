import React from "react";

export const Section = ({ children }) => {
  return (
    <main className="App">
      <section className="flex flex-1 flex-col bg-slate-100 min-h-screen min-w-screen">
        {children}

        <footer className="bg-slate-200 p-2 mt-auto w-full">
          <a
            href="https://www.github.com/rigobertorascon"
            className="text-slate-800 text-md"
          >
            Github
          </a>
        </footer>
      </section>
    </main>
  );
};

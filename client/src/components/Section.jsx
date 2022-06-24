import React from "react";

export const Section = ({ children }) => {
  return (
    <main className="App">
      <section className="flex flex-1 flex-col bg-slate-100 min-h-screen min-w-screen">
        {children}

        <footer className="bg-slate-200 p-2 mt-auto w-full">
          <span className="ml-4">
            Tracks by
            <a
              href="https://www.last.fm/home"
              className="text-slate-800 text-md underline"
            >
              {" "}
              last.fm
            </a>
          </span>
        </footer>
      </section>
    </main>
  );
};

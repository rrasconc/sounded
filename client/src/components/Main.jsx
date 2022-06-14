import React from "react";

export const Main = () => {
  return (
    <section className="flex flex-1 flex-col p-5 bg-slate-100 min-h-screen min-w-screen">
      <div className="md:w-3/5 md:max-w-lg self-center">
        <div className="flex justify-center"></div>
        <div className="flex p-1 justify-around items-center my-4 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
          <input
            type="text"
            className="w-full ml-2 md:ml-4 text-gray-800 focus:outline-none focus:shadow-outline focus:"
          />
          <button class="bg-cyan-500 hover:bg-cyan-600 text-white w-24 p-1 rounded-lg text-sm font-bold">
            Try !
          </button>
        </div>
      </div>
    </section>
  );
};

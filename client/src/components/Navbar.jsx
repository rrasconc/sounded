import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="px-4 py-4 bg-slate-100">
      <div className="container flex flex-wrap items-center mx-auto">
        <FontAwesomeIcon
          data-modal-toggle="defaultModal"
          icon={faCircleInfo}
          size="xl"
          className="cursor-pointer hover:scale-125 hover:text-slate-600 hover:shadow-2xl transition ease-out duration-300 text-slate-400"
        />
        {/* <FontAwesomeIcon
          icon={faChartSimple}
          size="lg"
          className="text-slate-600 ml-4"
        /> */}
      </div>
    </nav>
  );
};

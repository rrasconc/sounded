import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export const Navbar = () => {
  return (
    <nav class="px-4 py-4 bg-slate-100">
      <div class="container flex flex-wrap items-center mx-auto">
        <FontAwesomeIcon
          icon={faCircleInfo}
          size="lg"
          className="text-slate-600"
        />
        <FontAwesomeIcon
          icon={faChartSimple}
          size="lg"
          className="text-slate-600 ml-4"
        />
      </div>
    </nav>
  );
};

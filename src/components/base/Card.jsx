import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Card = ({ title, Icon, link }) => {
  return (
    <div className="p-6 border-2 w-[250px] rounded-lg shadow-sm flex flex-col items-left justify-between gap-[30px]">
      <div>
        {Icon && <Icon className="text-[40px]" />}
      </div>

      <Link to={link} className="flex items-center justify-between w-full">
        <h2 className="text-lg font-semibold">{title}</h2>
        <HiChevronRight className="text-gray-400 text-2xl" />
      </Link>
    </div>
  );
};

export default Card;

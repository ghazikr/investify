import React from "react";
import { IoMdPricetag } from "react-icons/io";
import { GiBearFace } from "react-icons/gi";

interface IdeaItemProps {
  title: string;
  cost: number;
  descriptionSnippet: string;
  username: string;
}

export const IdeaItem: React.FC<IdeaItemProps> = ({
  title,
  descriptionSnippet,
  username,
  cost,
}) => {
  return (
    <div className="mb-4 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="mt-2 flex flex-col">
        <a
          href="#"
          className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
        >
          {title}
        </a>

        <div className="text-sm font-light text-gray-600 dark:text-gray-400">
          <span>Posted by </span>
          <span className="italic underline">{username}</span>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {descriptionSnippet}
        </p>
      </div>

      <div className="flex items-center flex-wrap py-4">
        <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
          <IoMdPricetag className="w-4 h-4 mr-1" />
          {cost}&euro;
        </span>
        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
          <GiBearFace className="w-4 h-4 mr-1" />
          bears
        </span>
      </div>
    </div>
  );
};

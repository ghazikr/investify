import React from "react";

interface IdeaItemProps {
  title: string;
  cost: number;
  description: string;
}

export const IdeaItem: React.FC<IdeaItemProps> = ({
  title,
  description,
  cost,
}) => {
  return (
    <div className="-my-8 divide-y-2 divide-gray-100">
      <div className="py-8 flex flex-wrap md:flex-nowrap">
        {/* <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <span className="font-semibold title-font text-gray-700">
            CATEGORY
          </span>
          <span className="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
        </div> */}
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            {title}
          </h2>
          <p className="leading-relaxed">{description}</p>
          <div className="flex items-end justify-between">
            <a className="text-indigo-500 inline-flex items-center mt-4">
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
            <span>{cost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

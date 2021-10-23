import React from "react";
import { GiBearFace } from "react-icons/gi";
import { useCurrentUserQuery, useLikeMutation } from "../generated/graphql";
import gql from "graphql-tag";

interface IdeaItemProps {
  id: number;
  title: string;
  cost: number;
  tldr: string;
  username: string;
  nbLikes: number;
  likeStatus?: boolean | null;
}

export const IdeaItem: React.FC<IdeaItemProps> = ({
  title,
  id,
  tldr,
  username,
  cost,
  likeStatus,
  nbLikes,
}) => {
  const { data } = useCurrentUserQuery();
  const [like] = useLikeMutation();
  const handleLikeClick = async () => {
    if (!data?.currentUser) {
      return;
    }
    await like({
      variables: { ideaId: id },
      update: (cache) => {
        const cachedIdeaId = "Idea:" + id;

        const data = cache.readFragment<{
          id: number;
          nbLikes: number;
          likeStatus: boolean;
        }>({
          id: cachedIdeaId,
          fragment: gql`
            fragment _ on Idea {
              id
              nbLikes
              likeStatus
            }
          `,
        });

        if (data) {
          const newNbLikes = data.likeStatus
            ? data.nbLikes - 1
            : data.nbLikes + 1;
          cache.writeFragment({
            id: cachedIdeaId,
            fragment: gql`
              fragment _ on Idea {
                nbLikes
                likeStatus
              }
            `,
            data: {
              nbLikes: newNbLikes,
              likeStatus: !data.likeStatus,
            },
          });
        }
      },
    });
  };
  return (
    <div className="mb-4 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between">
          <a
            href={`/idea/${id}`}
            className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
          >
            {title}
          </a>
          <span className="inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 text-gray-500 bg-indigo-200 rounded-lg p-2">
            {cost} &euro;
          </span>
        </div>

        <div className="text-sm font-light text-gray-600 dark:text-gray-400">
          <span>Posted by </span>
          <span className="italic underline">{username}</span>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{tldr}</p>
      </div>

      <div className="flex justify-between flex-wrap py-4">
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
        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
          <button
            onClick={handleLikeClick}
            className={`${likeStatus ? "text-red-600" : ""}`}
          >
            <GiBearFace className="w-6 h-6" />
          </button>
          {nbLikes}
        </span>
      </div>
    </div>
  );
};

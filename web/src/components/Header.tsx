import React from "react";
import NextLink from "next/link";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { data } = useCurrentUserQuery({
    skip: typeof window === "undefined", // do not run query on server
  });

  const [logout] = useLogoutMutation();
  const client = useApolloClient();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Investify</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {data && data.currentUser ? (
            <button
              className="mr-5 hover:text-gray-100 text-white p-2 bg-red-500"
              onClick={() => logout().then(() => client.resetStore())}
            >
              Logout
            </button>
          ) : (
            <>
              <NextLink href="/register">
                <a className="mr-5 hover:text-gray-900 cursor-pointer">
                  Register
                </a>
              </NextLink>
              <NextLink href="/login">
                <a className="mr-5 bg-blue-600 text-white p-2 rounded-md hover:text-gray-200 cursor-pointer">
                  Login
                </a>
              </NextLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
